<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Jenjang;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJenjangRequest;
use App\Http\Resources\V1\JenjangCollection;
use App\Http\Resources\V1\JenjangResource;
use Illuminate\Http\Request;

class JenjangController extends Controller
{
	public function index()
	{
		$jenjangs = Jenjang::orderBy('created_at', 'desc')->paginate(5);
		return new JenjangCollection($jenjangs);
	}

	public function jenjang_all()
	{
		$jenjangs = Jenjang::orderBy('created_at', 'desc')->get();
		return new JenjangCollection($jenjangs);
	}

	public function store(StoreJenjangRequest $request)
	{
		Jenjang::create($request->validated());
		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'Data jenjang pendidikan berhasil ditambah.'
		], 200);
	}

	public function update(StoreJenjangRequest $request, Jenjang $jenjang)
	{
		$jenjang->update($request->validated());
		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'Perubahan data jenjang pendidikan berhasil disimpan.'
		], 200);
	}

	public function show(Jenjang $jenjang)
	{
		return new JenjangResource($jenjang);
	}

	public function destroy(Jenjang $jenjang)
	{
		$jenjang->delete();
		return response()->json([
			'status' => 'info',
			'title' => 'Berhasil!',
			'message' => 'Data jenjang pendidikan berhasil dihapus.'
		], 200);
	}
}
