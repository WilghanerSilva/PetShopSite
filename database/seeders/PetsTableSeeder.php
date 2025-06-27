<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pets')->insert([
            ['id' => 1, 'name' => 'Rex', 'specie' => 'Cachorro', 'breed' => 'Labrador', 'age' => 4, 'weight' => 25.5, 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Luna', 'specie' => 'Gato', 'breed' => 'Siamês', 'age' => 2, 'weight' => 4.2, 'user_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Thor', 'specie' => 'Cachorro', 'breed' => 'Poodle', 'age' => 6, 'weight' => 10.0, 'user_id' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Mel', 'specie' => 'Cachorro', 'breed' => 'Bulldog', 'age' => 3, 'weight' => 20.0, 'user_id' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'Nina', 'specie' => 'Gato', 'breed' => 'Persa', 'age' => 1, 'weight' => 3.5, 'user_id' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'name' => 'Bob', 'specie' => 'Cachorro', 'breed' => 'Beagle', 'age' => 5, 'weight' => 12.5, 'user_id' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'name' => 'Mia', 'specie' => 'Gato', 'breed' => 'Maine Coon', 'age' => 2, 'weight' => 6.8, 'user_id' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'name' => 'Spike', 'specie' => 'Cachorro', 'breed' => 'Boxer', 'age' => 7, 'weight' => 28.0, 'user_id' => 10, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'name' => 'Bidu', 'specie' => 'Cachorro', 'breed' => 'Vira-lata', 'age' => 4, 'weight' => 15.2, 'user_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'name' => 'Tico', 'specie' => 'Gato', 'breed' => 'Sphynx', 'age' => 3, 'weight' => 3.1, 'user_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
