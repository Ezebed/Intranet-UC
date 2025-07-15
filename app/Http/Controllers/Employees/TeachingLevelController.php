<?php

namespace App\Http\Controllers\Employees;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employees\TeachingLevel;
use Inertia\Inertia;
use App\Models\TimeUnit;
use Illuminate\Support\Facades\DB;

class TeachingLevelController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Employee/TeachingLevel/index',[
            'levels' => TeachingLevel::with(['time_unit','previous_level'])->get(),
            'model' => 'employee.teaching.level'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/TeachingLevel/create',[
            'time_units' => TimeUnit::all(),
            'levels' => TeachingLevel::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:128|unique:teaching_levels,name',
            'time' => 'required',
            'time_unit' => 'required',
        ]);

        $level = TeachingLevel::create([
            'name' => $request->input('name'),
            'time' => $request->input('time'),
            'time_unit' => $request->input('time_unit'),
            'previous_level' => $request->input('previous_level') != 0 ? $request->input('previous_level') : null
        ]);

        $time_unit = TimeUnit::find($request->input('time_unit'));
        $level->time_unit()->associate($time_unit);

        if($request->input('previous_level') != 0){
            $previous_level = TeachingLevel::find($request->input('previous_level'));
            $level->previous_level()->associate($previous_level);
        }

        $level->save();

        return to_route('employee.teaching.level.index')->with('flash',[
            'alert' => [
                'id' => $level->id,
                'message' => 'Nivel de docencia creado correctamente.',
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
        return Inertia::render('Employee/TeachingLevel/edit',[
            'level' => TeachingLevel::with(['time_unit','previous_level'])->find($id),
            'time_units' => TimeUnit::all(),
            'levels' => DB::table('teaching_levels')->where('id','<>',$id)->get(['id','name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            "name"  => "required",
            "time" => "required",
            "time_unit" => "required",
        ]);

        $level = TeachingLevel::find($id);
        $time_unit = TimeUnit::find($request->time_unit);

        $level->name = $request->name;
        $level->time = $request->time;
        $level->time_unit = $time_unit->id;
        $level->time_unit()->associate($time_unit);

        if($request->previous_level != 0){
            $previous_level = TeachingLevel::find($request->previous_level);
            $level->previous_level = $previous_level->id;
            $level->previous_level()->associate($previous_level);
        }

        $level->save();

        return to_route('employee.teaching.level.index')->with('flash',[
            'alert' => [
                'id' => $level->id,
                'message' => 'Nivel de docencia actualizado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $destroyed = TeachingLevel::destroy($id);

        if($destroyed){
            return to_route('employee.teaching.level.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'Nivel de docencia eliminado correctamente.',
                    'severity' => 'success'
                ]
            ]);
        }
        else {
            return to_route('employee.teaching.level.index')->with('flash',[
                'alert' => [
                    'id' => $id,
                    'message' => 'No se pudo eliminar el nivel de docencia, intente nuevamente',
                    'severity' => 'error'
                ]
            ]);
        }
    }
}
