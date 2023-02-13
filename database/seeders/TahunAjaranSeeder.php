<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class TahunAjaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tahun_ajaran')->insert([
            'nama_tahun_ajaran' => '2020/2021',
            'kode' => '2021',
            'is_active' => false
        ]);

        DB::table('tahun_ajaran')->insert([
            'nama_tahun_ajaran' => '2021/2022',
            'kode' => '2122',
            'is_active' => false
        ]);

        DB::table('tahun_ajaran')->insert([
            'nama_tahun_ajaran' => '2022/2023',
            'kode' => '2223',
            'is_active' => true
        ]);
    }
}
