<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PurchaseController extends Controller
{
  public function store(Request $request)
  {
    // リクエストから商品IDを受け取るNext.js から送られた   json { "product_id": 1 }を受信している
    $productId = $request->input('product_id');

    // 今はダミー（本来はDB保存など）
    return response()->json([
      'message' => '購入が完了しました',
      'product_id' => $productId,
    ]);
  }
}
