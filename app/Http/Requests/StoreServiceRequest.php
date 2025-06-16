<?php

namespace App\Http\Requests;

use App\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();

        return $user->role != Role::Costumer;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'is_done' => ['required', 'boolean'],
            'customer_id' => ['required', 'exists:users,id'],
            'employee_id' => ['required', 'exists:users,id'],
            'pet_id' => ['required', 'exists:pets,id']
        ];
    }

    public function messages()
    {
        return [
            'type.required' => 'Por favor, informe o serviço realizado',
            'data.required' => 'Por favor, informe a data do atendimento',
            'data.date' => 'Formato inválido para data',
            'is_done.required' => 'Informe se o atendimento foi realizado ou não',
            'is_done.boolean' => 'Formato inválido',
            'customer_id.required' => 'Informe o cliente para o qual o atendimento foi realizado',
            'customer_id.exists' => 'O usuário informado não está cadastrado',
            'pet_id.required' => 'Informe o pet para o qual o atendimento foi realizado',
            'pet_id.exists' => 'O pet informado não está cadastrado no sistema',
        ];
    }
}
