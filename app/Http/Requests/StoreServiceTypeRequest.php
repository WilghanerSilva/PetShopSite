<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceTypeRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'decimal:*,2', 'min:0'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Por favor, informe o nome do serviço',
            'name.max' => 'O nome informado ultrapassa o limite de caracteres',
            'price.required' => 'Por favor, informe o valor do serviço',
            'price.min' => 'Digite um valor com número positivo',
        ];
    }
}
