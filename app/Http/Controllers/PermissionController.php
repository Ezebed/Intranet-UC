<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Permission/index',[
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Permission/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:64|unique:permissions,name',
            'description' => 'required'
        ]);

        $id = DB::table('permissions')->insertGetId([
            'name' => $request->name,
            'description' => $request->description,
            'guard_name' => 'web',
            'created_at' => date("Y-m-d H:i:s")
        ]);

        return to_route('admin.permission.index')->with('flash', [
            'alert' => [
                'id' => $id,
                'message' => 'Permiso creado correctamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        return Inertia::render('Admin/Permission/edit',[
            'permission' => $permission
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        $request->validate([
            'name' => 'required|max:64',
            'description' => 'required'
        ]);

        $permission->name = $request->name;
        $permission->description = $request->description; 
        $permission->save();

        return to_route('admin.permission.index')->with('flash',[
            'alert' => [
                'id' => $permission->id,
                'message' => 'Permiso actualizado correctamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        $id = $permission->id;

        $permission->delete();

        return to_route('admin.permission.index')->with('flash', [
            'alert' => [
                'id' => $id,
                'message' => 'Permiso eliminado correctamente!!!.',
                'severity' => 'error'
            ]
        ]);
    }
}
