<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;

use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Admin/User/index",[
            'users' => User::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/User/create",[
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
            "email" => "required",
            "password" => "required"
        ]);

        $newUser = User::create($request->all());
        
        $newUser->assignRole($request->roles);

        return to_route('admin.user.index')->with('flash',[
            'alert' => [
                'id' => $newUser->id,
                'message' => 'usuario creado correectamente!!!.',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/User/edit',[
            'user' => $user,
            'userRoles' => $user->getRoleNames(),
            'roles' => Role::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
