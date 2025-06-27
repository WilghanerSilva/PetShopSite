<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PosSessionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pos_sessions')->insert([
            ['id' => 1, 'user_id' => 1, 'opening_balance' => 100.00, 'balance' => 100.00, 'closing_balance' => 0.00, 'description' => 'Sessão da manhã', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'user_id' => 7, 'opening_balance' => 150.00, 'balance' => 220.00, 'closing_balance' => 0.00, 'description' => 'Sessão da tarde', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'user_id' => 1, 'opening_balance' => 200.00, 'balance' => 350.00, 'closing_balance' => 0.00, 'description' => 'Plantão sábado', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'user_id' => 7, 'opening_balance' => 80.00, 'balance' => 140.00, 'closing_balance' => 0.00, 'description' => 'Turno noite', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'user_id' => 1, 'opening_balance' => 90.00, 'balance' => 160.00, 'closing_balance' => 0.00, 'description' => 'Sessão extra', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'user_id' => 1, 'opening_balance' => 50.00, 'balance' => 90.00, 'closing_balance' => 0.00, 'description' => 'Sessão teste', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'user_id' => 7, 'opening_balance' => 75.00, 'balance' => 105.00, 'closing_balance' => 0.00, 'description' => 'Sessão especial', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'user_id' => 1, 'opening_balance' => 60.00, 'balance' => 85.00, 'closing_balance' => 0.00, 'description' => 'Manhã segunda', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'user_id' => 7, 'opening_balance' => 95.00, 'balance' => 130.00, 'closing_balance' => 0.00, 'description' => 'Atendimento geral', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'user_id' => 1, 'opening_balance' => 70.00, 'balance' => 100.00, 'closing_balance' => 0.00, 'description' => 'Sessão fim de semana', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
