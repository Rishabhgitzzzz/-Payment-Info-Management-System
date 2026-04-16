import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import "./styles/global.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/tasks" element={<ProtectedRoute><StubPage title="Tasks" /></ProtectedRoute>} />
          <Route path="/promote" element={<ProtectedRoute><StubPage title="Promote" /></ProtectedRoute>} />
          <Route path="/social" element={<ProtectedRoute><StubPage title="Social" /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><StubPage title="Leaderboard" /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Stub page for bottom nav items
import BottomNav from "./components/BottomNav";
import TopBar from "./components/TopBar";

const StubPage = ({ title }) => (
  <div className="app-shell">
    <TopBar title={title} />
    <div className="page-content">
      <div className="empty-state">
        <div className="empty-state-icon">🚧</div>
        <div className="empty-state-text">{title} — Coming Soon</div>
      </div>
    </div>
    <BottomNav />
  </div>
);

export default App;
