<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PetController extends Controller
{
    function index()
    {
        $user = Auth::user();
        $pets = Pet::where('user_id', $user->id)->paginate(3);

        return Inertia::render('pet-index', ['pagination' => $pets]);
    }
}
