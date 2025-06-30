import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MainContent from "./MainContent";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../theme-provider";

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <div className="flex-1 bg-background text-foreground flex">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          {isAuthenticated && <Topbar />}
          <MainContent>
            <Outlet />
          </MainContent>
        </main>
      </div>
    </div>
  );
};

export default Layout;
