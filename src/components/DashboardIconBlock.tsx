import React from "react";
import { Link } from "react-router-dom";

type DashboardIconBlockProps = {
  title: string;
  icon: React.ReactNode;
  to: string; // Bắt buộc phải có đường dẫn để dùng Link
};

const DashboardIconBlock: React.FC<DashboardIconBlockProps> = ({ title, icon, to }) => {
  return (
    <Link to={to} className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-neutral-700 hover:shadow-lg transition cursor-pointer">
      <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto mb-3 text-white size-7">
        {icon}
      </div>
      <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">{title}</h3>
    </Link>
  );
};

export default DashboardIconBlock;
