<?php

namespace App\Http\Controllers\Thesis;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\ThesisStudent;
use App\Models\StudentStatus;

use Spatie\Permission\Models\Role;

use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class ThesisStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Thesis/ThesisStudent/index",[
            'thesisStudent' => ThesisStudent::with(['status', 'theses'])->get(),
            'studentStatuses' => StudentStatus::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Thesis/ThesisStudent/create",[
            'roles' => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "id_uc"     => "required|unique:thesis_student,id_uc",
            "name"      => "required",
            "email"     => "required|email|unique:thesis_student,email",
            "ci"        => "required|unique:thesis_student,ci",
        ]);

         // Buscar el status por nombre
        $defaultStatus = StudentStatus::where('name', 'inscrito')->first();

        // Crear el tesista con el status por defecto
        $newThesisStudent = ThesisStudent::create([
            'id_uc'     => $request->id_uc,
            'name'      => $request->name,
            'email'     => $request->email,
            'ci'        => $request->ci,
            'internal_position' => $request->internal_position,
            'status_id' => $defaultStatus?->id, // Asigna el status por defecto
        ]);


        return to_route('thesisStudent.index')->with('flash',[
            'alert' => [
                'id' => $newThesisStudent->id,
                'message' => 'Tesista creado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    public function importExcel(Request $request)
{
    $request->validate([
        'excel_file' => 'required|file|mimes:xlsx,xls,csv',
    ]);

    $defaultStatus = StudentStatus::where('name', 'inscrito')->first();

    // Lee el archivo Excel como un array
    $rows = Excel::toArray([], $request->file('excel_file'))[0];

    // salta el encabezado
    $header = array_map('strtolower', $rows[0]);
    unset($rows[0]);

    foreach ($rows as $row) {
        // Salta filas vacías
        if (empty($row[0]) || empty($row[1]) || empty($row[2]) || empty($row[3])) {
            continue;
        }

        // Verifica si ya existe por id_uc, email o ci
        $exists = ThesisStudent::where('id_uc', (string)$row[0])
            ->orWhere('email', $row[2])
            ->orWhere('ci', (string)$row[3])
            ->exists();

        if ($exists) {
            continue; // Si existe, salta a la siguiente fila
        }

        ThesisStudent::create([
            'id_uc'     => (string) $row[0],
            'name'      => $row[1],
            'email'     => $row[2],
            'ci'        => (string) $row[3],
            'status_id' => $defaultStatus?->id,
        ]);
    }

    return back()->with('flash', [
        'alert' => [
            'message' => 'Estudiantes importados correctamente.',
            'severity' => 'success'
        ]
    ]);
}
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ThesisStudent $thesisStudent)
    {
        return Inertia::render('Thesis/ThesisStudent/edit', [
            'thesisStudent' => $thesisStudent
        ]);
    }

       
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ThesisStudent $thesisStudent)
    {
        $request->validate([
            "name"  => "required",
            "email" => "required|email"
        ]);

        $thesisStudent->name = $request->name;
        $thesisStudent->email = $request->email;

        // comprueba si elpassword a cambiado
        if( $request->password != '' ){
            $thesisStudent->password = $request->password;
        }

        $thesisStudent->save();

        // actualizando los roles del ususario
        $thesisStudent->assignRole($request->roles);

        return to_route('thesisStudent.index')->with('flash',[
            'alert' => [
                'id' => $thesisStudent->id,
                'message' => 'Tesista actualizado correctamente.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ThesisStudent $thesisStudent)
    {
        $id = $thesisStudent->id;

        $thesisStudent->delete();

        return to_route('thesisStudent.index')->with('flash',[
            'alert' => [
                'id' => $id,
                'message' => 'Tesista eliminado correctamente.',
                'severity' => 'error'
            ]
        ]);
    }
}
