<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerController extends Controller
{
    function index(Request $request)
    {
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');
        $query = $request->input('query', '');
        $customers = [];


        if ($query == '')
            $customers = User::where('role', Role::Costumer)
                ->orderBy($sort, $direction)
                ->get();
        else
            $customers = $customers = User::where('role', Role::Costumer)
                ->where('name', 'like', "%$query%")
                ->orderBy($sort, $direction)
                ->get();

        return Inertia::render('Dashboard/Customers', ['customers' => $customers]);
    }

    function destroy($id)
    {
        $user = Auth::user();
        $costumer = User::find($id);

        if ($costumer && $user->role == Role::Admin || $user->role == Role::Costumer)
            $costumer->delete();
    }
}
