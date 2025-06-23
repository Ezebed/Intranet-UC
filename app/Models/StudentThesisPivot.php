<?php
namespace App\Models;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_thesis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('thesis_student')->onDelete('cascade');
            $table->foreignId('thesis_id')->constrained('thesis')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_thesis');
    }
};