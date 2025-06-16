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
        Schema::create('teaching_staff_histories', function (Blueprint $table) {
            $table->id();
            $table->date('start_date')->nullable(false);
            $table->date('end_date')->nullable(false);
            
            $table->unsignedBigInteger("staff")->nullable(false);
            $table->foreign("staff")->references("id")->on("staffs")->onDelete("cascade");

            $table->unsignedBigInteger("teaching_level")->nullable(false);
            $table->foreign("teaching_level")->references("id")->on("teaching_levels")->onDelete("cascade");

            $table->unsignedBigInteger("employee")->nullable(false);
            $table->foreign("employee")->references("id")->on("employees")->onDelete("cascade");



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teaching_staff_histories');
    }
};
