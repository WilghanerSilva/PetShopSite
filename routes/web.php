<?php

use App\Http\Controllers\PetController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ServiceController::class, 'index'])->name('home');
    Route::post('/services', [ServiceController::class, 'store'])->name('service.store');
    Route::get('/pets', [PetController::class, 'index'])->name('pet.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
