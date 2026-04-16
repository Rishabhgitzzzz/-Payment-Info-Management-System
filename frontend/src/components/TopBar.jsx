import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TopBar = ({ title = "My Payment..." }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        <div className="topbar-badge">
          <span>🪙</span>
          <span>105</span>
        </div>
        <div className="topbar-money">
          <span>₹0.00</span>
        </div>
        <div className="topbar-bell">🔔</div>
        <div className="topbar-avatar" onClick={handleLogout} title="Logout">
          🙎
        </div>
      </div>
    </div>
  );
};

export default TopBar;
