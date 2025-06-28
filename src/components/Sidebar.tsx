// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-16 bg-[#1c1c1c] dark:bg-gray-800 flex flex-col items-center py-4 space-y-6">
      <button title="Viết">✏️</button>
      <Link to="/" className="hover:text-purple-400 transition flex flex-col items-center">
        <div>🏠</div>
        <div className="text-xs">Home</div>
      </Link>
      <Link to="/library" className="hover:text-purple-400 transition flex flex-col items-center">
        <div>📚</div>
        <div className="text-xs">Thư viện</div>
      </Link>
      <Link to="/support" className="hover:text-purple-400 transition flex flex-col items-center">
        <div>💬</div>
        <div className="text-xs">CSKH</div>
      </Link>
    </aside>
  );
};

export default Sidebar;