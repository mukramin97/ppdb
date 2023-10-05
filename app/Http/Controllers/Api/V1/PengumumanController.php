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

		$pengumuman = Pengumuman::orderBy('created_at', 'desc')->get();

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

    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
