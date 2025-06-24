<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ServiceController::class, 'listByCostumer'])->name('home');
    Route::post('/services', [ServiceController::class, 'store'])->name('service.store');
    Route::get('/pets', [PetController::class, 'listByCustomer'])->name('pet.listByCustomer');

    Route::get('/dashboard/pets', [PetController::class, 'index'])->name('dashboard.pet.index');
    Route::get('/dashboard/editar-pet/{id}', [PetController::class, 'edit'])->name('dashboard.pet.edit');
    Route::put('/dashboard/pet/{id}', [PetController::class, 'update'])->name('dashboard.pet.update');
    Route::post('/dashboard/pets', [PetController::class, 'store'])->name('dashboard.pet.store');
    Route::get('/dashboard/adicionar-pet', [PetController::class, 'create'])->name('dashboard.pet.create');
    Route::delete('/dashboard/pet/{id}', [PetController::class, 'destroy'])->name('dashboard.pet.delete');

    Route::get('/dashboard/clientes', [CustomerController::class, 'index'])->name('dashboard.customer.index');
    Route::delete('/dashboard/clientes', [CustomerController::class, 'destroy'])->name('dashboard.customer.delete');
    Route::get('/dashboard/atendimentos', [ServiceController::class, 'index'])->name('dashboard.service.index');

    Route::get('/dashboard/servicos', [ServiceTypeController::class, 'index'])->name('dashboard.service-type.index');
    Route::get('/dashboard/adicionar-servico', [ServiceTypeController::class, 'create'])->name('dashboard.service-type.create');
    Route::get('/dashboard/editar-servico/${id}', [ServiceTypeController::class, 'edit'])->name('dashboard.service-type.edit');
    Route::post('/dashboard/servicos', [ServiceTypeController::class, 'store'])->name('dashboard.service-type.store');
    Route::put('/dashboard/servicos/{id}', [ServiceTypeController::class, 'update'])->name('dashboard.service-type.update');
    Route::delete('/dashboard/servicos/{id}', [ServiceTypeController::class, 'destroy'])->name('dashboard.service-type.destroy');

    Route::get('/dashboard', [ServiceController::class, 'pdvShow'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
