import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // 📌 Đảm bảo đường dẫn đúng

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Dùng context

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
        login(data.token); // 🔐 lưu vào AuthContext + localStorage
        console.log("Login success:", data);
        navigate("/"); // ✅ Điều hướng về trang chủ
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Đã xảy ra lỗi khi đăng nhập.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-valky text-accent mb-4">Đăng nhập</h1>
      <div className="top flex justify-around mb-4">
        <i className="fab fa-google"></i>
        <i className="fab fa-facebook-square"></i>
        <i className="fab fa-linkedin"></i>
        <i className="fab fa-twitter-square"></i>
        <i className="fab fa-apple"></i>
      </div>

      <p className="divider"><span>Hoặc</span></p>

      <form onSubmit={handleLogin} className="w-full">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="remember flex items-center mb-2">
          <input
            id="checkbox"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="checkbox" className="ml-2">Ghi nhớ đăng nhập</label>
        </div>

        <button type="submit" className="w-full bg-accent text-white py-2 rounded hover:bg-purple-600 transition">
          Đăng nhập
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="bottom mt-2 flex justify-between text-sm">
        <Link to="/reset-password" className="underline">Quên mật khẩu?</Link>
        <Link to="/signup" className="underline">Tạo tài khoản</Link>
      </div>
    </div>
  );
};

export default Login;
