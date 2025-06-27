<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            ['id' => 1, 'name' => 'João Silva', 'email' => 'joao.silva@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'admin', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Maria Souza', 'email' => 'maria.souza@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'costumer', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Carlos Lima', 'email' => 'carlos.lima@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'costumer', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Fernanda Alves', 'email' => 'fernanda.alves@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'costumer', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'Rafael Castro', 'email' => 'rafael.castro@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'costumer', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'name' => 'Ana Beatriz', 'email' => 'ana.beatriz@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'costumer', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'name' => 'Luciano Rocha', 'email' => 'luciano.rocha@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'admin', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'name' => 'Juliana Mendes', 'email' => 'juliana.mendes@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'costumer', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'name' => 'Marcos Vinicius', 'email' => 'marcos.vinicius@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'costumer', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'name' => 'Patrícia Gomes', 'email' => 'patricia.gomes@example.com', 'password' => '$2y$12$h7.H4dsY3/ckcoL22ds/MuMUmmyN/melsaLVgpaqtVXgabeKOhFtK', 'role' => 'costumer', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
