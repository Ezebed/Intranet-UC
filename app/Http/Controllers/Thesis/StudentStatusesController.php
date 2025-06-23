<?php

namespace App\Http\Controllers\Thesis;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\StudentStatus;
use Spatie\Permission\Models\Role;

use Inertia\Inertia;

class StudentStatusesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Thesis/StudentStatuses/index",[
            'studentStatuses' => StudentStatus::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Thesis/StudentStatuses/create",[
            'roles' => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name"  => "required",
            "description" => "nullable|string",
        ]);

        $newStatus = StudentStatus::create($request->only('name', 'description'));

        return to_route('studentStatuses.index')->with('flash',[
            'alert' => [
                'id' => $newStatus->id,
                'message' => 'Estatus creado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentStatus $studentStatus)
    {

        return Inertia::render('Thesis/StudentStatuses/edit',[
            'studentStatus' => $studentStatus
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentStatus $studentStatus)
    {
        $request->validate([
            "name"  => "required",
            "description" => "nullable|string",
        ]);

        $studentStatus->name = $request->name;
        $studentStatus->description = $request->description;

        $studentStatus->save();

        return to_route('studentStatuses.index')->with('flash',[
            'alert' => [
                'id' => $studentStatus->id,
                'message' => 'Estatus actualizado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentStatus $studentStatus)
    {
        $id = $studentStatus->id;

        $studentStatus->delete();

        return to_route('studentStatuses.index')->with('flash',[
            'alert' => [
                'id' => $id,
                'message' => 'Estatus eliminado correctamente!!!.',
                'severity' => 'error'
            ]
        ]);
    }
}
