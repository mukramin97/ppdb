<?php

namespace Database\Seeders;

use App\Models\TahunAjaran;
use App\Models\Jenjang;
use App\Models\User;
use App\Models\Siswa;
use App\Models\Keluarga;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');

        $tahun_ajaran_id = TahunAjaran::where('is_active', true)->value('id');
        $kode_tahun_ajaran = TahunAjaran::where('id', '=', $tahun_ajaran_id)->value('kode');

        for ($i = 1; $i <= 100; $i++) {

            $name = $faker->Name();

            $jenjang_id = $faker->numberBetween(1, 3);

            $jenjang = Jenjang::where('id', '=', $jenjang_id)->first();
            $jenjang->counter += 1;
            $sCounter = sprintf('%04d', strval($jenjang->counter));
            $jenjang->save();

            $kode_jenjang = $jenjang->kode;

            $nomor_formulir = $kode_jenjang . $kode_tahun_ajaran . $sCounter;
            $email = strtolower($nomor_formulir);

            $user = User::create([
                'name' => $name,
                'email' => $email . '@ppdb.com',
                'password' => bcrypt('Admin.123'),
                'remember_token' => Str::random(60),
            ]);

            $user->assignRole('siswa');
            $user_id = $user->id;




            $siswa = Siswa::create([
                'nama_siswa' => $name,
                'nomor_formulir' => $nomor_formulir,
                'jenis_tes' => $faker->randomElement(['Offline', 'Online']),
                'tempat_lahir' => $faker->randomElement(['Makassar', 'Maros', 'Gowa', 'Pangkep']),
                'tanggal_lahir' => $faker->date(),
                'jenis_kelamin' => $faker->randomElement(['Laki-laki', 'Perempuan']),
                'no_hp' => $faker->numerify('08#########'),
                'user_id' => $user_id,
                'jenjang_id' => $jenjang_id,
                'tahun_ajaran_id' => $tahun_ajaran_id
            ]);

            $siswa_id = $siswa->id;

            Keluarga::create([
                'siswa_id' => $siswa_id,
                'nama_ayah' => $faker->firstName(),
                'nama_ibu' => $faker->firstName(),
            ]);
        }
    }
}
