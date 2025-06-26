<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pos_sessions', function (Blueprint $table) {
            $table->addColumn('decimal', 'opening_balance', [
                'precision' => 8,
                'scale' => 2,
            ])->nullable();

            $table->addColumn('decimal', 'closing_balance', [
                'precision' => 8,
                'scale' => 2,
            ])->nullable();

            $table->addColumn('decimal', 'balance', [
                'precision' => 8,
                'scale' => 2,
            ])->nullable();

            $table->text('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pos_sessions', function (Blueprint $table) {
            //
        });
    }
};
