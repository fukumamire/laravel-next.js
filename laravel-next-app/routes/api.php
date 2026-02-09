<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\AuthController;


// 公開API（認証不要）商品一覧API（変更なし）
Route::get('/products', [ProductController::class, 'index']);

// 購入処理
Route::post('/purchase', [PurchaseController::class, 'store']);

// 認証不要
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// 認証必要
Route::middleware('auth:sanctum')->group(function () {
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  Route::post('/logout', [AuthController::class, 'logout']);
});
