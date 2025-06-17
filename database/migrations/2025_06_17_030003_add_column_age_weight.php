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
        Schema::table('pets', function (Blueprint $table) {
            $table->addColumn('integer', 'age')->nullable();
            $table->addColumn('decimal', 'weight', [
                'precision' => 8,
                'scale' => 2,
            ])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pets', function (Blueprint $table) {
            $table->removeColumn('age');
            $table->removeColumn('weight');
        });
    }
};
