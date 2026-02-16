import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

async function authorize(credentials: any) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
  console.log("🌍 baseUrl =", baseUrl);

  // ① トークン方式ログイン
  const loginRes = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials?.email,
      password: credentials?.password,
    }),
  });

  if (!loginRes.ok) {
    const data = await loginRes.json().catch(() => null);
    const code = data?.code ?? "login_failed";
    console.error("Laravel login failed", loginRes.status, code);
    throw new Error(code);
  }

  // ② user + token を返す
  const data = await loginRes.json();
  return {
    ...data.user,
    accessToken: data.token,
  };
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
        token.accessToken = (user as any).accessToken;
      }

      if (account?.provider && account.provider !== "credentials") {
        const providerId =
          (profile as any)?.sub?.toString() ??
          (profile as any)?.id?.toString() ??
          token.sub?.toString() ??
          "";
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const syncSecret = process.env.OAUTH_SYNC_SECRET;

        if (baseUrl && syncSecret && providerId) {
          const syncRes = await fetch(`${baseUrl}/api/oauth/sync`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Internal-Auth": syncSecret,
            },
            body: JSON.stringify({
              provider: account.provider,
              provider_id: providerId,
              name: user?.name ?? token.name ?? null,
              email: user?.email ?? token.email ?? null,
              avatar: (user as any)?.image ?? null,
            }),
          });

          if (syncRes.ok) {
            const data = await syncRes.json();
            token.user = data.user;
            token.accessToken = data.token;
          } else {
            token.oauthSyncError = "oauth_sync_failed";
          }
        } else {
          token.oauthSyncError = "oauth_sync_config_missing";
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      (session as any).accessToken = token.accessToken as string | undefined;
      (session as any).oauthSyncError = token.oauthSyncError as string | undefined;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
