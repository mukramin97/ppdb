<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Siswa;
use App\Models\User;
use App\Models\Jenjang;
use App\Models\Keluarga;
use App\Models\TahunAjaran;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSiswaRequest;
use App\Http\Resources\V1\SiswaCollection;
use App\Http\Resources\V1\SiswaResource;
use App\Http\Resources\V1\DokumenSiswaResource;
use App\Http\Resources\V1\SiswaResourceDashboard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Str;

class SiswaController extends Controller
{
	public function index()
	{

		$tahun_ajaran_aktif = TahunAjaran::where('is_active', 1)->first();

		if ($tahun_ajaran_aktif) {
			$siswas = Siswa::where('tahun_ajaran_id', $tahun_ajaran_aktif->id)
				->orderBy('created_at', 'desc')
				->paginate(10);
		} else {
			// Handle the case where no active academic year was found.
			$siswas = null; // or any other appropriate handling
		}

		return new SiswaCollection($siswas);
	}

	public function store(StoreSiswaRequest $request)
	{

		$validatedData = $request->validated();

		$tahunAjaran = TahunAjaran::where('is_active', true)->first();
		$kodeTahunAjaran = $tahunAjaran->kode;
		$tahun_ajaran_id = $tahunAjaran->id;

		$jenjang = Jenjang::where('id', '=', $validatedData['jenjang_id'])->first();
		$jenjangKode = $jenjang->kode;
		$jenjang->counter += 1;
		$sCounter = sprintf('%04d', strval($jenjang->counter));
		$jenjang->save();

		$nomorFormulir = $jenjangKode . $kodeTahunAjaran . $sCounter;
		$emailUser = strtolower($nomorFormulir);
		$emailUser = $emailUser . '@ppdb.com';

		$user = User::create([
			'name' => $validatedData['nama_siswa'],
			'email' => $emailUser,
			'password' => bcrypt($validatedData['no_hp']),
			'remember_token' => Str::random(60),
		]);

		$user->assignRole('siswa');
		$user_id = $user->id;

		$siswa = Siswa::create([
			'nama_siswa' => $validatedData['nama_siswa'],
			'nomor_formulir' => $nomorFormulir,
			'jenis_tes' => $validatedData['jenis_tes'],
			'tempat_lahir' => $validatedData['tempat_lahir'],
			'tanggal_lahir' => $validatedData['tanggal_lahir'],
			'jenis_kelamin' => $validatedData['jenis_kelamin'],
			'no_hp' => $validatedData['no_hp'],
			'user_id' => $user_id,
			'jenjang_id' => $validatedData['jenjang_id'],
			'tahun_ajaran_id' => $tahun_ajaran_id
		]);

		$siswa_id = $siswa->id;

		Keluarga::create([
			'siswa_id' => $siswa_id
		]);

		//Return data to the user about login information
		$returnData = [
			'name' => $validatedData['nama_siswa'],
			'email' => $emailUser,
			'password' => $validatedData['no_hp']
		];

		return response()->json($returnData);
	}

