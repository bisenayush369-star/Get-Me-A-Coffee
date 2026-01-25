"use client";

import Link from "next/link";

export default function AuthError() {
  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Login failed</h1>
      <p>Please try again.</p>
      <Link href="/login" style={{ color: "#a855f7" }}>Go back to Login</Link>
    </div>
  );
}
