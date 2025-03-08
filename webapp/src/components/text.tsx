import React from "react";

const Text: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <span
      className={`transition-all font-inter overflow-wrap break-word selection:bg-neutral-gray selection:text-neutral-white cursor-default ${className}`}
    >
      {children}
    </span>
  );
};

export default Text;
