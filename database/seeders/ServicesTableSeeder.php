<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('services')->insert([
            ['id' => 1, 'is_done' => 1, 'customer_id' => 9, 'employee_id' => 7, 'pet_id' => 6, 'pos_session_id' => 9, 'price' => 82.6, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'is_done' => 1, 'customer_id' => 6, 'employee_id' => 1, 'pet_id' => 1, 'pos_session_id' => 6, 'price' => 119.2, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'is_done' => 1, 'customer_id' => 4, 'employee_id' => 7, 'pet_id' => 2, 'pos_session_id' => 4, 'price' => 73.77, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'is_done' => 1, 'customer_id' => 5, 'employee_id' => 1, 'pet_id' => 3, 'pos_session_id' => 6, 'price' => 50.79, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'is_done' => 0, 'customer_id' => 2, 'employee_id' => 7, 'pet_id' => 6, 'pos_session_id' => 4, 'price' => 81.48, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'is_done' => 0, 'customer_id' => 6, 'employee_id' => 1, 'pet_id' => 7, 'pos_session_id' => 10, 'price' => 52.73, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'is_done' => 0, 'customer_id' => 4, 'employee_id' => 7, 'pet_id' => 2, 'pos_session_id' => 4, 'price' => 74.96, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'is_done' => 1, 'customer_id' => 4, 'employee_id' => 2, 'pet_id' => 10, 'pos_session_id' => 1, 'price' => 104.01, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'is_done' => 0, 'customer_id' => 9, 'employee_id' => 2, 'pet_id' => 1, 'pos_session_id' => 2, 'price' => 140.29, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'is_done' => 1, 'customer_id' => 9, 'employee_id' => 2, 'pet_id' => 1, 'pos_session_id' => 9, 'price' => 58.61, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
