<?php

namespace App\Models\Employees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Employees\Staff;
use App\Models\Employees\Employee;
use App\Models\Employees\TeachingLevel;

class TeachingStaffHistory extends Model
{
    use HasFactory;

    protected $table = "teaching_staff_histories";

    public function staff():BelongsTo
    {
        return $this->belongsTo(Staff::class,"staff");
    }

    public function employee():BelongsTo
    {
        return $this->belongsTo(Employee::class,"employee");
    }

    public function teaching_level():BelongsTo
    {
        return $this->belongsTo(TeachingLevel::class,"teaching_level");
    }

}
