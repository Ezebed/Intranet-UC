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
        Schema::create('staff_benefits', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('benefit_id')->nullable(false);
            $table->foreign('benefit_id')->references('id')->on('benefits')->onDelete('cascade');

            $table->unsignedBigInteger('staff_id')->nullable(false);
            $table->foreign('staff_id')->references('id')->on('staffs')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_benefits');
    }
};
