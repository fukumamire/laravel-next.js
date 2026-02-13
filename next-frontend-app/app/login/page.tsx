"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  // メールアドレスの状態
  const [email, setEmail] = useState("");

  // パスワードの状態
  const [password, setPassword] = useState("");

  // エラーメッセージの状態
  const [error, setError] = useState("");

  // 画面遷移用（App Router版）
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified") === "1";

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを止める
    setError(""); // 前回のエラーを消す

    // NextAuthに「ログインお願い！」と頼む
    const result = await signIn("credentials", {
      redirect: false, // 自動ジャンプはしない
      email,
      password,
    });
    // ログイン失敗時
    if (result?.error) {
      setError("メールアドレスまたはパスワードが正しくありません。");
      return;
    }

    // ログイン成功時
    if (result?.ok) {
      router.push("/"); // トップページへ
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">ログイン</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* メールアドレス */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* パスワード */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

            {/* エラー表示 */}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {verified && (
            <p className="text-sm text-green-600">メール認証が完了しました。ログインできます。</p>
          )}

           {/* 送信ボタン */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ログイン
            </button>
          </div>
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
              パスワードをお忘れですか？
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
