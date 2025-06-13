<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\Service;
use App\Models\User;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $services = [];

        $sort = $request->input('sort', 'data');
        $direction = $request->input('direction', 'asc');


        if ($user == Role::Costumer) {
            if ($sort == 'pet')
                $services = Service::query()
                    ->join('pets', 'services.pet_id', '=', 'pets.id')
                    ->where('customer_id', $user->id)
                    ->orderBy('pets.name', $direction)
                    ->select('services.*', 'pets.name as pet_name')
                    ->paginate(9);
            else
                $services = Service::query()
                    ->join('pets', 'services.pet_id', '=', 'pets.id')
                    ->where('customer_id', $user->id)
                    ->orderBy('data', $direction)
                    ->select('services.*', 'pets.name as pet_name')
                    ->paginate(9);
        } else {
            if ($sort == 'pet')
                $services = Service::query()
                    ->join('pets', 'services.pet_id', '=', 'pets.id')
                    ->where('employee_id', $user->id)
                    ->orderBy('pets.name', $direction)
                    ->select('services.*', 'pets.name as pet_name')
                    ->paginate(9);
            else
                $services = Service::query()
                    ->join('pets', 'services.pet_id', '=', 'pets.id')
                    ->where('employee_id', $user->id)
                    ->orderBy('data', $direction)
                    ->select('services.*', 'pets.name as pet_name')
                    ->paginate(9);
        }

        return Inertia::render('Home', ['pagination' => $services]);
    }
}
