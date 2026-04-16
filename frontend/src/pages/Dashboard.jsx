import React, { useState, useEffect, useCallback } from "react";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import PaymentCard from "../components/PaymentCard";
import PaymentModal from "../components/PaymentModal";
import Toast from "../components/Toast";
import { paymentAPI } from "../api/axios";

const PAYMENT_TYPES = [
  { type: "Bank", icon: "🏦", label: "Bank" },
  { type: "USDT", icon: "🪙", label: "BNB USDT" },
  { type: "UPI", icon: "⚡", label: "UPI" },
  { type: "Paytm", icon: "💳", label: "Paytm" },
  { type: "PayPal", icon: "🌐", label: "PayPal" }
];

const DISCLAIMER_ITEMS = [
  "Use only a bank account that matches your profile name.",
  "Do not link the same bank account to multiple Task Planet accounts.",
  "Fraudulent activity may result in account blocking.",
];

const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(null);   // which payment type modal is open
  const [editData, setEditData] = useState(null);     // if editing, holds the payment object
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [fetching, setFetching] = useState(true);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchPayments = useCallback(async () => {
    try {
      setFetching(true);
      const res = await paymentAPI.getAll();
      setPayments(res.data.paymentMethods || []);
    } catch (err) {
      showToast("Failed to load payment methods", "error");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const openAddModal = (type) => {
    setEditData(null);
    setModalType(type);
  };

  const openEditModal = (payment) => {
    setEditData(payment);
    setModalType(payment.paymentType);
  };

  const closeModal = () => {
    setModalType(null);
    setEditData(null);
  };

  const handleSubmit = async (payload, editId) => {
    setSubmitting(true);
    try {
      if (editId) {
        await paymentAPI.edit(editId, payload);
        showToast("Payment method updated! ✅");
      } else {
        await paymentAPI.add(payload);
        showToast("Payment method added! ✅");
      }
      closeModal();
      fetchPayments();
    } catch (err) {
      const msg =
        err?.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(", ")
          : err?.response?.data?.msg || "Something went wrong";
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this payment method?")) return;
    try {
      await paymentAPI.delete(id);
      showToast("Payment method removed");
      setPayments((prev) => prev.filter((p) => p._id !== id));
    } catch {
      showToast("Failed to remove", "error");
    }
  };

  return (
    <div className="app-shell">
      <TopBar title="My Payment..." />

      <div className="page-content">
        <h1 className="page-heading">Add Payment Options</h1>

        {/* Payment Type Buttons Grid */}
        <div className="payment-type-grid">
          {PAYMENT_TYPES.map((item, idx) => (
            <button
              key={idx}
              className="payment-type-btn"
              onClick={() => openAddModal(item.type)}
            >
              <span className="payment-type-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Existing Payment Cards */}
        {fetching ? (
          <div className="empty-state">
            <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
            <div className="empty-state-text">Loading...</div>
          </div>
        ) : payments.length > 0 ? (
          <div className="payment-cards-list">
            {payments.map((payment) => (
              <PaymentCard
                key={payment._id}
                payment={payment}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : null}

        {/* Disclaimer Section */}
        <div className="disclaimer-section">
          <div className="disclaimer-title">
            <span>💡</span>
            <span>Disclaimer</span>
          </div>
          <div className="disclaimer-box">
            {DISCLAIMER_ITEMS.map((item, i) => (
              <div key={i} className="disclaimer-item">
                {i + 1}. {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalType && (
        <PaymentModal
          paymentType={modalType}
          editData={editData}
          onClose={closeModal}
          onSubmit={handleSubmit}
          loading={submitting}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default Dashboard;
