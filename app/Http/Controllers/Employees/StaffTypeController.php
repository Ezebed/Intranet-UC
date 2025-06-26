<?php

namespace App\Http\Controllers\Employees;

use App\Http\Controllers\Controller;
use App\Models\Employees\StaffType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Employee/StaffType/index',[
            'types' => StaffType::all()
        ]);
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
        $newType = StaffType::create([
            "name" => $request->input('name')
        ]);

        return response('Registro creado exitosamente',200);
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
        return Inertia::render('Employee/StaffType/edit',[
            'type' => StaffType::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            "name"  => "required",
        ]);

        $type = StaffType::find($id);

        $type->name = $request->name;
        $type->save();

        return to_route('employee.staff.type.index')->with('flash',[
            'alert' => [
                'id' => $type->id,
                'message' => 'Tipo de cargo actualizado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $destroyed = StaffType::destroy($id);

        if($destroyed){
            return to_route('employee.staff.type.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'Tipo de cargo eliminado correctamente.',
                    'severity' => 'success'
                ]
            ]);
        }
        else {
            return to_route('employee.staff.type.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'No se pudo eliminar el tipo de cargo, intente nuevamente',
                    'severity' => 'error'
                ]
            ]);
        }
    }
}
