<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Section extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('section')->insert([
            'instructor_ID' => 1,
            'courseName' => 'Parts of the Computer',
            'courseDescription' => 'By the end of this lesson, students will be able to identify the basic parts of a computer, understand their functions, and differentiate between hardware and software.',
            'activityName' => 'Practice',
            'sectionName' => 'IT3-1',
            'sectionCode' => 'sample',
            'actDueDate' => Carbon::create(2024, 12, 23, 22, 30, 0)->toDateTimeString(),
        ]);
    }
}
