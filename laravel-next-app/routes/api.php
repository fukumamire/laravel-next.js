<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Events\Verified;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\AuthController;
use App\Models\User;


// 公開API（認証不要）商品一覧API（変更なし）
Route::get('/products', [ProductController::class, 'index']);

// 購入処理
Route::post('/purchase', [PurchaseController::class, 'store']);

// 認証不要
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// 認証必要
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => '確認メールを再送しました。']);
  });
});

Route::get('/email/verify/{id}/{hash}', function (Request $request, string $id, string $hash) {
  if (! $request->hasValidSignature()) {
    abort(403, '無効な認証リンクです。');
  }

  $user = User::findOrFail($id);

  if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
    abort(403, '無効な認証リンクです。');
  }

  if (! $user->hasVerifiedEmail()) {
    $user->markEmailAsVerified();
    event(new Verified($user));
  }

  $frontendUrl = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');

  return redirect()->away("{$frontendUrl}/login?verified=1");
})->middleware(['signed'])->name('verification.verify');
