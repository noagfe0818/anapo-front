"use client";
import React from "react";

export default function Input(props) {
  return (
    <input
      className={`bg-gray-50  rounded px-3 py-2 w-full ${
        props.className || ""
      }`}
      {...props}
    />
  );
}
