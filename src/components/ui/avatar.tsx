import React from "react";

export const Avatar: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className={`relative inline-block h-10 w-10 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

export const AvatarImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-full w-full object-cover" />
);

export const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="flex h-full w-full items-center justify-center bg-gray-300 text-sm font-medium text-white">
    {children}
  </span>
);
