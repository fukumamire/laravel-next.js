import { test, expect } from "@playwright/test";

// テストをグループ化
test.describe("ログイン機能", () => {
  // 各テストの前にログインページにアクセスする
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/login");
  });

  // ログイン成功のテストケース
  test("正しい認証情報でログインできること", async ({ page }) => {
    // 1. フォームを入力する
    await page.getByLabel("メールアドレス").fill("test@example.com");
    await page.getByLabel("パスワード").fill("1111");

    // 2. ログインボタンをクリックする
    await page.getByRole("button", { name: "ログイン", exact: true }).click();

    // （URLが切り替わるのを待つ）
    await page.waitForURL("**/");

    // 3. ホームページにリダイレクトされたことを確認する
    await expect(page).toHaveURL("http://localhost:3000/");

    // 4. ユーザー名が表示されていることを確認する
    await expect(page.getByText("ようこそ, Test Userさん")).toBeVisible();
  });

  // ログイン失敗のテストケース
  test("間違った認証情報ではログインできないこと", async ({ page }) => {
    // 1. フォームに間違った情報を入力する
    await page.getByLabel("メールアドレス").fill("wrong@example.com");
    await page.getByLabel("パスワード").fill("wrongpassword");

    // 2. ログインボタンをクリックする
    await page.getByRole("button", { name: "ログイン", exact: true }).click();

    // 通信が終わるのを待つ
    await page.waitForLoadState("networkidle");
    // 3. エラーメッセージが表示されることを確認する
    await expect(
      page.getByText("メールアドレスまたはパスワードが正しくありません。"),
    ).toBeVisible();

    // 4. ログインページに留まっていることを確認する
    await expect(page).toHaveURL("http://localhost:3000/login");
  });
});
