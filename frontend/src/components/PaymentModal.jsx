import React, { useState, useEffect } from "react";

const PAYMENT_CONFIG = {
  Bank: {
    title: "Add Bank",
    editTitle: "Edit Bank",
    icon: "🏦",
    submitLabel: "Add Bank",
    editSubmitLabel: "Update Bank",
    fields: [
      { name: "bankName", placeholder: "Enter Bank Name", icon: "🏦", type: "text" },
      { name: "accountHolderName", placeholder: "Enter Holder Name", icon: "👤", type: "text" },
      { name: "accountNumber", placeholder: "Enter Account Number", icon: "💳", type: "text" },
      { name: "confirmAccountNumber", placeholder: "Confirm Account Number", icon: "✅", type: "text", confirmOf: "accountNumber" },
      { name: "branchName", placeholder: "Enter Branch Name", icon: "🌿", type: "text" },
      { name: "ifscCode", placeholder: "IFSC Code", icon: "🔢", type: "text" },
    ],
  },
  Paytm: {
    title: "Add Paytm",
    editTitle: "Edit Paytm",
    icon: "💸",
    submitLabel: "Add Paytm",
    editSubmitLabel: "Update Paytm",
    fields: [
      { name: "paytmNumber", placeholder: "Enter Paytm Number", icon: "📱", type: "tel" },
      { name: "confirmPaytmNumber", placeholder: "Confirm Paytm Number", icon: "✅", type: "tel", confirmOf: "paytmNumber" },
    ],
  },
  UPI: {
    title: "Add UPI ID",
    editTitle: "Edit UPI ID",
    icon: "⚡",
    submitLabel: "Add UPI ID",
    editSubmitLabel: "Update UPI ID",
    fields: [
      { name: "upiId", placeholder: "Enter UPI ID", icon: "⚡", type: "text" },
      { name: "confirmUpiId", placeholder: "Confirm UPI ID", icon: "✅", type: "text", confirmOf: "upiId" },
    ],
  },
  PayPal: {
    title: "Add PayPal",
    editTitle: "Edit PayPal",
    icon: "🌍",
    submitLabel: "Add PayPal",
    editSubmitLabel: "Update PayPal",
    fields: [
      { name: "paypalEmail", placeholder: "Enter PayPal Email", icon: "📧", type: "email" },
      { name: "confirmPaypalEmail", placeholder: "Confirm PayPal Email", icon: "✅", type: "email", confirmOf: "paypalEmail" },
    ],
  },
  USDT: {
    title: "Add BNB USDT Address",
    editTitle: "Edit USDT Address",
    icon: "🪙",
    submitLabel: "Add BNB USDT Address",
    editSubmitLabel: "Update USDT Address",
    fields: [
      { name: "usdtAddress", placeholder: "Enter BNB USDT Address", icon: "🪙", type: "text" },
      { name: "confirmUsdtAddress", placeholder: "Confirm BNB USDT Address", icon: "✅", type: "text", confirmOf: "usdtAddress" },
    ],
  },
};

const PaymentModal = ({ paymentType, editData, onClose, onSubmit, loading }) => {
  const config = PAYMENT_CONFIG[paymentType];
  const isEdit = !!editData;

  const initFormData = () => {
    const base = { paymentType };
    if (isEdit) {
      // Pre-fill fields from editData
      config.fields.forEach((f) => {
        if (!f.confirmOf) base[f.name] = editData[f.name] || "";
        else base[f.name] = editData[f.confirmOf] || ""; // pre-fill confirm too
      });
    } else {
      config.fields.forEach((f) => { base[f.name] = ""; });
    }
    return base;
  };

  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    config.fields.forEach((field) => {
      const val = formData[field.name]?.trim();
      if (!val) {
        errs[field.name] = "This field is required";
        return;
      }
      // Confirm field match check
      if (field.confirmOf) {
        if (val !== formData[field.confirmOf]?.trim()) {
          errs[field.name] = "Values do not match";
        }
      }
      // Paytm: 10 digits
      if (field.name === "paytmNumber" && !/^\d{10}$/.test(val)) {
        errs[field.name] = "Must be a 10-digit number";
      }
      // Email
      if (field.type === "email" && !field.confirmOf && !/\S+@\S+\.\S+/.test(val)) {
        errs[field.name] = "Enter a valid email";
      }
    });
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // Build payload – strip confirm fields
    const payload = { paymentType };
    config.fields.forEach((f) => {
      if (!f.confirmOf) payload[f.name] = formData[f.name].trim();
    });

    onSubmit(payload, isEdit ? editData._id : null);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="modal-close-outside" onClick={onClose}>✕</button>
      <div className="modal-sheet">
        <div className="modal-drag-handle" />
        <div className="modal-header">
          <div className="modal-title">
            {isEdit ? config.editTitle : config.title}
          </div>
          <span className="modal-icon">{config.icon}</span>
        </div>

        {config.fields.map((field) => (
          <div key={field.name}>
            <div className="form-field">
              <span className="form-field-icon">{field.icon}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            {errors[field.name] && (
              <div className="field-error">⚠ {errors[field.name]}</div>
            )}
          </div>
        ))}

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <span className="spinner" /> : (isEdit ? config.editSubmitLabel : config.submitLabel)}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
