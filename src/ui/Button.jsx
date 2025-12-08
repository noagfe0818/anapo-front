"use client";
import React from "react";

export default function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const baseStyle = "px-4 py-2 rounded transition-colors font-medium";
  const variantStyle =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
      : "bg-[#5CA0FF] text-white hover:bg-blue-500";

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}
