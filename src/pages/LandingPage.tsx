import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-beige-200 to-beige-300 text-foreground flex flex-col items-center justify-center px-4">

      {/* Ô vuông mờ phía sau */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-8 pointer-events-none z-0"
        style={{ filter: "blur(10px)", opacity: 0.1 }}
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="bg-purple-300 rounded shadow-md"
            style={{ opacity: 0.05 + Math.random() * 0.1 }}
          />
        ))}
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 max-w-xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-black drop-shadow-lg select-none">
          Tôi là Trạng nguyên
        </h1>
        <p className="text-lg text-gray-700 select-none">Chỉ cần bạn dám, bạn có thể</p>

        <button
          onClick={() => navigate("/login")}
          className="inline-block bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
