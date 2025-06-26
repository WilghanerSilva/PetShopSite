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
            'is_done' => ['required', 'boolean'],
            'customer_id' => ['required', 'exists:users,id'],
            'employee_id' => ['required', 'exists:users,id'],
            'pos_session_id' => ['required', 'exists:pos_sessions,id'],
            'pet_id' => ['required', 'exists:pets,id'],
            'serviceTypes' => ['required', 'array'],
            'serviceTypes.*' => ['integer', 'exists:service_types,id'],
            'price' => ['required', 'decimal:*,2', 'min:0'],
        ];
    }

    public function messages()
    {
        return [
            'serviceTypes.required' => 'Por favor, informe os serviços realizados',
            'is_done.required' => 'Informe se o atendimento foi realizado ou não',
            'is_done.boolean' => 'Formato inválido',
            'customer_id.required' => 'Informe o cliente para o qual o atendimento foi realizado',
            'customer_id.exists' => 'O usuário informado não está cadastrado',
            'pet_id.required' => 'Informe o pet para o qual o atendimento foi realizado',
            'pet_id.exists' => 'O pet informado não está cadastrado no sistema',
            'pos_session_id.required' => 'Informe a sessão na qual o atendimento pertence',
            'pos_session_id.exists' => 'A sessão informada não está cadastrado no sistema',
            'serviceTypes.*.exists' => 'Um ou mais serviços informados não estão cadastrados no sistema',
            'price.required' => 'Por favor, informe o valor do serviço',
            'price.min' => 'Digite um valor com número positivo',
        ];
    }
}
