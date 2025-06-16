<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\TimeUnit;

class TeachingLevel extends Model
{
    use HasFactory;

    protected $table = "teaching_levels";

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),
            set: fn (string $value) => ucfirst($value),
        );
    }

    public function time_unit():BelongsTo
    {
        return $this->belongsTo(TimeUnit::class,"time_unit");
    }

    protected function time():Attribute
    {
        return Attribute::make(
            get: fn (int $value) => abs($value),
            set: fn (int $value) => abs($value)
        );
    }

    
}
