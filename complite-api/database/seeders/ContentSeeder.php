<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $contentId = [
            [
                'section_ID' => 1,
                'lesson_ID' => 1,
                'activity_ID' => 1,
            ],
        ];

        DB::table('content')->insert($contentId);
    }
}
