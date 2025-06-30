import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../components/theme-provider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, setTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token);
        navigate("/app/dashboard");
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch {
      setError("Đã xảy ra lỗi khi đăng nhập.");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-300">
      <Card className="max-w-md w-full bg-card text-card-foreground border border-border shadow">
        <CardHeader>
          <CardTitle className="text-center">Đăng nhập</CardTitle>
          <CardDescription className="text-center">
            Đăng nhập bằng mạng xã hội hoặc email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded bg-background border-border text-foreground"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Mật khẩu</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded bg-background border-border text-foreground"
              />
            </div>
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm">Ghi nhớ đăng nhập</label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded hover:opacity-90 transition"
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full border border-primary text-primary py-2 rounded hover:bg-primary hover:text-primary-foreground transition"
            >
              Đổi giao diện: {theme === "light" ? "Dark" : "Light"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
          <Link to="/reset-password" className="underline">Quên mật khẩu?</Link>
          <Link to="/signup" className="underline">Tạo tài khoản</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
