<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceTypeRequest;
use App\Models\ServiceType;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServiceTypeController extends Controller
{
    public function index()
    {
        $servicesTypes = ServiceType::all()->values()->toArray();

        return Inertia::render('Panel/ServiceType/List', ['servicesTypes' => $servicesTypes]);
    }

    public function create()
    {
        return Inertia::render('Panel/ServiceType/Create');
    }

    public function store(StoreServiceTypeRequest $request)
    {
        ServiceType::create($request->validated());
    }

    public function edit($id)
    {
        $serviceType = ServiceType::findOrFail($id);

        return Inertia::render('Panel/ServiceType/Edit', ['serviceType' => $serviceType]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'decimal:*,2', 'min:0']
        ]);

        $serviceType = ServiceType::findOrFail($id);

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
