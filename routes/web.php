<?php

use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ServiceController::class, 'index'])->name('home');
    Route::get('/service/create', [ServiceController::class, 'create'])->name('service.create');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
