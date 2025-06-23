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
        Schema::create('student_thesis_pivot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('thesis_student')->onDelete('cascade');
            $table->foreignId('thesis_id')->constrained('thesis')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_thesis_pivot');
    }

    
};
