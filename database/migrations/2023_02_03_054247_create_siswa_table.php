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
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->string('nama_siswa');
            $table->string('nomor_formulir');
            $table->string('jenis_tes');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('jenis_kelamin');
            $table->string('status_keluarga')->nullable();
            $table->string('agama')->nullable();
            $table->string('nisn')->nullable();
            $table->string('nik')->nullable();
            $table->string('alamat')->nullable();
            $table->string('propinsi')->nullable();
            $table->string('kota')->nullable();
            $table->string('kode_pos')->nullable();
            $table->string('no_hp')->nullable();
            $table->string('nama_sekolah_asal')->nullable();
            $table->string('alamat_sekolah_asal')->nullable();
            $table->string('no_ijazah')->nullable();
            $table->string('no_skhun')->nullable();
            $table->binary('pasfoto')->nullable();
            $table->binary('dokumen_kk')->nullable();
            $table->binary('dokumen_akta')->nullable();
            $table->binary('dokumen_ijazah')->nullable();
            $table->binary('dokumen_sertifikat')->nullable();
            $table->string('status_pendaftaran')->nullable();
            $table->string('status_seleksi')->nullable();
            $table->string('nilai_ujian')->nullable();
            $table->string('nilai_interview')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('jenjang_id');
            $table->foreign('jenjang_id')->references('id')->on('jenjang')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('tahun_ajaran_id');
            $table->foreign('tahun_ajaran_id')->references('id')->on('tahun_ajaran')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('siswa');
    }
};
