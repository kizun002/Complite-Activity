<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lessonContents = [
            [
                'lessonPicture' => json_encode(['InputDevices.png']),
                'lessonContent' => json_encode(['What Makes Up a Computer?', 'A computer consists of two main components: hardware and software. Hardware refers to the physical parts of a computer that you can see and touch, while software includes the programs and applications that make the hardware useful. In this lesson, we will focus on the hardware components of a computer.', 'Key Hardware Components and Their Functions', 
                    'Input Devices:','Input devices enable you to interact with the computer by sending information or commands to it. These devices allow you to provide instructions, type data, or make selections, helping the computer understand what you want it to do.', 
                    'Keyboard: Used to type letters, numbers, and commands.',  'Mouse: Used to move the cursor and click on items on the screen.', 'Touchpad (on laptops): A flat surface that acts as a mouse replacement.', ]),
            ],
        ];

        DB::table('lesson')->insert($lessonContents);
    }
}
