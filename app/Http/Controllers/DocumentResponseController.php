<?php

namespace App\Http\Controllers;
use App\Models\DocumentResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;

class DocumentResponseController extends Controller{


    public function index()
    {
        $responses = DocumentResponse::with(['directed_to', 'applicant'])->get();
        $created_at_arr = [];
        foreach ($responses as $response) {
            $created_at_arr += [$response->id => $response->created_at->format('d-m-Y')];
        }

        return Inertia::render("DocumentResponse/index",[
            'responses' => $responses,
            'created_at' => $created_at_arr,
        ]);
    }

    public function show(DocumentResponse $response)
    {
        $response->load(['directed_to', 'applicant']);
        return Inertia::render("DocumentResponse/show", [
            'response'=>$response,
            'created_at'=> $response->created_at->format('d-m-Y'),
        ]);
    }

    public function edit(DocumentResponse $response)
    { 
        $response->load(['directed_to', 'applicant']);
        return Inertia::render("DocumentResponse/edit", [
            'response'=>$response,
            'created_at'=> $response->created_at->format('d-m-Y'),
            'users' => User::select('id', 'name')->get()
        ]);
    }

    public function update(Request $request, DocumentResponse $response)
    {
        $request->validate([
            "serial_number" => "required",
            "applicant"  => "required",
            "directed_to" => "required",
            "description" => "required"
        ]);

        $response->serial_number = $request->serial_number;
        $response->applicant = $request->applicant;
        $response->directed_to = $request->directed_to;
        $response->description = $request->description;

        $response->save();

        return to_route('response.show',$response)->with('flash',[
            'alert' => [
                'id' => $response->id,
                'message' => 'Oficio actualizado correctamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render("DocumentResponse/create", [
            'users' => User::select('id', 'name')->get(),

        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "serial_number" => "required",
            "applicant"  => "required",
            "directed_to" => "required",
            "description" => "required"
        ]);
        $newDocument = new DocumentResponse();
        $newDocument->serial_number = $request->serial_number;
        $newDocument->applicant = $request->applicant;
        $newDocument->directed_to = $request->directed_to;
        $newDocument->description = $request->description;

        $newDocument->save();

        return to_route('response.show',$newDocument)->with('flash',[
            'alert' => [
                'id' => $newDocument->id,
                'message' => 'Respuesta a Oficio creado correctamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    public function destroy(DocumentResponse $response)
    {
        $id = $response->id;

        $response->delete();

        return to_route('response.index')->with('flash',[
            'alert' => [
                'id' => $id,
                'message' => 'Oficio eliminado correctamente!!!.',
                'severity' => 'error'
            ]
        ]);
    }

}