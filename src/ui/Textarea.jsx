"use client";
import React from "react";

export default function Textarea(props) {
  return (
    <textarea
      className={`border rounded px-3 py-2 w-full ${props.className || ""}`}
      {...props}
    />
  );
}
