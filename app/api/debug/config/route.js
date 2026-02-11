/**
 * DEBUG ENDPOINT - WORKS IN BOTH DEV AND PRODUCTION
 * Shows what client_id NextAuth is actually using
 * 
 * In Netlify:
 * - Go to Netlify Dashboard → Site → Functions → View logs
 * - See console.log output in real-time
 * 
 * Usage:
 * GET /api/debug/config
 */

export async function GET(req) {
  // Import authOptions at request time (not module load time)
  // This ensures we see the actual runtime values
  const { authOptions } = await import("../auth/[...nextauth]/route.js");

  // Get GitHub provider (NextAuth internal provider object)
  const githubProvider = authOptions.providers.find(p => p.id === "github");

  // CRITICAL: Check what's actually configured
  const debugInfo = {
    buildTime: {
      NODE_ENV: process.env.NODE_ENV,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "NOT SET",
      GITHUB_CLIENT_ID_LENGTH: (process.env.GITHUB_CLIENT_ID || "").length,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "NOT SET",
      NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
    },
    runtime: {
      githubProvider_id: githubProvider?.id || "MISSING",
      githubProvider_options_clientId: githubProvider?.options?.clientId || "MISSING",
      githubProvider_clientId_length: (githubProvider?.options?.clientId || "").length,
      githubProvider_clientSecret_set: !!githubProvider?.options?.clientSecret,
      githubProvider_allowDangerousEmailAccountLinking: githubProvider?.options?.allowDangerousEmailAccountLinking,
    },
    expected: {
      correctClientId: "Ov23liMhd61fytVazvPm",
      callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
    },
    timestamp: new Date().toISOString(),
  };

  // ALWAYS log to server console (Netlify Functions logs)
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║  DEBUG API - NextAuth Config Check    ║");
  console.log("╚════════════════════════════════════════╝\n");
  console.log("🔍 ENVIRONMENT VARIABLES AT RUNTIME:");
  console.log(JSON.stringify(debugInfo.buildTime, null, 2));
  console.log("\n🎯 NEXTAUTH PROVIDER CONFIGURATION:");
  console.log(JSON.stringify(debugInfo.runtime, null, 2));
  console.log("\n✅ EXPECTED VALUES:");
  console.log(JSON.stringify(debugInfo.expected, null, 2));
  console.log("\n╔════════════════════════════════════════╗\n");

  // Return JSON for inspection
  return new Response(JSON.stringify(debugInfo, null, 2), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
