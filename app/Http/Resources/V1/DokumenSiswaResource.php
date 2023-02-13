<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class DokumenSiswaResource extends JsonResource
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
            'pasfoto' => $this->pasfoto,
            'dokumen_kk' => $this->dokumen_kk,
            'dokumen_akta' => $this->dokumen_akta,
            'dokumen_ijazah' => $this->dokumen_ijazah,
            'dokumen_sertifikat' => $this->dokumen_sertifikat,
        ];
    }
}
