<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePetRequest;
use App\Models\Pet;
use App\Models\User;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PetController extends Controller
{
    function listByCustomer()
    {
        $user = Auth::user();
        $pets = Pet::where('user_id', $user->id)->paginate(3);

        return Inertia::render('pet-index', ['pagination' => $pets]);
    }

    function index(Request $request)
    {

        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');
        $query = $request->input('query', '');
        $pets = [];


        if ($query == '')
            $pets = Pet::query()
                ->join('users', 'pets.user_id', '=', 'users.id')
                ->select('pets.*', 'users.name as user_name')
                ->orderBy($sort, $direction)
                ->get();
        else
            $pets = Pet::query()
                ->join('users', 'pets.user_id', '=', 'users.id')
                ->where('pets.name', 'like', "%$query%")
                ->select('pets.*', 'users.name as user_name')
                ->orderBy($sort, $direction)
                ->get();

        return Inertia::render('Dashboard/Pets', ['pets' => $pets]);
    }

    function create()
    {
        $customers = User::all()->where('role', Role::Costumer)->values()->toArray();

        return Inertia::render('Dashboard/CreatePet', ['customers' => $customers]);
    }

    function store(StorePetRequest $request)
    {
        Pet::create($request->validated());
    }

    function destroy($id)
    {
        $user = Auth::user();
        $pet = Pet::find($id);

        if ($pet) {
            if ($user->role == Role::Admin || $user->role == Role::Employee) {
                $pet->delete();
            } else {
                if ($pet->user_id === $user->id) {
                    $pet->delete();
                }
            }
        }
    }
}
