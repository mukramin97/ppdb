<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profil', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sekolah');
            $table->string('NPSN');
            $table->string('status');
            $table->string('kepala_sekolah');
            $table->string('nama_narahubung_1')->nullable();
            $table->string('hp_narahubung_1')->nullable();
            $table->string('nama_narahubung_2')->nullable();
            $table->string('hp_narahubung_2')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profil');
    }
};
