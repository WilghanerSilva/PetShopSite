<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ServiceController::class, 'listByCostumer'])->name('home');
    Route::post('/services', [ServiceController::class, 'store'])->name('service.store');
    Route::get('/pets', [PetController::class, 'listByCustomer'])->name('pet.listByCustomer');
    Route::get('/dashboard/pets', [PetController::class, 'index'])->name('dashboard.pet.index');
    Route::post('/dashboard/pets', [PetController::class, 'store'])->name('dashboard.pet.store');
    Route::get('/dashboard/clientes', [CustomerController::class, 'index'])->name('dashboard.customer.index');
    Route::get('/dashboard/adicionar-pet', [PetController::class, 'create'])->name('dashboard.customer.create');
    Route::get('/dashboard/atendimentos', [ServiceController::class, 'index'])->name('dashboard.service.index');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Home');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
