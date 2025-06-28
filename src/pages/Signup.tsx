import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, gender, birthday }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Đăng ký thành công! Mời bạn đăng nhập.");
        navigate("/login"); // ✅ điều hướng về trang login
      } else {
        setError(data.message || "Đăng ký thất bại.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Đã xảy ra lỗi khi đăng ký.");
    }
  };

  return (
    <div className="app" data-theme={theme}>
      <div className="container">
        <h1 className="font-valky text-2xl mb-4">Đăng ký</h1>

        <div className="top flex justify-around mb-4">
          <i className="fab fa-google"></i>
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-twitter-square"></i>
          <i className="fab fa-apple"></i>
        </div>

        <p className="divider"><span>Hoặc</span></p>

        <form onSubmit={handleSignup} className="w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="username">Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            placeholder="Chọn tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            placeholder="Tạo mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="gender">Giới tính</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>

          <label htmlFor="birthday">Ngày sinh</label>
          <input
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-accent text-white py-2 rounded hover:bg-purple-600 transition">
            Đăng ký
          </button>
        </form>

        {error && <p className="text-red-500 mt-2" aria-live="assertive">{error}</p>}

        <p className="create mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="underline cursor-pointer">
            Đăng nhập
          </Link>
        </p>

        <div className="theme-toggle mt-4">
          <h2 className="text-sm">{theme === "light" ? "Light Theme" : "Dark Theme"}</h2>
          <i
            onClick={switchTheme}
            className={theme === "light" ? "fas fa-toggle-on" : "fas fa-toggle-off"}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Signup;
