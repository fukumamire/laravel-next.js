import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    oauthSyncError?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
    oauthSyncError?: string;
  }
}
