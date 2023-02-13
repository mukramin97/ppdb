<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Province;
use App\Models\Regency;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndoRegionController extends Controller
{
    public function indexPropinsi()
    {
        $propinsis = Province::all();

        return response()->json($propinsis);
    }

    public function indexKota($id)
    {
        $kotas = Regency::where('province_id', $id)->get();

        return response()->json($kotas);
    }

    public function indexNamaKota($namakota)
    {
        $kotas = Regency::whereHas('province', function ($query) use ($namakota) {
            $query->where('name', $namakota);
        })->get();

        return response()->json($kotas);
    }
}
