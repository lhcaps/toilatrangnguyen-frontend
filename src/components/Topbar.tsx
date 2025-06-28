import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const navigate = useNavigate();

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header className="relative bg-[#1c1c1c] dark:bg-gray-800 p-4 shadow-md flex items-center">
      {/* Profile circle click mở profile */}
      <span
        className="material-symbols-outlined text-3xl cursor-pointer hover:text-purple-400 transition mr-2"
        onClick={() => navigate("/profile")}
        title="Hồ sơ"
      >
        account_circle
      </span>

      {/* Center title */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="text-2xl font-bold text-center" style={{ fontFamily: "Valky, sans-serif" }}>
          Tôi là Trạng Nguyên
        </div>
      </div>

      {/* Right side buttons */}
      <div className="ml-auto flex space-x-4 items-center relative z-10">
        <span className="material-symbols-outlined cursor-pointer hover:text-purple-400 transition" title="Thông báo">notifications</span>
        <span className="material-symbols-outlined cursor-pointer hover:text-purple-400 transition" title="Cài đặt">settings</span>
        <span
          className="material-symbols-outlined cursor-pointer hover:text-purple-400 transition"
          title="Đổi giao diện"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "dark_mode" : "light_mode"}
        </span>
      </div>
    </header>
  );
};

export default Topbar;
