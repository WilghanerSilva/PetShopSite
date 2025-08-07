<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePosSessionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'opening_balance' => ['required', 'decimal:*,2', 'min:0'],
            'balance' => ['decimal:*,2', 'min:0'],
            'closing_balance' => ['decimal:*,2', 'min:0'],
            'description' => ['string', 'nullable']
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'Informe o cliente para o qual o atendimento foi realizado',
            'user_id.exists' => 'O usuário informado não está cadastrado',
            'pos_session_id.required' => 'Informe a sessão na qual o atendimento pertence',
            'pos_session_id.exists' => 'A sessão informada não está cadastrado no sistema',
            'serviceTypes.*.exists' => 'Um ou mais serviços informados não estão cadastrados no sistema',
            'opening_balance.min' => 'Digite um valor com número positivo',
            'balance.min' => 'Digite um valor com número positivo',
            'closing_balance.min' => 'Digite um valor com número positivo',
        ];
    }
}
