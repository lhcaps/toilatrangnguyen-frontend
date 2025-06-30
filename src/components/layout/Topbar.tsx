import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../theme-provider";

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="relative bg-background text-foreground p-4 shadow-md flex items-center transition-colors duration-300">
      <span
        className="material-symbols-outlined text-3xl cursor-pointer hover:text-accent transition mr-2"
        onClick={() => navigate("/app/profile")}
        title="Hồ sơ"
      >
        account_circle
      </span>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl font-bold text-foreground">Tôi là Trạng Nguyên</h1>
      </div>

      <div className="ml-auto flex space-x-4 items-center">
        <span
          className="material-symbols-outlined cursor-pointer hover:text-accent transition"
          title="Thông báo"
          onClick={() => navigate("/app/notifications")}
        >
          notifications
        </span>

        <span
          className="material-symbols-outlined cursor-pointer hover:text-accent transition"
          title="Cài đặt"
          onClick={() => navigate("/app/settings")}
        >
          settings
        </span>

        <span
          className="material-symbols-outlined cursor-pointer hover:text-accent transition"
          title="Đổi giao diện"
          onClick={handleThemeToggle}
        >
          {theme === "light" ? "dark_mode" : "light_mode"}
        </span>

        {isAuthenticated && (
          <>
            <span className="text-sm text-muted-foreground">
              {user?.username || user?.email}
            </span>
            <span
              className="material-symbols-outlined cursor-pointer hover:text-destructive transition"
              title="Đăng xuất"
              onClick={logout}
            >
              logout
            </span>
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;
