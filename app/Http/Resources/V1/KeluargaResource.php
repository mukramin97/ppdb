<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class KeluargaResource extends JsonResource
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
            'siswa_id' => $this->siswa_id,
            'status_ayah' => $this->status_ayah,
            'nama_ayah' => $this->nama_ayah,
            'tempat_lahir_ayah' => $this->tempat_lahir_ayah,
            'tanggal_lahir_ayah' => $this->tanggal_lahir_ayah,
            'agama_ayah' => $this->agama_ayah,
            'alamat_rumah_ayah' => $this->alamat_rumah_ayah,
            'propinsi_ayah' => $this->propinsi_ayah,
            'kota_ayah' => $this->kota_ayah,
            'no_hp_ayah'=> $this->no_hp_ayah,
            'pend_terakhir_ayah' => $this->pend_terakhir_ayah,
            'pekerjaan_ayah' => $this->pekerjaan_ayah,
            'penghasilan_ayah' => $this->penghasilan_ayah,
            'status_ibu' => $this->status_ibu,
            'nama_ibu' => $this->nama_ibu,
            'tempat_lahir_ibu' => $this->tempat_lahir_ibu,
            'tanggal_lahir_ibu' => $this->tanggal_lahir_ibu,
            'agama_ibu' => $this->agama_ibu,
            'alamat_rumah_ibu' => $this->alamat_rumah_ibu,
            'propinsi_ibu' => $this->propinsi_ibu,
            'kota_ibu' => $this->kota_ibu,
            'no_hp_ibu' => $this->no_hp_ibu,
            'pend_terakhir_ibu' => $this->pend_terakhir_ibu,
            'pekerjaan_ibu' => $this->pekerjaan_ibu,
            'penghasilan_ibu' => $this->penghasilan_ibu,
        ];
    }
}
