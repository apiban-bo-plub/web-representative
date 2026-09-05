"use client";

import React from "react";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", padding: "40px", textAlign: "center", background: "#fbf8f2", color: "#222" }}>
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
      </body>
    </html>
  );
}
