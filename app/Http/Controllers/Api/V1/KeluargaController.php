<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Siswa;
use App\Models\Keluarga;
use App\Models\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKeluargaRequest;
use App\Http\Resources\V1\KeluargaResource;
use Illuminate\Http\Request;

class KeluargaController extends Controller
{
    public function show($id)
    {
        $user = User::find($id);
		if (!$user) {
			return response()->json(['message' => 'User not found'], 404);
		}

		$siswa = $user->siswa;

        $keluarga = $siswa->keluarga;

        return new KeluargaResource($keluarga);
    }

    public function update(StoreKeluargaRequest $request, Keluarga $keluarga)
	{
		$keluarga->update($request->validated());

		return response()->json([
			'status' => 'success',
			'title' => 'Berhasil!',
			'message' => 'Perubahan data orang tua siswa berhasil disimpan.'
		], 200);
	}
}
