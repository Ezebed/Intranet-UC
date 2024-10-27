<?php

namespace App\Http\Controllers;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DocumentController extends Controller{

    public function index()
    {
        $documents = Document::with(['directed_to'])->get();
        $created_at_arr = [];

        foreach ($documents as $document) {
            $document->approved_at = Carbon::createFromTimestamp($document->approved_at)->format('d-m-Y');
            $document->sent_at = Carbon::createFromTimestamp($document->sent_at)->format('d-m-Y');
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
        $document->approved_at = Carbon::createFromTimestamp($document->approved_at)->format('d-m-Y');
        $document->sent_at = Carbon::createFromTimestamp($document->sent_at)->format('d-m-Y');
        return Inertia::render("Document/show", [
            'document'=>$document,
            'created_at'=> $document->created_at->format('d-m-Y')
        ]);
    }

    public function edit(Document $document)
    {
        $document->load(['directed_to', 'applicant']);
        $document->approved_at = Carbon::createFromTimestamp($document->approved_at)->format('d-m-Y');
        $document->sent_at = Carbon::createFromTimestamp($document->sent_at)->format('d-m-Y');
        return Inertia::render("Document/edit", [
            'document'=>$document,
            'created_at'=> $document->created_at->format('d-m-Y')
        ]);
    }
}