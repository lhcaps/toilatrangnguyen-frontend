import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MainContent from "./MainContent";
import { useAuth } from "../contexts/AuthContext";

const Layout: React.FC = () => {
  const [theme] = useLocalStorage("theme", "light");
  const { isAuthenticated } = useAuth();

  return (
    <div className={`min-h-screen flex ${theme === "dark" ? "bg-blackBg text-lightBg" : "bg-lightBg text-black"}`}>
      <Sidebar />
      <main className="flex-1 flex flex-col">
        {isAuthenticated && <Topbar />} {/* ✅ Chỉ hiện Topbar nếu đã đăng nhập */}
        <MainContent>
          <Outlet />
        </MainContent>
      </main>
    </div>
  );
};

export default Layout;
