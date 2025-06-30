import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // 👈 Đảm bảo đây import file chứa :root variables (globals.css)
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/theme-provider"; // 👈 Import ThemeProvider

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("❌ Failed to find the root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider> {/* ✅ Thêm ThemeProvider bao ngoài App */}
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
