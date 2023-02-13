<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSiswaRequest extends FormRequest
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
            'nama_siswa' => ['required', 'min:3', 'max:50'],
            'jenis_tes' => ['required'],
            'tempat_lahir' => ['required', 'min:3', 'max:30'],
            'tanggal_lahir' => ['required'],
            'jenis_kelamin' => ['required'],
            'jenjang_id' => ['required'],
            'no_hp' => ['required'],
            'agama' => [],
            'nisn' => ['nullable', 'regex:/^[0-9]+$/'],
            'nik' => ['nullable', 'regex:/^[0-9]+$/'],
            'alamat' => [],
            'propinsi' => [],
            'kota' => [],
            'kode_pos' => ['nullable', 'regex:/^[0-9]+$/' ],
            'nama_sekolah_asal' => ['nullable', 'min:3', 'max:50'],
            'alamat_sekolah_asal' => ['nullable', 'min:3', 'max:100'],
            'no_ijazah' => ['nullable', 'regex:/^[0-9]+$/'],
            'no_skhun' => ['nullable', 'regex:/^[0-9]+$/'],
            'status_keluarga' => [],
            'dokumen_kk' => [],
            'dokumen_akta' => [],
            'dokumen_ijazah' => [],
            'dokumen_sertifikat' => [],
            'status_keluarga' => [],
            'status_pendaftaran' => [],
            'status_seleksi' => [],
            'nilai_ujian' => [],
            'nilai_interview' => [],
        ];
    }
}
