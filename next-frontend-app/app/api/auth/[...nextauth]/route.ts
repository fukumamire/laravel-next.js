import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
    console.error("Laravel login failed", loginRes.status);
    return null;
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
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      (session as any).accessToken = token.accessToken as string | undefined;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
