<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('service_types')->insert([
            ['id' => 1, 'name' => 'Banho', 'price' => 49.90, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Tosa', 'price' => 69.50, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Vacinação', 'price' => 89.00, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Consulta Veterinária', 'price' => 120.00, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'Vermifugação', 'price' => 60.00, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'name' => 'Higiene Bucal', 'price' => 45.00, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'name' => 'Hidratação de Pelagem', 'price' => 55.00, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'name' => 'Tosa Higiênica', 'price' => 50.00, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'name' => 'Exame de Sangue', 'price' => 130.00, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'name' => 'Consulta Comportamental', 'price' => 150.00, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
