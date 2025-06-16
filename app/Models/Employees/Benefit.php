<?php

namespace App\Models\Employees;

use App\Models\TimeUnit;
use App\Models\Employees\Staff;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Benefit extends Model
{
    use HasFactory;

    protected $table = "benefits";

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),
            set: fn (string $value) => ucfirst($value),
        );
    }

    protected function time_between_use():Attribute
    {
        return Attribute::make(
            get: fn (int $value) => abs($value),
            set: fn (int $value) => abs($value)
        );
    }

    public function time_between_use_unit():BelongsTo
    {
        return $this->belongsTo(TimeUnit::class,"time_between_use_unit");
    }

    public function staff():BelongsTo
    {
        return $this->belongsTo(Staff::class,"staff");
    }


}
