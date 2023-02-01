<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('schools')->insert([
            'school_name' => 'SMP Pesantren IMMIM',
            'address' => 'Tamalanrea'
        ]);

        DB::table('schools')->insert([
            'school_name' => 'SMA Pesantren IMMIM',
            'address' => 'Moncongloe'
        ]);

        DB::table('schools')->insert([
            'school_name' => 'MA Pesantren IMMIM',
            'address' => 'Moncongloe'
        ]);
    }
}
