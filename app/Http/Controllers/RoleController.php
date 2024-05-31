<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Role/index', ['roles' => $roles]);
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

        $newRole = Role::create($request->all());

        $newRole->permissions()->sync($request->permissions);

        $roles = Role::all();

        return Inertia::render('Admin/Role/index',[
            'roles' => $roles,
            'alert' => [
                'message' => 'Rol creado exitosamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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

        $roles = Role::all();

        return Inertia::render('Admin/Role/index',[
            'roles' => $roles,
            'alert' => [
                'message' => 'El rol se actualizó de manera exitosa!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        dd($role);
    }
}
