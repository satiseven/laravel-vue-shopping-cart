<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {


        return [
            'user_id' => Arr::random(User::query()->pluck('id')->toArray()),
            'transaction_id' => fake()->randomNumber(),
            'total' => fake()->numberBetween(1000, 100000),
        ];
    }
}
