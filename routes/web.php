<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DocumentResponseController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth','verified'])->group(function(){
    Route::get('/hola',function(){ return Inertia::render('holaMundo'); })->name('hola');
    
    Route::patch('/document/{id}/change-status', [DocumentController::class, 'changeStatus'])->name('document.changeStatus');

    Route::resource('/admin/role', RoleController::class )
            ->only(['index','create','store','edit','update','destroy'])
            ->names('admin.role');

    Route::resource('/admin/permission', PermissionController::class )
            ->only(['index','create','store','edit','update','destroy'])
            ->names('admin.permission');

    Route::resource('/admin/user', UserController::class )
            ->only(['index','create','store','edit','update','destroy'])
            ->names('admin.user');

    Route::resource('/document', DocumentController::class )
        ->only(['index','create','show','store','edit','update','destroy'])
        ->names('document');

    Route::resource('/response', DocumentResponseController::class )
        ->only(['index','create','show','store','edit','update','destroy'])
        ->names('response');

});

require __DIR__.'/auth.php';
