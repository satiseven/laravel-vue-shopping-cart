<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create();
        Category::factory(20)->create();
        Product::factory(10)->create();
        Order::factory(10)->create();
        $orders = Order::all();
        $categories = Category::all();
        Product::all()->each(function ($product) use ($categories, $orders) {
            $product->categories()->attach(
                $categories->random(2)->pluck('id')->toArray()
            );
            $product->orders()->attach(
                $orders->random(2)->pluck('id')->toArray()
            );
        });
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
