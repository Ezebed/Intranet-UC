<?php

namespace App\Http\Controllers\Employees;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employees\Staff;

class StaffController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Employee/Staff/index',['staffs' => Staff::all()]);
    }
}
