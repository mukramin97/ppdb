<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Siswa;
use App\Models\User;
use App\Models\Jenjang;
use App\Models\Keluarga;
use App\Models\TahunAjaran;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
	{
        $tahun_ajaran_aktif = TahunAjaran::where('is_active', 1)->first();

        $jenjangList = Jenjang::all();

        $jenjangArray = $jenjangList->map(function ($jenjang) use ($tahun_ajaran_aktif) {
            $siswaCount = 0;
        
            if ($tahun_ajaran_aktif) {
                $siswaCount = Siswa::where('tahun_ajaran_id', $tahun_ajaran_aktif->id)
                    ->where('jenjang_id', $jenjang->id)
                    ->count();
            }
        
            return [
                'nama' => $jenjang->nama_jenjang,
                'jumlah_pendaftar' => $siswaCount,
            ];
        });

		if ($tahun_ajaran_aktif) {
            $jumlah_pendaftar = Siswa::where('tahun_ajaran_id', $tahun_ajaran_aktif->id)->count();
		} else {
			$jumlah_pendaftar = 0;
		}

        return response()->json(['jumlah_pendaftar_jenjang' => $jenjangArray, 'jumlah_pendaftar' => $jumlah_pendaftar]);

	}
}
