// src/pages/AdminPanel.jsx  ← CREATE THIS FILE

import React, { useState, useEffect } from "react";
import { adminAPI } from "../api/axios";
import TopBar from "../components/TopBar";
import AdminPaymentTable from "../components/AdminPaymentTable";
import Toast from "../components/Toast";

const PAYMENT_TYPES = ["", "Bank", "Paytm", "UPI", "PayPal", "USDT"];

const EMPTY_FILTERS = {
    username: "",
    paymentType: "",
    bankName: "",
    ifscCode: "",
    paytmNumber: "",
    upiId: "",
    paypalEmail: "",
    usdtAddress: "",
};

const AdminPanel = () => {
    const [filters, setFilters] = useState(EMPTY_FILTERS);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "error") => setToast({ message, type });

    const fetchPayments = async (activeFilters) => {
        setLoading(true);
        try {

            const cleanFilters = Object.fromEntries(
                Object.entries(activeFilters).filter(([_, v]) => v !== "")
            );
            const res = await adminAPI.getAll(cleanFilters);
            setPayments(res.data.payments || []);
            setTotal(res.data.total || 0);
        } catch (err) {
            const msg = err?.response?.data?.msg || "Failed to fetch";
            showToast(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments(EMPTY_FILTERS);
    }, []);

    const handleChange = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSearch = () => fetchPayments(filters);

    const handleClear = () => {
        setFilters(EMPTY_FILTERS);
        fetchPayments(EMPTY_FILTERS);
    };

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", minHeight: "100vh", background: "#f4f6f8" }}>
            <TopBar title="🔧 Admin Panel" />

            <div style={{ padding: "20px 16px" }}>
                {/* Filter Card */}
                <div style={styles.card}>
                    <div style={styles.cardTitle}>🔍 Search & Filter</div>

                    <div style={styles.filterGrid}>
                        <FilterInput name="username" placeholder="Username" value={filters.username} onChange={handleChange} icon="👤" />

                        {/* Dropdown for payment type */}
                        <div style={styles.selectWrap}>
                            <span style={styles.inputIcon}>💳</span>
                            <select
                                name="paymentType"
                                value={filters.paymentType}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                {PAYMENT_TYPES.map((t) => (
                                    <option key={t} value={t}>{t || "All Types"}</option>
                                ))}
                            </select>
                        </div>

                        <FilterInput name="bankName" placeholder="Bank Name" value={filters.bankName} onChange={handleChange} icon="🏦" />
                        <FilterInput name="ifscCode" placeholder="IFSC Code" value={filters.ifscCode} onChange={handleChange} icon="🔢" />
                        <FilterInput name="paytmNumber" placeholder="Paytm Number" value={filters.paytmNumber} onChange={handleChange} icon="📱" />
                        <FilterInput name="upiId" placeholder="UPI ID" value={filters.upiId} onChange={handleChange} icon="⚡" />
                        <FilterInput name="paypalEmail" placeholder="PayPal Email" value={filters.paypalEmail} onChange={handleChange} icon="🌍" />
                        <FilterInput name="usdtAddress" placeholder="USDT Address" value={filters.usdtAddress} onChange={handleChange} icon="🪙" />
                    </div>

                    <div style={styles.btnRow}>
                        <button style={styles.btnSearch} onClick={handleSearch} disabled={loading}>
                            {loading ? "Searching..." : "🔍 Search"}
                        </button>
                        <button style={styles.btnClear} onClick={handleClear}>
                            ✕ Clear
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div style={styles.resultsHeader}>
                    <span style={styles.resultsTitle}>All Payment Records</span>
                    <span style={styles.badge}>{total} records</span>
                </div>

                <AdminPaymentTable payments={payments} loading={loading} />
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

const FilterInput = ({ name, placeholder, value, onChange, icon }) => (
    <div style={styles.inputWrap}>
        <span style={styles.inputIcon}>{icon}</span>
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={styles.input}
        />
    </div>
);

const styles = {
    card: {
        background: "#fff",
        borderRadius: 12,
        padding: "20px 16px",
        marginBottom: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
    },
    cardTitle: {
        fontFamily: "Nunito, sans-serif",
        fontWeight: 800,
        fontSize: 16,
        color: "#1a1a2e",
        marginBottom: 16,
    },
    filterGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 10,
        marginBottom: 16,
    },
    inputWrap: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        border: "1.5px solid #e5e7eb",
        borderRadius: 8,
        padding: "10px 12px",
        background: "#fff",
    },
    inputIcon: { fontSize: 16, flexShrink: 0 },
    input: {
        flex: 1,
        border: "none",
        outline: "none",
        fontSize: 13,
        fontFamily: "Poppins, sans-serif",
        color: "#1a1a2e",
        background: "transparent",
    },
    selectWrap: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        border: "1.5px solid #e5e7eb",
        borderRadius: 8,
        padding: "10px 12px",
        background: "#fff",
    },
    select: {
        flex: 1,
        border: "none",
        outline: "none",
        fontSize: 13,
        fontFamily: "Poppins, sans-serif",
        color: "#1a1a2e",
        background: "transparent",
        cursor: "pointer",
    },
    btnRow: {
        display: "flex",
        gap: 10,
    },
    btnSearch: {
        padding: "10px 24px",
        background: "#2ecc40",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontFamily: "Nunito, sans-serif",
        fontWeight: 800,
        fontSize: 14,
        cursor: "pointer",
    },
    btnClear: {
        padding: "10px 20px",
        background: "#f4f6f8",
        color: "#6b7280",
        border: "1.5px solid #e5e7eb",
        borderRadius: 8,
        fontFamily: "Nunito, sans-serif",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
    },
    resultsHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    resultsTitle: {
        fontFamily: "Nunito, sans-serif",
        fontWeight: 800,
        fontSize: 15,
        color: "#1a1a2e",
    },
    badge: {
        background: "#1565c0",
        color: "#fff",
        borderRadius: 20,
        padding: "3px 12px",
        fontSize: 12,
        fontFamily: "Nunito, sans-serif",
        fontWeight: 700,
    },
};

export default AdminPanel;