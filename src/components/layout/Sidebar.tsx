import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-16 bg-background text-foreground flex flex-col items-center py-4 space-y-6 transition-colors duration-300">
      <button
        title="Viết"
        className="hover:text-accent transition-colors duration-200"
        onClick={() => navigate("/app/dashboard")}  // Giữ nút Viết dẫn về dashboard hoặc trang chính đăng nhập
      >
        ✏️
      </button>

      <Link
        to="/app/homepage"  // <-- Sửa ở đây để dẫn về landing page
        className="hover:text-accent transition-colors duration-200 flex flex-col items-center"
      >
        <div>🏠</div>
        <div className="text-xs">Home</div>
      </Link>

      <Link
        to="/app/library"
        className="hover:text-accent transition-colors duration-200 flex flex-col items-center"
      >
        <div>📚</div>
        <div className="text-xs">Thư viện</div>
      </Link>

      <Link
        to="/app/support"
        className="hover:text-accent transition-colors duration-200 flex flex-col items-center"
      >
        <div>💬</div>
        <div className="text-xs">CSKH</div>
      </Link>
    </aside>
  );
};

export default Sidebar;
