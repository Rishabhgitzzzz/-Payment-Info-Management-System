import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", icon: "🏠", path: "/" },
  { label: "Tasks", icon: "📋", path: "/tasks" },
  { label: "Promote", icon: "📣", path: "/promote" },
  { label: "Social", icon: "🌐", path: "/social" },
  { label: "Leaderboard", icon: "🏆", path: "/leaderboard" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <div
          key={item.path}
          className={`nav-item ${pathname === item.path ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;
