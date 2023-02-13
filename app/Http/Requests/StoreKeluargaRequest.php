<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKeluargaRequest extends FormRequest
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
            'status_ayah' => ['nullable'],
            'nama_ayah' => ['nullable', 'min:3', 'max:50'],
            'tempat_lahir_ayah' => ['nullable', 'min:3', 'max:50'],
            'tanggal_lahir_ayah' => ['nullable', 'date'],
            'agama_ayah' => ['nullable'],
            'alamat_rumah_ayah' => ['nullable', 'min:3', 'max:255'],
            'propinsi_ayah' => ['nullable'],
            'kota_ayah' => ['nullable'],
            'no_hp_ayah' => ['nullable', 'regex:/^[0-9]+$/'],
            'pend_terakhir_ayah' => ['nullable'],
            'pekerjaan_ayah' => ['nullable', 'min:3', 'max:50'],
            'penghasilan_ayah' => ['nullable', 'numeric'],
            'status_ibu' => ['nullable'],
            'nama_ibu' => ['nullable', 'min:3', 'max:50'],
            'tempat_lahir_ibu' => ['nullable', 'min:3', 'max:50'],
            'tanggal_lahir_ibu' => ['nullable', 'date'],
            'agama_ibu' => ['nullable'],
            'alamat_rumah_ibu' => ['nullable', 'min:3', 'max:255'],
            'propinsi_ibu' => ['nullable'],
            'kota_ibu' => ['nullable'],
            'no_hp_ibu' => ['nullable', 'regex:/^[0-9]+$/'],
            'pend_terakhir_ibu' => ['nullable'],
            'pekerjaan_ibu' => ['nullable', 'min:3', 'max:50'],
            'penghasilan_ibu' => ['nullable', 'numeric'],
        ];
    }
}
