<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
  //ログイン機能
  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|email', // メールの形式か？空じゃないか？
      'password' => 'required',
    ]);
    // データベースからユーザーを探す
    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
      throw ValidationException::withMessages([
        'email' => ['認証情報が正しくありません。'],
      ]);
    }
    if (! $user->hasVerifiedEmail()) {
      throw ValidationException::withMessages([
        'email' => ['メールアドレスの確認が完了していません。'],
      ]);
    }
    // パスワードが合っていたら「合言葉（トークン）」を発行する
    $token = $user->createToken('auth-token')->plainTextToken;
    // ユーザー情報とトークンをセットで返す
    return response()->json([
      'user' => $user,
      'token' => $token,
    ]);
  }
  //ログアウト機能 (logout メソッド)
  public function logout(Request $request)
  {
    //  今使っている「合言葉（トークン）」（削除）
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'ログアウトしました']);
  }
  // ユーザー登録機能 (register メソッド)
  public function register(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|unique:users', // 他の人と被ってないか？
      'password' => 'required|min:8|confirmed', // 8文字以上か？確認用と一致してるか？
    ]);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password), // パスワードは暗号化して保存！
    ]);
    $user->sendEmailVerificationNotification();

    return response()->json([
      'message' => '確認メールを送信しました。メールを確認してください。',
    ], 201);
  }

  // パスワードリセットメール送信
  public function forgotPassword(Request $request)
  {
    $request->validate([
      'email' => 'required|email',
    ]);

    $status = Password::sendResetLink($request->only('email'));

    return $status === Password::RESET_LINK_SENT
      ? response()->json(['message' => __($status)])
      : response()->json(['message' => __($status)], 422);
  }

  // 新しいパスワードへ更新
  public function resetPassword(Request $request)
  {
    $request->validate([
      'token' => 'required',
      'email' => 'required|email',
      'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
      $request->only('email', 'password', 'password_confirmation', 'token'),
      function (User $user, string $password): void {
        $user->forceFill([
          'password' => Hash::make($password),
          'remember_token' => Str::random(60),
        ])->save();
      }
    );

    return $status === Password::PASSWORD_RESET
      ? response()->json(['message' => __($status)])
      : response()->json(['message' => __($status)], 422);
  }

  // OAuthログイン後のユーザー同期
  public function oauthSync(Request $request)
  {
    $internalSecret = (string) config('services.oauth_sync.secret');
    $requestSecret = (string) $request->header('X-Internal-Auth', '');

    if ($internalSecret === '' || ! hash_equals($internalSecret, $requestSecret)) {
      return response()->json(['message' => 'Unauthorized'], 403);
    }

    $data = $request->validate([
      'provider' => 'required|in:google,github',
      'provider_id' => 'required|string|max:255',
      'name' => 'nullable|string|max:255',
      'email' => 'required|email|max:255',
      'avatar' => 'nullable|string|max:2048',
    ]);

    $user = User::where('provider', $data['provider'])
      ->where('provider_id', $data['provider_id'])
      ->first();

    if (! $user) {
      $user = User::where('email', $data['email'])->first();
    }

    if ($user) {
      $user->name = $data['name'] ?? $user->name;
      $user->email = $data['email'];
      $user->provider = $data['provider'];
      $user->provider_id = $data['provider_id'];
      $user->avatar = $data['avatar'] ?? $user->avatar;
      if (! $user->email_verified_at) {
        $user->email_verified_at = Carbon::now();
      }
      $user->save();
    } else {
      $user = User::create([
        'name' => $data['name'] ?? 'OAuth User',
        'email' => $data['email'],
        'password' => Hash::make(Str::random(40)),
        'provider' => $data['provider'],
        'provider_id' => $data['provider_id'],
        'avatar' => $data['avatar'] ?? null,
        'email_verified_at' => Carbon::now(),
      ]);
    }

    $token = $user->createToken('oauth-' . $data['provider'])->plainTextToken;

    return response()->json([
      'user' => $user,
      'token' => $token,
    ]);
  }
}
