import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext"; // 🔁 Import AuthProvider nếu bạn đặt trong context/

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("❌ Failed to find the root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider> {/* ✅ Bọc toàn bộ App trong AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
