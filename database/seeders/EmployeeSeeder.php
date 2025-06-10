<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employees\StaffType;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tipo de personal
        $administrative = StaffType::create([
            'name' => 'Administrativo'
        ]);

        $laborer = StaffType::create([
            'name' => 'Obrero'
        ]);

        $professor = StaffType::create([
            'name' => 'Docente'
        ]);


        // 

    }
}
