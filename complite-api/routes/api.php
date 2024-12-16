<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StudentActivityController;

Route::post('/login', [AccountController::class, 'loginUser']);

Route::post('/profile', [AccountController::class,'getProfile']);

Route::post('/updatestudent', [AccountController::class,'updateStudentAccount']);

Route::post('/updateinstructor', [AccountController::class,'updateInstructorAccount']);

Route::post('/instructorprofile', [AccountController::class,'instructorProfile']);

Route::post('/sendreport', [ReportController::class, 'sendReport']);

Route::post('/sectionlist', [SectionController::class, 'getSectionList']);

Route::post('/addsection', [SectionController::class, 'addSection']);

Route::post('/enrolledsection', [SectionController::class, 'getEnrolledSection']);

Route::post('/enroll', [SectionController::class, 'enrollSection']);

Route::post('/unenroll', [SectionController::class, 'unEnroll']);

Route::post('/remove', [SectionController::class, 'removeSection']);

Route::post('/record', [AccountController::class, 'putPoints']);

Route::get('/activity', [StudentActivityController::class, 'getActivities']);