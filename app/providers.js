"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return (
    <SessionProvider basePath="/api/auth" refetchInterval={0}>
      {children}
    </SessionProvider>
  );
}
