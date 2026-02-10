"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  // 今ログインしてる？誰？を取得
  const { data: session, status } = useSession();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogout = async () => {
    try {
      const token = (session as any)?.accessToken as string | undefined;
      if (token && baseUrl) {
        await fetch(`${baseUrl}/api/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (e) {
      console.error("Laravel logout failed", e);
    } finally {
      await signOut({ callbackUrl: "/login" });
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/*常に表示 */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          ECサイト
        </Link>
        
        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            商品一覧
          </Link>
          {!session && status !== "loading" && (
            <Link
              href="/register"
              className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
            >
              ユーザー登録
            </Link>
          )}
          {/* ① 認証状態を確認中 */}
          {status === "loading" ? (
            <p>Loading...</p>

          ) : session ? (
            /* ② ログイン済み */
            <div className="flex items-center space-x-4">
              <p>ようこそ, {session.user?.name}さん</p>

              <button
                onClick={handleLogout}
                className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                ログアウト
              </button>
            </div>

          ) : (
            /* ③ 未ログイン */
            <Link
              href="/login"
              className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              ログイン
            </Link>
          )}
        </div>

      </nav>
    </header>
  );
}
