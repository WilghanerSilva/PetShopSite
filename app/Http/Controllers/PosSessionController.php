<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePosSessionRequest;
use App\Models\Pet;
use App\Models\PosSession;
use App\Models\Service;
use App\Models\ServiceType;
use App\Models\User;
use App\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosSessionController extends Controller
{
    public function store(StorePosSessionRequest $request)
    {
        $session = PosSession::create($request->validated());

        return redirect()->route('panel.pdv', ["session" => $session->id]);
    }

    public function pdvHome(Request $request)
    {
        $session_id = $request->input('session', 0);
        $services = [];
        $session = null;

        $serviceTypes = ServiceType::all()->values()->toArray();
        $customers = User::where('role', Role::Costumer)->get();
        $customerId = $request->input('customer_id', 0);

        $pets = [];

        if ($customerId != 0) {
            $pets = Pet::where('user_id', $customerId)->get();
        }

        if ($session_id != 0) {
            $session = PosSession::findOrFail($session_id);
            $services = Service::query()
                ->join('users as customers', 'services.customer_id', '=', 'customers.id')
                ->join('users as employees', 'services.employee_id', '=', 'employees.id')
                ->join('pets', 'pets.id', '=', 'services.pet_id')
                ->where('pos_session_id', $session_id)
                ->select(
                    'services.*',
                    'customers.name as customer_name',
                    'employees.name as employee_name',
                    'pets.name as pet_name'
                )
                ->get();

            $services->load('types');
        }

        return Inertia::render('Panel/Home', [
            'services'     => $services,
            'session'      => $session,
            'pets'         => $pets,
            'customers'    => $customers,
            'serviceTypes' => $serviceTypes
        ]);
    }

    public function updateBalance(Request $request, $id)
    {
        $request->validate([
            'value' => ['required', 'numeric'],
        ]);

        $session = PosSession::findOrFail($id);
        $session->balance += $request->input('valor');
        $session->save();
    }
}
