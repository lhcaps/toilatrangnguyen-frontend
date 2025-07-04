import React from "react";

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="flex-1 overflow-y-auto p-4 flex flex-col space-y-8 bg-background text-foreground transition-colors duration-300">
    {children}
  </section>
);

export default MainContent;
