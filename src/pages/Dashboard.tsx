import React from "react";

const Dashboard: React.FC = () => {
  return (
      <div className="text-center">
        <h2 className="font-valky text-2xl mb-4">Chào mừng đến với Trạng Nguyên</h2>
        <p className="mb-4">Hãy bắt đầu kỳ thi hoặc xem kết quả của bạn.</p>
        <div className="flex flex-col items-center gap-2">
          <a href="/exams" className="underline">Bắt đầu làm bài thi</a>
          <a href="/results" className="underline">Xem kết quả thi</a>
          <a href="/profile" className="underline">Xem hồ sơ cá nhân</a>
        </div>
      </div>
  );
};

export default Dashboard;
