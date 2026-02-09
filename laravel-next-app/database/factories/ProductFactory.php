<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array //👉 1レコード分の設計図Product::factory()->create() が呼ばれるたびにここが実行される
  {
    return [
      'name' => $this->faker->word(),
      'description' => $this->faker->realText(50),
      'price' => $this->faker->numberBetween(500, 5000),
    ];
  }
}
