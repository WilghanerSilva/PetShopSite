<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\PosSessionController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ServiceController::class, 'listByCostumer'])->name('home');
    Route::post('/services', [ServiceController::class, 'store'])->name('service.store');
    Route::get('/pets', [PetController::class, 'listByCustomer'])->name('pet.listByCustomer');

    Route::get('/panel/pets', [PetController::class, 'index'])->name('panel.pet.index');
    Route::get('/panel/editar-pet/{id}', [PetController::class, 'edit'])->name('panel.pet.edit');
    Route::put('/panel/pet/{id}', [PetController::class, 'update'])->name('panel.pet.update');
    Route::post('/panel/pets', [PetController::class, 'store'])->name('panel.pet.store');
    Route::get('/panel/adicionar-pet', [PetController::class, 'create'])->name('panel.pet.create');
    Route::delete('/panel/pet/{id}', [PetController::class, 'destroy'])->name('panel.pet.delete');

    Route::get('/panel/clientes', [CustomerController::class, 'index'])->name('panel.customer.index');
    Route::delete('/panel/clientes', [CustomerController::class, 'destroy'])->name('panel.customer.delete');
    Route::get('/panel/atendimentos', [ServiceController::class, 'index'])->name('panel.service.index');

    Route::get('/panel/servicos', [ServiceTypeController::class, 'index'])->name('panel.service-type.index');
    Route::get('/panel/adicionar-servico', [ServiceTypeController::class, 'create'])->name('panel.service-type.create');
    Route::get('/panel/editar-servico/${id}', [ServiceTypeController::class, 'edit'])->name('panel.service-type.edit');
    Route::post('/panel/servicos', [ServiceTypeController::class, 'store'])->name('panel.service-type.store');
    Route::put('/panel/servicos/{id}', [ServiceTypeController::class, 'update'])->name('panel.service-type.update');
    Route::delete('/panel/servicos/{id}', [ServiceTypeController::class, 'destroy'])->name('panel.service-type.destroy');

    Route::get('/panel', [PosSessionController::class, 'pdvHome'])->name('panel.pdv');
    Route::post('/panel/pos_session', [PosSessionController::class, 'store'])->name('panel.pos_session.store');
    Route::put('/panel/pos_session/{id}', [PosSessionController::class, 'updateBalance'])->name('panel.pos_session.update_balance');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
