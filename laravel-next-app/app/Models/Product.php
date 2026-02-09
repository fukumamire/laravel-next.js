<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; //このモデルは factory を使ってデータを量産できますよ ｽｲｯﾁ
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'description',
    'price',
  ];
}
