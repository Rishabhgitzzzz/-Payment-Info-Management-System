import React from "react";

const DETAIL_KEYS = {
    Bank: (p) => `${p.bankName} • ${p.accountNumber} • ${p.ifscCode}`,
    Paytm: (p) => p.paytmNumber,
    UPI: (p) => p.upiId,
    PayPal: (p) => p.paypalEmail,
    USDT: (p) => p.usdtAddress,
};

const TYPE_COLORS = {
    Bank: { bg: "#e8f9eb", color: "#22a832" },
    Paytm: { bg: "#e3f2fd", color: "#1565c0" },
    UPI: { bg: "#fff8e1", color: "#e65100" },
    PayPal: { bg: "#ede7f6", color: "#4527a0" },
    USDT: { bg: "#fce4ec", color: "#c62828" },
};

const AdminPaymentTable = ({ payments, loading }) => {
    if (loading) {
        return (
            <div style={styles.center}>
                <div style={styles.spinner} />
                <div style={styles.loadingText}>Loading records...</div>
            </div>
        );
    }

    if (!payments.length) {
        return (
            <div style={styles.empty}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📭</div>
                <div style={styles.emptyText}>No payment records found</div>
            </div>
        );
    }

    return (
        <div style={styles.tableWrapper}>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.headerRow}>
                        <th style={styles.th}>#</th>
                        <th style={styles.th}>👤 Username</th>
                        <th style={styles.th}>📧 Email</th>
                        <th style={styles.th}>💳 Type</th>
                        <th style={styles.th}>📋 Details</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((p, i) => {
                        const typeStyle = TYPE_COLORS[p.paymentType] || {};
                        const detail = DETAIL_KEYS[p.paymentType]?.(p) || "—";

                        return (
                            <tr key={p._id} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                <td style={styles.td}>{i + 1}</td>
                                <td style={{ ...styles.td, fontWeight: 700 }}>
                                    {p.user?.username || "—"}
                                </td>
                                <td style={styles.td}>{p.user?.email || "—"}</td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.typeBadge,
                                        background: typeStyle.bg,
                                        color: typeStyle.color,
                                    }}>
                                        {p.paymentType}
                                    </span>
                                </td>
                                <td style={{ ...styles.td, fontSize: 12, wordBreak: "break-all", maxWidth: 260 }}>
                                    {detail}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    tableWrapper: {
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Poppins, sans-serif",
        fontSize: 13,
    },
    headerRow: {
        background: "#1565c0",
    },
    th: {
        padding: "12px 14px",
        color: "#fff",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 800,
        fontSize: 13,
        textAlign: "left",
        whiteSpace: "nowrap",
    },
    rowEven: { background: "#fff" },
    rowOdd: { background: "#f9fafb" },
    td: {
        padding: "11px 14px",
        color: "#374151",
        borderBottom: "1px solid #f3f4f6",
        verticalAlign: "middle",
    },
    typeBadge: {
        padding: "3px 10px",
        borderRadius: 20,
        fontFamily: "Nunito, sans-serif",
        fontWeight: 800,
        fontSize: 11,
        display: "inline-block",
    },
    center: {
        textAlign: "center",
        padding: "40px 0",
        color: "#6b7280",
    },
    spinner: {
        width: 28,
        height: 28,
        border: "3px solid #e5e7eb",
        borderTopColor: "#1565c0",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        margin: "0 auto 10px",
    },
    loadingText: {
        fontFamily: "Nunito, sans-serif",
        fontWeight: 700,
        fontSize: 14,
    },
    empty: {
        textAlign: "center",
        padding: "40px 0",
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
    },
    emptyText: {
        fontFamily: "Nunito, sans-serif",
        fontWeight: 700,
        fontSize: 14,
        color: "#9ca3af",
    },
};

export default AdminPaymentTable;