<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['role:admin']], function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Dashboard');
    })->name('dashboard');

    Route::get('/siswa', function () {
        return Inertia::render('Siswa/Siswa');
    })->name('siswa');

    Route::get('/jenjang', function () {
        return Inertia::render('Jenjang/Jenjang');
    });

    Route::get('/tahunajaran', function () {
        return Inertia::render('TahunAjaran/TahunAjaran');
    });
});

Route::group(['middleware' => ['role:siswa']], function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/', function () {
        return redirect()->route('/dashboardsiswa');
    });

    Route::get('/dashboardsiswa', function () {
        return Inertia::render('SiswaPages/DashboardSiswa');
    })->name('dashboardsiswa');

    Route::get('/editsiswa', function () {
        return Inertia::render('SiswaPages/FormulirSiswa');
    })->name('editsiswa');

    Route::get('/berkassiswa', function () {
        return Inertia::render('SiswaPages/BerkasSiswa');
    })->name('berkassiswa');

    Route::get('/editorangtua', function () {
        return Inertia::render('SiswaPages/FormulirOrangTua');
    })->name('editorangtua');
});

Route::get('/', function () {
    return redirect()->route('login');
})->middleware(['guest']);


Route::get('/registersiswa', function () {
    return Inertia::render('Auth/RegisterSiswa');
});

require __DIR__ . '/auth.php';
