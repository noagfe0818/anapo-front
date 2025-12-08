"use client";
import React from "react";

export default function Label({ children, ...props }) {
  return (
    <label className="mb-2 block text-sm font-medium text-gray-700" {...props}>
      {children}
    </label>
  );
}
