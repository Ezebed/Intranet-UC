<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('staffs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(true); // Nombre del cargo
            $table->integer('places_number')->default(1)->nullable(false); // Nro de vacantes totales
            $table->unsignedBigInteger('type'); // Tipo de cargo
            $table->foreign('type')->references('id')->on('staff_types')->onDelete('cascade'); // Relacion muchos a uno
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staffs');
    }
};
