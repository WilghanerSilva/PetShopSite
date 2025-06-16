<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
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

        $sort = $request->input('sort', 'date');
        $direction = $request->input('direction', 'asc');

        $customerId = $request->input('customer_id', 0);
        $customers = User::all()->where('role', Role::Costumer)->values()->toArray();
        $pets = [];

        if ($direction == '')
            $direction = 'asc';

        if ($customerId != 0)
            $pets = Pet::all()->where('user_id', $customerId)->values()->toArray();

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
                    ->orderBy('date', $direction)
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
                    ->orderBy('date', $direction)
                    ->select('services.*', 'pets.name as pet_name')
                    ->paginate(9);
        }

        return Inertia::render('Home', ['pagination' => $services, 'customers' => $customers, 'pets' => $pets]);
    }

    public function store(StoreServiceRequest $request)
    {
        Service::create($request->validated());
    }
}
