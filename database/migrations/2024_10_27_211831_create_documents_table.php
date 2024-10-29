<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('serial_number');

            $table->unsignedBigInteger('applicant'); //Clave foranea con la tabla de usuarios.
            $table->foreign('applicant')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('directed_to'); //Dirigido a debe ser many2one
            $table->foreign('directed_to')->references('id')->on('users')->onDelete('cascade');
            
            $table->string('title');
            $table->text('description');
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
