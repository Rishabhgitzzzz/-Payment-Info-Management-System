import React from "react";

const PAYMENT_ICONS = {
  Bank: "🏦",
  Paytm: "💸",
  UPI: "⚡",
  PayPal: "🌍",
  USDT: "🪙",
};

const getDisplayValue = (payment) => {
  switch (payment.paymentType) {
    case "Bank":
      return (
        <div>
          <div className="acc-number">{payment.accountNumber}</div>
          <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
            {payment.bankName} • {payment.ifscCode}
          </div>
        </div>
      );
    case "Paytm":
      return <div className="acc-number">{payment.paytmNumber}</div>;
    case "UPI":
      return <div className="acc-number">{payment.upiId}</div>;
    case "PayPal":
      return <div className="acc-number">{payment.paypalEmail}</div>;
    case "USDT":
      return (
        <div className="acc-number" style={{ fontSize: "13px", wordBreak: "break-all" }}>
          {payment.usdtAddress}
        </div>
      );
    default:
      return null;
  }
};

const PaymentCard = ({ payment, onEdit, onDelete }) => {
  return (
    <div className="payment-card">
      <div className="payment-card-header">
        <div className="payment-card-left">
          <span>{PAYMENT_ICONS[payment.paymentType]}</span>
          <span style={{ fontFamily: "var(--font-main)", fontWeight: 700 }}>
            {payment.paymentType === "Bank"
              ? payment.bankName
              : payment.paymentType}
          </span>
        </div>
        <span className="payment-card-badge">{payment.paymentType}</span>
      </div>

      <div className="payment-card-body">{getDisplayValue(payment)}</div>

      <div className="payment-card-actions">
        <button className="action-btn-edit" onClick={() => onEdit(payment)} title="Edit">
          ✏️
        </button>
        <button className="action-btn-remove" onClick={() => onDelete(payment._id)}>
          ❌ Remove Account
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
