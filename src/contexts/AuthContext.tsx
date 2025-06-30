import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type UserType = {
  username: string | null;
  email: string | null;
};

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<UserType | null>(null);

  const isAuthenticated = !!token;

  const parseToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        username: payload.username || null,
        email: payload.email || null,
      };
    } catch {
      return null;
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    const userData = parseToken(token);
    if (userData) {
      setUser(userData);
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      const userData = parseToken(token);
      if (userData) {
        setUser(userData);
      } else {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
