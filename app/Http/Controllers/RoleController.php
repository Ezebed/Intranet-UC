<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Role/index', ['roles' => Role::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all();

        return Inertia::render('Admin/Role/create',[ 'permissions' => $permissions ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        // $newRole = Role::create($request->all());

        $roleId = DB::table('roles')->insertGetId([
            'name' => $request->name,
            'guard_name' => 'web',
            'created_at' => date("Y-m-d H:i:s")
        ]);

        $newRole = Role::where('id',$roleId)->get();

        // dd($newRole);

        $newRole[0]->permissions()->sync($request->permissions);

        return to_route('admin.role.index')->with('flash',[
            'alert' => [
                'id' => $newRole[0]->id,
                'message' => 'Rol creado correctamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $permissions = Permission::all();

        $rolePermissions = $role->permissions;

        return Inertia::render('Admin/Role/edit',[
            'role' => $role, 
            'rolePermissions' => $rolePermissions, 
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $role->name = $request->name;
        $role->save();

        $role->permissions()->sync($request->permissions);

        return to_route('admin.role.index')->with('flash', [
            'alert' => [
                'id' => $role->id,
                'message' => 'Rol actualizado correctamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $id = $role->id;
        $role->delete();

        return to_route('admin.role.index')->with('flash', [
            'alert' => [
                'id' => $id,
                'message' => 'Rol eliminado correctamente!!!.',
                'severity' => 'error'
            ]
        ]);
    }
}
