"use client";

import React from "react";

export default function Error({ error, reset }) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px", textAlign: "center", minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2>Something went wrong</h2>
      <p style={{ color: "#666", maxWidth: "600px", margin: "16px auto" }}>
        {error?.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 24px",
          background: "#2a3b2c",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Try again
      </button>
    </div>
  );
}
