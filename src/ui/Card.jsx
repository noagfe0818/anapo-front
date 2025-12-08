"use client";
import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white  rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-4 s border-b border-gray-50 shadow-xs  ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4  ${className}`}>{children}</div>;
}
