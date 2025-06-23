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
        Schema::create('thesis_student', function (Blueprint $table) {
            $table->id();
            $table->string('id_uc')->unique();
            $table->string('name');
            $table->string('ci')->unique();
            $table->string('email')->unique();
            $table->foreignId('status_id')->constrained('student_statuses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thesis_student');
    }

    public function theses()
    {
        return $this->belongsToMany(Thesis::class, 'student_thesis_pivot', 'student_id', 'thesis_id');
    }

};
