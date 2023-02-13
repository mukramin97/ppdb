<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class SiswaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nama_siswa' => $this->nama_siswa,
            'nomor_formulir' => $this->nomor_formulir,
            'jenis_tes' => $this->jenis_tes,
            'tempat_lahir' => $this->tempat_lahir,
            'tanggal_lahir' => $this->tanggal_lahir,
            'jenis_kelamin' => $this->jenis_kelamin,
            'agama' => $this->agama,
            'nisn' => $this->nisn,
            'nik' => $this->nik,
            'alamat' => $this->alamat,
            'propinsi' => $this->propinsi,
            'kota' => $this->kota,
            'kode_pos' => $this->kode_pos,
            'no_hp' => $this->no_hp,
            'nama_sekolah_asal' => $this->nama_sekolah_asal,
            'alamat_sekolah_asal' => $this->alamat_sekolah_asal,
            'no_ijazah' => $this->no_ijazah,
            'no_skhun' => $this->no_skhun,
            'status_keluarga' => $this->status_keluarga,
            'dokumen_kk' => $this->dokumen_kk,
            'dokumen_akta' => $this->dokumen_akta,
            'dokumen_ijazah' => $this->dokumen_ijazah,
            'dokumen_bukti_pembayaran' => $this->dokumen_bukti_pembayaran,
            'dokumen_sertifikat' => $this->dokumen_sertifikat,
            'status_pendaftaran' => $this->status_pendaftaran,
            'status_seleksi' => $this->status_seleksi,
            'nilai_ujian' => $this->nilai_ujian,
            'nilai_interview' => $this->nilai_interview,
            'jenjang_id' => $this->jenjang_id,
            'tahun_ajaran_id' => $this->tahun_ajaran_id,
        ];
    }
}
