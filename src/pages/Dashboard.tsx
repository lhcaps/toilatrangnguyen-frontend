import React from "react";
import DashboardIconBlock from "../components/DashboardIconBlock";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <main className="flex-1 p-6 max-w-[85rem] mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Chào mừng đến với Trạng Nguyên</h2>
        <p className="mb-8 text-center text-muted-foreground">
          Hãy bắt đầu kỳ thi hoặc xem kết quả của bạn.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <DashboardIconBlock
            title="📝 Bắt đầu làm bài thi"
            icon={<span style={{ fontSize: "36px" }}>📝</span>}
            to="/app/exams"
          />
          <DashboardIconBlock
            title="📊 Xem kết quả thi"
            icon={<span style={{ fontSize: "36px" }}>📊</span>}
            to="/app/results"
          />
          <DashboardIconBlock
            title="👤 Xem hồ sơ cá nhân"
            icon={<span style={{ fontSize: "36px" }}>👤</span>}
            to="/app/profile"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
