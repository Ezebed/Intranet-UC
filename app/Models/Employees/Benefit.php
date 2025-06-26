<?php

namespace App\Models\Employees;

use App\Models\TimeUnit;
use App\Models\Employees\Staff;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Benefit extends Model
{
    use HasFactory;

    protected $table = "benefits";

    protected $fillable = [
        'name',
        'time_between_use',
        'time_between_use_unit',
        'time_lapse',
        'time_lapse_unit'
    ];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),
            set: fn (string $value) => ucfirst($value),
        );
    }

    protected function timeBetweenUse():Attribute
    {
        return Attribute::make(
            get: fn (int $value) => abs($value),
            set: fn (int $value) => abs($value)
        );
    }

    protected function timeLapse():Attribute
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

    public function time_lapse_unit():BelongsTo
    {
        return $this->belongsTo(TimeUnit::class,"time_lapse_unit");
    }

    public function staffs():BelongsToMany
    {
        return $this->belongsToMany(Staff::class);
    }


}
