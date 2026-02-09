<?php

namespace App\Http\Controllers; //app/Http/Controllers フォルダに属してますという名刺
use App\Models\Product; // Productモデルをインポート
use Illuminate\Http\Request;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Product::all(); //📦 倉庫から商品を全部・・てくる  products テーブルから全レコードを取得

    return response()->json($products); //JSONでお客さんに渡すPHPの配列・オブジェクトをJSON形式に変換 HTTPレスポンスとして返す
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
