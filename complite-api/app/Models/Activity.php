<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $table = 'activity';
    protected $primaryKey = 'activityID';
    
    protected $casts = [
        'activityChoices' => 'array',
    ];

    // Optional: define fillable fields
    protected $fillable = [
        'activityQuestions', 
        'activityChoices', 
        'activityKey', 
        'activityPicture'
    ];
}