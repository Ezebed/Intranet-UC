<?php

namespace App\Http\Controllers\Employees;

use App\Http\Controllers\Controller;
use App\Models\Employees\Benefit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employees\Staff;
use App\Models\Employees\StaffType;
use App\Models\Employees\TeachingLevel;

class StaffController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Employee/Staff/index',[
            'staffs' => Staff::with('type')->get(),
            'model' => 'employee.staff'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/Staff/create',[
            'types' => StaffType::all(),
            'benefits' => Benefit::all(),
            'teaching_levels' => TeachingLevel::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:64|unique:staffs,name',
            'type' => 'required',
            'places_number' => 'required',
        ]);

        $staff = Staff::create([
            'name' => $request->input('name'),
            'type' => $request->input('type'),
            'places_number' => $request->input('places_number')
        ]);

        $type = StaffType::find($request->input('type'));
        $staff->type()->associate($type);
        $staff->teaching_levels()->sync($request->input('teaching_levels'));
        $staff->benefits()->sync($request->input('benefits'));
        $staff->save();

        return to_route('employee.staff.index')->with('flash',[
            'alert' => [
                'id' => $staff->id,
                'message' => 'Cargo creado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        return Inertia::render('Employee/Staff/edit',[
            'staff' => Staff::with(['type','benefits','teaching_levels'])->find($id),
            'types' => StaffType::all(),
            'teaching_levels' => TeachingLevel::all(),
            'benefits' => Benefit::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,int $id)
    {
        $request->validate([
            "name"  => "required",
            "places_number" => "required",
            "type" => "required"
        ]);

        $staff = Staff::find($id);
        $type = StaffType::find($request->type);

        $staff->name = $request->name;
        $staff->places_number = $request->places_number;
        $staff->type = $type->id;
        
        $staff->type()->associate($type);
        $staff->teaching_levels()->sync($request->input('teaching_levels'));
        $staff->benefits()->sync($request->input('benefits'));
        $staff->save();

        return to_route('employee.staff.index')->with('flash',[
            'alert' => [
                'id' => $staff->id,
                'message' => 'Cargo actualizado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $destroyed = Staff::destroy($id);

        if($destroyed){
            return to_route('employee.staff.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'Cargo eliminado correctamente.',
                    'severity' => 'success'
                ]
            ]);
        }
        else {
            return to_route('employee.staff.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'No se pudo eliminar el cargo, intente nuevamente',
                    'severity' => 'error'
                ]
            ]);
        }
    }
}
