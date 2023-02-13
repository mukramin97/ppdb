<?php

use App\Http\Controllers\Api\V1\SchoolController;
use App\Http\Controllers\Api\V1\JenjangController;
use App\Http\Controllers\Api\V1\TahunAjaranController;
use App\Http\Controllers\Api\V1\SiswaController;
use App\Http\Controllers\Api\V1\IndoRegionController;
use App\Http\Controllers\Api\V1\KeluargaController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'v1'], function(){
    Route::apiResource('schools', SchoolController::class);
    Route::apiResource('jenjang', JenjangController::class);
    Route::apiResource('tahunajaran', TahunAjaranController::class);
    Route::apiResource('siswa', SiswaController::class);
    Route::apiResource('keluarga', KeluargaController::class);

    Route::get('jenjang_all', [JenjangController::class, 'jenjang_all'])->name('jenjang_all');
    Route::get('siswa/berkassiswa/{id}', [SiswaController::class, 'berkas_siswa'])->name('berkas_siswa');
    Route::get('siswa/dashboard/{id}', [SiswaController::class, 'dashboard'])->name('dashboard_siswa');

    Route::get('indoRegionPropinsi', [IndoRegionController::class, 'indexPropinsi'])->name('indexPropinsi');
    Route::get('indoRegionKota/{id}', [IndoRegionController::class, 'indexKota'])->name('indexKota');
    Route::get('indoRegionNamaKota/{namakota}', [IndoRegionController::class, 'indexNamaKota'])->name('indexNamaKota');

    Route::post('file_upload/{id}', [SiswaController::class, 'file_upload'])->name('file_upload');
    Route::get('file_download/{id}/{document}', [SiswaController::class, 'file_download'])->name('file_download');
    Route::delete('file_delete/{id}/{document}', [SiswaController::class, 'file_delete'])->name('file_delete');
    Route::get('preview_pasfoto/{id}', [SiswaController::class, 'preview_pasfoto'])->name('preview_pasfoto');

});