	public function update(StoreSiswaRequest $request, Siswa $siswa)
	{
		$siswa->update($request->validated());

		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'Perubahan data siswa berhasil disimpan.'
		], 200);
	}

	public function show($id)
	{

		$user = User::find($id);
		if (!$user) {
			return response()->json(['message' => 'User not found'], 404);
		}

		$siswa = $user->siswa;

		return new SiswaResource($siswa);
	}


	public function file_upload(Request $request, $id)
	{
		$request->validate([
			'pasfoto' => 'sometimes|file|mimes:jpg|max:2048',
			'dokumen_kk' => 'sometimes|file|mimes:pdf|max:2048',
			'dokumen_akta' => 'sometimes|file|mimes:pdf|max:2048',
			'dokumen_ijazah' => 'sometimes|file|mimes:pdf|max:2048',
			'dokumen_sertifikat' => 'sometimes|file|mimes:pdf|max:2048',
		]);

		$document = Siswa::where('id', '=', $id)->first();

		if ($request->pasfoto) {
			if ($document->pasfoto) {
				Storage::delete($document->pasfoto);
			}
			$pasfoto = $request->file('pasfoto');
			$pasfotoPath = $pasfoto->store('public');
			$document->pasfoto = $pasfotoPath;
		}
		if ($request->dokumen_kk) {
			//Delete the current file before insert another one
			if ($document->dokumen_kk) {
				Storage::delete($document->dokumen_kk);
			}
			$kk = $request->file('dokumen_kk');
			$kkPath = $kk->store('public');
			$document->dokumen_kk = $kkPath;
		}
		if ($request->dokumen_akta) {
			if ($document->dokumen_akta) {
				Storage::delete($document->dokumen_akta);
			}
			$akta = $request->file('dokumen_akta');
			$aktaPath = $akta->store('public');
			$document->dokumen_akta = $aktaPath;
		}
		if ($request->dokumen_ijazah) {
			if ($document->dokumen_ijazah) {
				Storage::delete($document->dokumen_ijazah);
			}
			$ijazah = $request->file('dokumen_ijazah');
			$ijazahPath = $ijazah->store('public');
			$document->dokumen_ijazah = $ijazahPath;
		}
		if ($request->dokumen_sertifikat) {
			if ($document->dokumen_sertifikat) {
				Storage::delete($document->dokumen_sertifikat);
			}
			$sertifikat = $request->file('dokumen_sertifikat');
			$ijazahPath = $sertifikat->store('public');
			$document->dokumen_sertifikat = $ijazahPath;
		}
		$document->save();

		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'File siswa berhasil diunggah!'
		], 200);
	}

	public function destroy(Siswa $siswa)
	{
		$siswa->delete();
		return response()->json([
			'status' => 'info',
			'title' => 'Berhasil!',
			'message' => 'Data siswa berhasil dihapus!'
		], 200);
	}

	public function file_download($id, $document)
	{
		$siswa = Siswa::where('id', '=', $id)->first();

		if ($document == 'pasfoto') {
			$dokumen = str_replace('/', '\\', $siswa->pasfoto);
			$download_file = storage_path("app\\" . $dokumen);
		} else if ($document == 'dokumen_kk') {
			$dokumen = str_replace('/', '\\', $siswa->dokumen_kk);
			$download_file = storage_path("app\\" . $dokumen);
		} else if ($document == 'dokumen_akta') {
			$dokumen = str_replace('/', '\\', $siswa->dokumen_akta);
			$download_file = storage_path("app\\" . $dokumen);
		} else if ($document == 'dokumen_ijazah') {
			$dokumen = str_replace('/', '\\', $siswa->dokumen_ijazah);
			$download_file = storage_path("app\\" . $dokumen);
		} else if ($document == 'dokumen_sertifikat') {
			$dokumen = str_replace('/', '\\', $siswa->dokumen_sertifikat);
			$download_file = storage_path("app\\" . $dokumen);
		}

		return response()->file($download_file);
	}

	public function file_delete($id, $document)
	{
		$siswa = Siswa::where('id', '=', $id)->first();

		if ($document == 'pasfoto') {
			Storage::delete($siswa->pasfoto);
			$siswa->pasfoto = null;
		} else if ($document == 'dokumen_kk') {
			Storage::delete($siswa->dokumen_kk);
			$siswa->dokumen_kk = null;
		} else if ($document == 'dokumen_akta') {
			Storage::delete($siswa->dokumen_akta);
			$siswa->dokumen_akta = null;
		} else if ($document == 'dokumen_ijazah') {
			Storage::delete($siswa->dokumen_ijazah);
			$siswa->dokumen_ijazah = null;
		} else if ($document == 'dokumen_sertifikat') {
			Storage::delete($siswa->dokumen_sertifikat);
			$siswa->dokumen_sertifikat = null;
		}
		$siswa->save();

		return response()->json([
			'status' => 'info',
			'title' => 'Berhasil!',
			'message' => 'File siswa berhasil dihapus!'
		], 200);
	}


	public function berkas_siswa($id)
	{
		$user = User::find($id);
		if (!$user) {
			return response()->json(['message' => 'User not found'], 404);
		}

		$siswa = $user->siswa;

		return new DokumenSiswaResource($siswa);
	}

	public function dashboard($id)
	{
		$user = User::find($id);
		if (!$user) {
			return response()->json(['message' => 'User not found'], 404);
		}

		$siswa = $user->siswa;

		return new SiswaResourceDashboard($siswa);
	}

	public function preview_pasfoto($id)
	{
		$user = User::find($id);
		if (!$user) {
			return response()->json(['message' => 'User not found'], 404);
		}

		$siswa = $user->siswa;
		$path = storage_path("app\\" . $siswa->pasfoto);

		$path = str_replace('/', '\\', $path);

		return response()->file($path);
	}
}
