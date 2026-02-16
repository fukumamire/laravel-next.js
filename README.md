# Laravel + Next.js 　商品一覧アプリ（認証付き）

Laravel（バックエンド）と Next.js（フロントエンド）を組み合わせた、モダンな Web アプリケーションを開発を学習のために作成しました。

## 機能

- 新規登録

  <img width="2854" height="1434" alt="Image" src="https://github.com/user-attachments/assets/d4c7078b-eb99-4b50-bb17-be37e87af491" />

- ログイン機能

<img width="2844" height="1420" alt="Image" src="https://github.com/user-attachments/assets/f65b1774-e370-49f5-9af4-31638ef7b09a" />

- ログアウト機能
- 新規登録時のメール認証
  （※テスト用のメールサーバは、Mailtrapを使用しています）

**🌟📩メール認証画面🌟**
<img width="2279" height="1247" alt="Image" src="https://github.com/user-attachments/assets/f5ec2e7e-ef0a-46c8-a0ec-c2deb6226d25" />

- パスワードリセット設定

**🌟パスワード再設定申請画面🌟**
<img width="2782" height="1388" alt="Image" src="https://github.com/user-attachments/assets/700abf1a-128d-4a84-8c48-35e1ee5bea5f" />

**🌟パスワード再設定のメール✉🌟**
<img width="1959" height="1353" alt="Image" src="https://github.com/user-attachments/assets/6d26b446-2dd5-41d6-a5ac-7eff893948a9" />

**🌟新パスワード設定画面🌟**
<img width="2731" height="1332" alt="Image" src="https://github.com/user-attachments/assets/d9392e22-853b-4015-9ed7-d38de1c73455" />

- 商品データを一覧で表示できる
- ログインしているかどうかで、表示されるボタンやメッセージが変わる

## 学習目的

- Laravel と Next.js を組み合わせたアプリを学ぶ
- SPA 認証の仕組みを理解する
- NextAuth.js を App Router 環境で使う方法を学ぶ
- 実務に近い構成での Web アプリ開発を体験する

## アプリケーションURL

Laravel API: http://localhost

Next.js: http://localhost:3000

phpMyAdmin: http://localhost:8080/

## 使用技術

### バックエンド

- Laravel 12
- Laravel Sanctum
- Laravel Sail（Docker）
- MySQL

### フロントエンド

- Next.js 16.1.4
- NextAuth.js
- TypeScript
- Tailwind CSS

### その他

- Docker / Docker Compose
- Node.js / npm

# 環境構築

## 前提条件

このアプリのバックエンドは Docker（Laravel Sail）を使用しています。

以下がインストールされている必要があります。

- Docker Desktop

## セットアップ手順

### 1. リポジトリをクローン

`git@github.com:fukumamire/laravel-next.js.git`

### 2. バックエンド（Laravel）のセットアップ

`cd laravel-next-app　`

- .env.example をコピーして .env を作成します。

  `cp .env.example .env`

  以下の項目を設定してください。

① DB設定

DB_CONNECTION=mysql

DB_HOST=mysql

DB_PORT=3306

DB_DATABASE=laravel

DB_USERNAME=sail

DB_PASSWORD=password

②Sanctum（SPA認証）

SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000

SESSION_DRIVER=cookie

SESSION_DOMAIN=localhost

③ フロントエンドURL（CORS用）

FRONTEND_URL=http://localhost:3000

CORS_SUPPORTS_CREDENTIALS=true

④その他

APP_URL=http://localhost

- Docker（Laravel Sail）を起動
  `./vendor/bin/sail up -d`

- Laravel のアプリケーションキーを生成
  `sail artisan key:generate　`

  ※ このコマンドは Laravel を正しく動かすために必要です

### 3. フロントエンド（Next.js）のセットアップ

`cd ../next-frontend-app`

`npm install`

- .env.example をコピーして .env.local を作成

  ※ `.env.example` が無いなら `.env.local を新規作成`してください。

`cp .env.example .env.local`

以下の項目を設定してください。

NEXT_PUBLIC_API_BASE_URL=http://localhost

NEXTAUTH_SECRET=dev-secret

NEXTAUTH_URL=http://localhost:3000

開発サーバーを起動
`npm run dev `

## 注意事項

- 本プロジェクトは学習用です
- セキュリティ設定は最小限です（本番利用は想定していません）

# 🔑 テストユーザー作成

名前：Test User

email：test@example.com

パスワード：1111
