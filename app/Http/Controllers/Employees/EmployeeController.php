<?php

namespace App\Http\Controllers\Employees;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employees\Employee;

class EmployeeController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $destroyed = Employee::destroy($id);

        if($destroyed){
            return to_route('employee.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'Empleado eliminado correctamente.',
                    'severity' => 'success'
                ]
            ]);
        }
        else {
            return to_route('employee.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'No se pudo eliminar el empleado, intente nuevamente',
                    'severity' => 'error'
                ]
            ]);
        }
    }
}
