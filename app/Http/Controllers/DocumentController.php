<?php

namespace App\Http\Controllers;
use App\Models\Document;
use App\Models\DocumentResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;

class DocumentController extends Controller{

    private function createSerialNumber()
    {
        $currentYear = Carbon::now()->year;
        $higherValue = 0;
        $auxValue = 0;
        $serials = Document::select('serial_number')
        ->whereYear('created_at', $currentYear)
        ->get();

        foreach ($serials as $serial) {
            $auxValue = (int)explode('-', $serial)[1];
            if ($auxValue > $higherValue){
                $higherValue = $auxValue;
            }
        }
        $higherValue += 1;
        
        if ($higherValue < 10) {
            $newSerialNumber = 'DC-' . Str::padLeft($higherValue, 3, '0') . '-' . (string)$currentYear;
        }elseif ($higherValue < 100) {
            $newSerialNumber = 'DC-' . Str::padLeft($higherValue, 2, '0') . '-' . (string)$currentYear;
        }else {
            $newSerialNumber = 'DC-' . $higherValue . '-' . (string)$currentYear;
        }
        return $newSerialNumber;
    }


    public function index()
    {
        $documents = Document::with(['directed_to', 'applicant','response_id'])->get();
        $created_at_arr = [];
        foreach ($documents as $document) {
            $created_at_arr += [$document->id => $document->created_at->format('d-m-Y')];
        }

        return Inertia::render("Document/index",[
            'documents' => $documents,
            'created_at' => $created_at_arr,
        ]);
    }

    public function show(Document $document)
    {
        $document->load(['directed_to', 'applicant']);
        return Inertia::render("Document/show", [
            'document'=>$document,
            'created_at'=> $document->created_at->format('d-m-Y'),
        ]);
    }

    public function edit(Document $document)
    { 
        $document->load(['directed_to', 'applicant']);
        return Inertia::render("Document/edit", [
            'document'=>$document,
            'created_at'=> $document->created_at->format('d-m-Y'),
            'users' => User::select('id', 'name')->get(),
            'responses' => DocumentResponse::select('id','serial_number')->get()
        ]);
    }

    public function update(Request $request, Document $document)
    {
        $request->validate([
            "applicant"  => "required",
            "directed_to" => "required",
            "description" => "required"
        ]);

        $document->applicant = $request->applicant;
        $document->directed_to = $request->directed_to;
        $document->description = $request->description;
        $document->has_response = $request->has_response;
        $document->response_id = $request->response_id;

        $document->save();

        return to_route('document.show',$document)->with('flash',[
            'alert' => [
                'id' => $document->id,
                'message' => 'Oficio actualizado correctamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render("Document/create", [
            'users' => User::select('id', 'name')->get(),
            'responses' => DocumentResponse::select('id','serial_number')->get()

        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "applicant"  => "required",
            "directed_to" => "required",
            "description" => "required"
        ]);

        $newDocument = new Document();
        $newDocument->serial_number = $this->createSerialNumber();
        $newDocument->applicant = $request->applicant;
        $newDocument->directed_to = $request->directed_to;
        $newDocument->description = $request->description;
        $newDocument->has_response = $request->has_response;
        $newDocument->response_id = $request->response_id;

        $newDocument->save();

        return to_route('document.show',$newDocument)->with('flash',[
            'alert' => [
                'id' => $newDocument->id,
                'message' => 'Oficio creado correectamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    public function destroy(Document $document)
    {
        $id = $document->id;

        $document->delete();

        return to_route('document.index')->with('flash',[
            'alert' => [
                'id' => $id,
                'message' => 'Oficio eliminado correctamente!!!.',
                'severity' => 'error'
            ]
        ]);
    }

    public function changeStatus(Request $request, $id){

        $document = Document::findOrFail($id);
        $document->status = 'APROBADO';
        $document->save();

        return to_route('document.show', $document)->with('flash',[
            'alert' => [
                'id' => $document->id,
                'message' => 'Documento actualizado correctamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }
}