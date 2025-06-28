import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// ✅ Khởi tạo context mặc định
const AuthContext = createContext<AuthContextType>({
  username: null,
  email: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// ✅ Provider bao toàn app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const isAuthenticated = !!token;

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username || null);
      setEmail(payload.email || null);
    } catch {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername(null);
    setEmail(null);
  };

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.username || null);
        setEmail(payload.email || null);
      } catch {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ username, email, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook dùng trong component
export const useAuth = () => useContext(AuthContext);
