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
        Schema::create('thesis', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->boolean('is_active')->default(true); // Indica si la tesis está activa o no
            $table->string('title')->unique(); // Título de la tesis
            $table->date('date')->nullable(); // Fecha de la tesis
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thesis');
    }

    
    public function students()
    {
        return $this->belongsToMany(ThesisStudent::class, 'student_thesis_pivot', 'thesis_id', 'student_id');
    }
};
