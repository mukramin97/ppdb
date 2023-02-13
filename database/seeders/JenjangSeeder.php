<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class JenjangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('jenjang')->insert([
            'nama_jenjang' => 'SMP Pesantren IMMIM',
            'kode' => 'SMP'
        ]);

        DB::table('jenjang')->insert([
            'nama_jenjang' => 'SMA Pesantren IMMIM',
            'kode' => 'SMA'
        ]);

        DB::table('jenjang')->insert([
            'nama_jenjang' => 'MA Pesantren IMMIM',
            'kode' => 'MAS'
        ]);
    }
}
