<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Pengumuman;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePengumumanRequest;
use App\Http\Resources\V1\PengumumanCollection;
use App\Http\Resources\V1\PengumumanResource;
use Illuminate\Http\Request;

class PengumumanController extends Controller
{
    public function index()
	{

		$pengumuman = Pengumuman::orderBy('created_at', 'desc')->paginate(5);

		return new PengumumanCollection($pengumuman);
	}

    public function store(StorePengumumanRequest $request)
	{
		Pengumuman::create($request->validated());
        
		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'Pengumuman berhasil ditambah.'
		], 200);
	}

    public function update(StorePengumumanRequest $request, Pengumuman $pengumuman)
    {
        $pengumuman->update($request->validated());

		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'Perubahan data Pengumuman berhasil disimpan.'
		], 200);
    }

    public function destroy(Pengumuman $pengumuman)
    {
        $pengumuman->delete();
		return response()->json([
			'status' => 'info',
			'title' => 'Berhasil!',
			'message' => 'Data Pengumuman berhasil dihapus.'
		], 200);
    }
}
