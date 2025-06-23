<?php

namespace App\Http\Controllers\Thesis;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\ThesisStudent;
use App\Models\StudentStatus;
use App\Models\Thesis;

use Spatie\Permission\Models\Role;

use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class ThesisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Thesis/ThesisProjects/index",[
            'thesis' => Thesis::with('students')->get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Thesis/ThesisProjects/create",[
                'students' => ThesisStudent::all(), 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "title"     => "required",
            "date"      => "required|date",
            "student_ids" => "required|array|min:1|max:2",
            "student_ids.*" => "exists:thesis_student,id",
        ]);

        // Crear el proyecto de tesis
        $newThesis = Thesis::create([
            'title'     => $request->title,
            'date'      => $request->date,
        ]);

        // Asociar los estudiantes seleccionados
        $newThesis->students()->sync($request->student_ids);

        return to_route('Thesis.index')->with('flash',[
            'alert' => [
                'id' => $newThesis->id,
                'message' => 'Proyecto de tesis creado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    public function edit(Thesis $thesis)
    {
        return Inertia::render('Thesis/ThesisProjects/edit', [
            'thesis' => $thesis->load('students'),
            'students' => ThesisStudent::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Thesis $thesis)
    {
        $request->validate([
            "title" => "required",
            "date"  => "required|date",
            "student_ids" => "required|array|min:1|max:2",
            "student_ids.*" => "exists:thesis_student,id",
        ]);

        $thesis->title = $request->title;
        $thesis->date = $request->date;
        $thesis->save();

        // Actualizar los estudiantes asociados
        $thesis->students()->sync($request->student_ids);

        return to_route('Thesis.index')->with('flash', [
            'alert' => [
                'id' => $thesis->id,
                'message' => 'Proyecto de tesis actualizado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thesis $thesis)
    {
        $id = $thesis->id;

        $thesis->delete();

        return to_route('Thesis.index')->with('flash',[
            'alert' => [
                'id' => $id,
                'message' => 'Proyecto de tesis eliminado correctamente.',
                'severity' => 'error'
            ]
        ]);
    }
}
