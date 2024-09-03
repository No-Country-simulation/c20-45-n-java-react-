import React from "react";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}
export default function container({ children, className }: ContainerProps) {
  return (
    <div
      className={`max-w-[1536px] w-screen container mx-auto px-3 md:px-4 ${className}`}
    >
      {children}
    </div>
  );
}
