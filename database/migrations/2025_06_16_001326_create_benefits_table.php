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
        Schema::create('benefits', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable(false)->unique(true);
            $table->integer("time_between_use")->nullable(false)->default(1);
            
            $table->unsignedBigInteger("time_between_use_unit")->nullable(false);
            $table->foreign("time_between_use_unit")->references("id")->on("time_units")->onDelete("cascade");
            
            $table->unsignedBigInteger("staff")->nullable(false);
            $table->foreign("staff")->references("id")->on("staffs")->onDelete("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('benefits');
    }
};
