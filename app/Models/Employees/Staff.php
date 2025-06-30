<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Employees\StaffType;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Employees\Benefit;
use App\Models\Employees\TeachingLevel;

class Staff extends Model
{
    use HasFactory;

    protected $table = 'staffs';

    protected $fillable = [
        'name',
        'type',
        'places_number',
        'benefits',
        'teaching_levels'
    ];

    // Aplicamos una transformacion cada vez que obtenemos y establecemos el nombre
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),
            set: fn (string $value) => ucfirst($value),
        );
    }

    public function type(): BelongsTo
	{
        return $this->belongsTo(StaffType::class,'type');
    }

    public function benefits(): BelongsToMany
    {
        return $this->belongsToMany(Benefit::class,'staff_benefits');
    }

    public function teaching_levels(): BelongsToMany
    {
        return $this->belongsToMany(TeachingLevel::class,'staff_teaching_levels');
    }
}
