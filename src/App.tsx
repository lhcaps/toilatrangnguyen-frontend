// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ExamListPage from "./pages/ExamListPage";
import ExamPage from "./pages/ExamPage";
import ResultsPage from "./pages/ResultsPage";

import Layout from "./components/Layout";
import { useAuth } from "./contexts/AuthContext";

// 🔒 Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [theme] = useLocalStorage("theme", "light");

  return (
    <div className={theme} data-theme={theme}>
      <Router>
        <Routes>
          {/* 🌐 Các route KHÔNG cần đăng nhập */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🛡 Các route CẦN đăng nhập */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="exams" element={<ExamListPage />} />
            <Route path="exams/:id" element={<ExamPage />} />
            <Route path="results" element={<ResultsPage />} />
          </Route>

          {/* 🌐 Redirect mọi thứ chưa khớp */}
          <Route path="*" element={
            isAuthenticated
              ? <Navigate to="/" replace />
              : <Navigate to="/login" replace />
          } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
