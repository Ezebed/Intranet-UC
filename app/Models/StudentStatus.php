<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; // Importar HasMany

class StudentStatus extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Un estado puede estar asociado a muchos estudiantes de tesis.
     */
    // public function thesisStudents(): HasMany
    // {
    //     return $this->hasMany(ThesisStudent::class);
    // }
}