<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTahunAjaranRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nama_tahun_ajaran' => ['required', 'min:3', 'max:30', Rule::unique('tahun_ajaran')->ignore($this->tahunajaran)],
            'kode' => ['required', 'min:2', 'max:5', 'regex:/^[0-9]+$/'],
            'is_active' => []
        ];
    }
}
