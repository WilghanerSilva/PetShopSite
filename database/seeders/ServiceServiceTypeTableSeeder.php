<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceServiceTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('service_service_type')->insert([
            ['service_id' => 1, 'service_type_id' => 1],
            ['service_id' => 1, 'service_type_id' => 10],
            ['service_id' => 2, 'service_type_id' => 7],
            ['service_id' => 3, 'service_type_id' => 2],
            ['service_id' => 4, 'service_type_id' => 1],
            ['service_id' => 5, 'service_type_id' => 5],
            ['service_id' => 5, 'service_type_id' => 10],
            ['service_id' => 5, 'service_type_id' => 1],
            ['service_id' => 6, 'service_type_id' => 10],
            ['service_id' => 7, 'service_type_id' => 7],
            ['service_id' => 7, 'service_type_id' => 2],
            ['service_id' => 7, 'service_type_id' => 9],
            ['service_id' => 8, 'service_type_id' => 7],
            ['service_id' => 8, 'service_type_id' => 6],
            ['service_id' => 8, 'service_type_id' => 2],
            ['service_id' => 9, 'service_type_id' => 8],
            ['service_id' => 9, 'service_type_id' => 4],
            ['service_id' => 9, 'service_type_id' => 9],
            ['service_id' => 10, 'service_type_id' => 2],
        ]);
    }
}
