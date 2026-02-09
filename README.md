# Laravel + Next.js 　商品一覧アプリ（認証付き）

Laravel（バックエンド）と Next.js（フロントエンド）を組み合わせた、モダンな Web アプリケーションを開発を学習のために作成しました。

## 機能

- ユーザー登録済みのメールアドレスとパスワードでログイン・ログアウトができる
- ログイン中のユーザー名を画面上に表示できる
- 商品データを一覧で表示できる
- ログインしているかどうかで、表示されるボタンやメッセージが変わる

## 学習目的

- Laravel と Next.js を組み合わせた
- SPA 認証（Sanctum + Cookie）の仕組みを理解する
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

- Next.js 16.1.4（App Router）
- NextAuth.js（Credentials Provider）
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
