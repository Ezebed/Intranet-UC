<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Employees\Employee;
use App\Models\Employees\Benefit;

class EmployeeBenefitHistory extends Model
{
    use HasFactory;

    protected $table = "employee_benefit_histories";

    public function employee():BelongsTo
    {
        return $this->belongsTo(Employee::class,'employee');
    }

    public function benefit():BelongsTo
    {
        return $this->belongsTo(Benefit::class,'benefit');
    }
}
