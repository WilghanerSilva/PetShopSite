<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceTypeRequest;
use App\Models\ServiceType;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceTypeController extends Controller
{
    public function index()
    {
        $servicesTypes = ServiceType::all()->values()->toArray();
    }

    public function store(StoreServiceTypeRequest $request)
    {
        ServiceType::create($request->validated());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'decimal:*,2', 'min:0']
        ]);

        $serviceType = ServiceType::findOrFall($id);

        $serviceType->update([
            'name' => $request->name,
            'price' => $request->price
        ]);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $serviceType = ServiceType::find($id);

        if ($user->role == Role::Admin || $user->role == Role::Employee)
            $serviceType->delete();
    }
}
