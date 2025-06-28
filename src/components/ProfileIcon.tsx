import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const ProfileIcon: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useAuth();

  const handleClick = () => {
    navigate(isAuthenticated ? "/profile" : "/login");
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition"
      onClick={handleClick}
      title={isAuthenticated ? "Trang hồ sơ" : "Đăng nhập"}
    >
      <span className="material-symbols-outlined text-3xl">account_circle</span>
      {isAuthenticated && <span className="text-base font-semibold">{username}</span>}
    </div>
  );
};

export default ProfileIcon;
