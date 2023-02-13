<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'siswa';

    protected $fillable = [
        'nama_siswa',
        'nomor_formulir',
        'jenis_tes',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'nisn',
        'nik',
        'alamat',
        'propinsi',
        'kota',
        'kode_pos',
        'no_hp',
        'nama_sekolah_asal',
        'alamat_sekolah_asal',
        'no_ijazah',
        'no_skhun',
        'status_keluarga',
        'dokumen_kk',
        'dokumen_akta',
        'dokumen_ijazah',
        'dokumen_bukti_pembayaran',
        'dokumen_sertifikat',
        'status_pendaftaran',
        'status_seleksi',
        'nilai_ujian',
        'nilai_interview',
        'user_id',
        'jenjang_id',
        'tahun_ajaran_id',
    ];

    public function jenjang(){
        return $this->belongsTo(Jenjang::class);
    }

    public function tahun_ajaran(){
        return $this->belongsTo(TahunAjaran::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function keluarga(){
        return $this->hasOne(Keluarga::class);
    }
}
