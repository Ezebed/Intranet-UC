<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Permissions and Roles
        // Administrator, Director, Teacher and Administrative
        
        // Roles
        $admin          = Role::create(['name' => 'admin']);
        $director       = Role::create(['name' => 'director']);
        $teacher        = Role::create(['name' => 'teacher']);
        $administrative = Role::create(['name' => 'administrative']);

        // Permissions
    }
}
