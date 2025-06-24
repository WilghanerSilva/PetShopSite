<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePetRequest extends FormRequest
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
            'specie' => ['required', 'string', 'max:255'],
            'breed' => ['required', 'string', 'max:255'],
            'age' => ['required', 'integer', 'min:0'],
            'weight' => ['required', 'decimal:*,2', 'min:0'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Por favor, informe o nome do pet',
            'name.max' => 'O nome informado ultrapassa o limite de caracteres',
            'breed.required' => 'Por favor, informe a raça do pet',
            'breed.max' => 'a raça informada ultrapassa o limite de caracteres',
            'specie.required' => 'Por favor, informe a especie do pet',
            'specie.max' => 'a especie informada ultrapassa o limite de caracteres',
            'age.required' => 'Por favor, informe a idade do pet',
            'age.min' => 'Digite uma idade com valor positivo',
            'weight.required' => 'Por favor, informe o peso do pet',
            'weight.min' => 'Digite um peso com valor positivo',
        ];
    }
}
