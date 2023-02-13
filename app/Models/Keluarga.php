<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keluarga extends Model
{
    use HasFactory;

    protected $table = 'keluarga';

    protected $fillable = [
        'siswa_id',
        'status_ayah',
        'nama_ayah',
        'tempat_lahir_ayah',
        'tanggal_lahir_ayah',
        'agama_ayah',
        'alamat_rumah_ayah',
        'propinsi_ayah',
        'kota_ayah',
        'no_hp_ayah',
        'pend_terakhir_ayah',
        'pekerjaan_ayah',
        'penghasilan_ayah',
        'status_ibu',
        'nama_ibu',
        'tempat_lahir_ibu',
        'tanggal_lahir_ibu',
        'agama_ibu',
        'alamat_rumah_ibu',
        'propinsi_ibu',
        'kota_ibu',
        'no_hp_ibu',
        'pend_terakhir_ibu',
        'pekerjaan_ibu',
        'penghasilan_ibu',
    ];

    public function siswa(){
        return $this->belongsTo(Siswa::class);
    }
}
