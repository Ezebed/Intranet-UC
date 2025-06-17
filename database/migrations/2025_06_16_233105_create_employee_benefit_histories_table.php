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
        Schema::create('employee_benefit_histories', function (Blueprint $table) {
            $table->id();
            $table->date('request_date')->nullable(false);
            $table->date('approvement_date')->nullable(false);
            $table->date('start_date')->nullable(false);
            $table->date('end_date')->nullable(false);
            
            $table->unsignedBigInteger('benefit')->nullable(false);
            $table->foreign('benefit')->references('id')->on('benefits')->onDelete('cascade');

            $table->unsignedBigInteger('employee')->nullable(false);
            $table->foreign('employee')->references('id')->on('employees')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_benefit_histories');
    }
};
