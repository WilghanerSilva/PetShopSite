<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Role;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('Signup');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate(
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ],
            [
                'name.required' => 'Por favor, informe seu nome',
                'name.max' => 'O nome informado é muito grande',
                'email.required' => 'Por favor, informe seu email',
                'email.email' => 'Informe um email válido',
                'email.unique' => 'O email informado já está em uso',
                'password.required' => 'A senha é obrigatória',
                'password.confirmed' => 'As senhas devem coincidir'
            ]
        );

        $user = User::create([
            'name' => $request->name,
            'email' => strtolower($request->email),
            'role' => Role::Costumer,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('home');
    }
}
