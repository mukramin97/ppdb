<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\TahunAjaran;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTahunAjaranRequest;
use App\Http\Resources\V1\TahunAjaranCollection;
use App\Http\Resources\V1\TahunAjaranResource;
use Illuminate\Http\Request;

class TahunAjaranController extends Controller
{
	public function index()
	{
		$tahun_ajarans = TahunAjaran::orderBy('created_at', 'desc')->paginate(5);
		return new TahunAjaranCollection($tahun_ajarans);
	}

	public function store(StoreTahunAjaranRequest $request)
	{
		$validatedData = $request->validated();

		$tahunAjaran = TahunAjaran::create([
			'nama_tahun_ajaran' => $validatedData['nama_tahun_ajaran'],
			'kode' => $validatedData['kode']
		]);

		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'Data tahun ajaran berhasil ditambah.'
		], 200);
	}

	public function update(StoreTahunAjaranRequest $request, TahunAjaran $tahunajaran)
	{
		if ($request->is_active == true) {
			TahunAjaran::where('is_active', true)->where('id', '!=', $tahunajaran->id)->update(['is_active' => false]);
		}

		$tahunajaran->update($request->validated());

		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'Perubahan data tahun ajaran berhasil disimpan.'
		], 200);
	}

	public function show(TahunAjaran $tahunajaran)
	{
		return new TahunAjaranResource($tahunajaran);
	}

	public function destroy(TahunAjaran $tahunajaran)
	{
		$tahunajaran->delete();
		return response()->json([
			'status' => 'info',
			'title' => 'Berhasil!',
			'message' => 'Data tahun ajaran berhasil dihapus.'
		], 200);
	}
}
