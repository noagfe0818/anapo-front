"use client";
import React from "react";

export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 ${className}`}
    >
      {children}
    </span>
  );
}
