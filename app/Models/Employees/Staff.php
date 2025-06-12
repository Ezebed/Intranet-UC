<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Employees\StaffType;

class Staff extends Model
{
    use HasFactory;

    protected $table = 'staffs';

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
}
