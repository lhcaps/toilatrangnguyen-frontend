// MainContent.tsx
import React from "react";

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="flex-1 overflow-y-auto p-4 flex flex-col space-y-8">
      {children}
    </section>
  );
};

export default MainContent;