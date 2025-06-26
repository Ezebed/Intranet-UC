<?php

namespace App\Http\Controllers\Employees;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employees\Benefit;
use App\Models\TimeUnit;
use Inertia\Inertia;

class BenefitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Employee/Benefit/index',[
            'benefits' => Benefit::with(['time_between_use_unit','time_lapse_unit'])->get(),
            'model' => 'employee.benefit'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/Benefit/create',[
            'time_units' => TimeUnit::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:128|unique:benefits,name',
            'time_between_use' => 'required',
            'time_between_use_unit' => 'required',
            'time_lapse_unit' => 'required',
            'time_lapse' => 'required',
        ]);

        $benefit = Benefit::create([
            'name' => $request->input('name'),
            'time_between_use' => $request->input('time_between_use'),
            'time_between_use_unit' => $request->input('time_between_use_unit'),
            'time_lapse' => $request->input('time_lapse'),
            'time_lapse_unit' => $request->input('time_lapse_unit')
        ]);

        $time_between_use_unit = TimeUnit::find($request->input('time_between_use_unit'));
        $time_lapse_unit = TimeUnit::find($request->input('time_lapse_unit'));
        $benefit->time_between_use_unit()->associate($time_between_use_unit);
        $benefit->time_lapse_unit()->associate($time_lapse_unit);
        $benefit->save();

        return to_route('employee.benefit.index')->with('flash',[
            'alert' => [
                'id' => $benefit->id,
                'message' => 'Beneficio creado correctamente.',
                'severity' => 'success'
            ]
        ]);
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
        return Inertia::render('Employee/Benefit/edit',[
            'benefit' => Benefit::with(['time_between_use_unit','time_lapse_unit'])->find($id),
            'time_units' => TimeUnit::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            "name"  => "required",
            "time_between_use" => "required",
            "time_between_use_unit" => "required",
            "time_lapse_unit" => "required",
            "time_lapse" => "required"
        ]);

        $benefit = Benefit::find($id);
        $time_unit = TimeUnit::find($request->time_between_use_unit);
        $time_lapse_unit = TimeUnit::find($request->time_lapse_unit);


        $benefit->name = $request->name;
        $benefit->time_between_use = $request->time_between_use;
        $benefit->time_lapse = $request->time_lapse;
        $benefit->time_between_use_unit = $time_unit->id;
        $benefit->time_lapse_unit = $time_lapse_unit->id;
        
        $benefit->time_between_use_unit()->associate($time_unit);
        $benefit->time_lapse_unit()->associate($time_lapse_unit);
        $benefit->save();

        return to_route('employee.benefit.index')->with('flash',[
            'alert' => [
                'id' => $benefit->id,
                'message' => 'Beneficio actualizado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $destroyed = Benefit::destroy($id);

        if($destroyed){
            return to_route('employee.benefit.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'Beneficio eliminado correctamente.',
                    'severity' => 'success'
                ]
            ]);
        }
        else {
            return to_route('employee.benefit.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'No se pudo eliminar el beneficio, intente nuevamente',
                    'severity' => 'error'
                ]
            ]);
        }
    }
}
