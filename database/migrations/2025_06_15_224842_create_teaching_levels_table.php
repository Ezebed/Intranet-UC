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
        Schema::create('teaching_levels', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(true)->nullable(false);
            $table->integer('time')->default(1)->nullable(false);
            $table->unsignedBigInteger('time_unit')->nullable(false);
            $table->foreign('time_unit')->references('id')->on('time_units')->onDelete('cascade');
            $table->unsignedBigInteger('staff')->nullable(false);
            $table->foreign('staff')->references('id')->on('staffs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teaching_levels');
    }
};
