import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../components/theme-provider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

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
        navigate("/app/login");
      } else {
        setError(data.message || "Đăng ký thất bại.");
      }
    } catch {
      setError("Đã xảy ra lỗi khi đăng ký.");
    }
  };

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-300">
      <Card className="max-w-md w-full bg-card text-card-foreground border border-border shadow">
        <CardHeader>
          <CardTitle className="text-center">Đăng ký</CardTitle>
          <CardDescription className="text-center">
            Đăng ký bằng mạng xã hội hoặc email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-3 text-2xl mb-4">
            <i className="fab fa-google hover:text-red-500 cursor-pointer"></i>
            <i className="fab fa-facebook-square hover:text-blue-600 cursor-pointer"></i>
            <i className="fab fa-linkedin hover:text-blue-500 cursor-pointer"></i>
            <i className="fab fa-twitter-square hover:text-blue-400 cursor-pointer"></i>
            <i className="fab fa-apple hover:text-black cursor-pointer"></i>
          </div>
          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
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
              <label htmlFor="username" className="block text-sm font-medium mb-1">Tên đăng nhập</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">Giới tính</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded bg-background border-border text-foreground"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label htmlFor="birthday" className="block text-sm font-medium mb-1">Ngày sinh</label>
              <input
                id="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded bg-background border-border text-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded hover:opacity-90 transition"
            >
              Đăng ký
            </button>
            <button
              type="button"
              onClick={switchTheme}
              className="w-full border border-primary text-primary py-2 rounded hover:bg-primary hover:text-primary-foreground transition"
            >
              Đổi giao diện: {theme === "light" ? "Dark" : "Light"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          Đã có tài khoản?
          <Link to="/login" className="ml-1 underline text-primary hover:text-primary-foreground">
            Đăng nhập
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
