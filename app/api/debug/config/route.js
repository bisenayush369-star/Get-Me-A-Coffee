import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return new Response(JSON.stringify({ error: "Only in dev mode" }), { 
      status: 403,
      headers: { "content-type": "application/json" }
    });
  }

  const githubProvider = authOptions.providers.find(p => p.id === "github");

  const debugInfo = {
    environment: process.env.NODE_ENV,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nextAuthSecret: !!process.env.NEXTAUTH_SECRET ? "✓ Set" : "✗ Missing",
    github: {
      clientId: githubProvider?.options?.clientId || "MISSING",
      clientIdLength: githubProvider?.options?.clientId?.length || 0,
      clientSecretSet: !!githubProvider?.options?.clientSecret,
      clientSecretLength: githubProvider?.options?.clientSecret?.length || 0,
      allowDangerousEmailAccountLinking: githubProvider?.options?.allowDangerousEmailAccountLinking,
    },
    expectedCallbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
    timestamp: new Date().toISOString(),
  };

  // Also log to server console
  console.log("\n=== DEBUG API - NextAuth Config ===");
  console.log(JSON.stringify(debugInfo, null, 2));
  console.log("=== END DEBUG ===\n");

  return new Response(JSON.stringify(debugInfo, null, 2), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
