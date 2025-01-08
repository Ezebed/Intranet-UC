<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class DocumentResponse extends Model{

	use HasFactory;
	public function applicant(): BelongsTo
	{
        return $this->belongsTo(User::class, 'applicant');
    }

	public function directed_to(): BelongsTo
	{
        return $this->belongsTo(User::class, 'directed_to');       
    }


	public function response_id(): BelongsTo
	{
		return $this->belongsTo(DocumentResponse::class, 'response_id');
	}	

}
