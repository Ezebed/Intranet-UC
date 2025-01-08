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
        Schema::create('document_responses', function (Blueprint $table) {
            $table->id();
            $table->string('serial_number');

            $table->unsignedBigInteger('applicant'); //Clave foranea con la tabla de usuarios.
            $table->foreign('applicant')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('directed_to'); //Dirigido a debe ser many2one
            $table->foreign('directed_to')->references('id')->on('users')->onDelete('cascade');
            
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_responses');
    }
};
