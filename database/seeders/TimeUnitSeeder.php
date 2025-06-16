<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TimeUnit;

class TimeUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Unidades de tiempo
        TimeUnit::create([
            "name" => "Día(s)"
        ]);

        TimeUnit::create([
            "name" => "Mes(es)"
        ]);

        TimeUnit::create([
            "name" => "año(s)"
        ]);

        TimeUnit::create([
            "name" => "Semana(s)"
        ]);

        TimeUnit::create([
            "name" => "Hora(s)"
        ]);
    }
}
