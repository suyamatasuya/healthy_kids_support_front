import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !NEXTAUTH_SECRET) {
  throw new Error("Missing required environment variables");
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // ユーザー情報が存在する場合、JWTトークンにユーザーIDを追加
      if (user) {
        token.id = parseInt(user.id as unknown as string, 10);
      }
      return token;
    },
    async session({ session, token }) {
      // トークンにユーザーIDが含まれている場合のみ、セッションに追加
      if (token && session.user) {
        session.user.id = parseInt(token.id as unknown as string, 10);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure the redirect is to a URL within our site
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
});
