<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin Yohoho',
            'email' => 'admin@admin.com',
            'password' => bcrypt('Admin.123'),
            'remember_token' => Str::random(60),
        ]);

        $admin->assignRole('admin');
    }
}
