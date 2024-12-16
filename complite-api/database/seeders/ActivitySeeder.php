<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('activity')->insert([
            [
                'activityQuestions' => 'What does HTML stand for?',
                'activityChoices' => json_encode(['HyperText Markup Language', 'HyperTransfer Main Link', 'HyperText Main Language']),
                'activityKey' => 'HyperText Markup Language',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'Which tag is used for images in HTML?',
                'activityChoices' => json_encode(['<img>', '<picture>', '<image>']),
                'activityKey' => '<img>',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'Which tag is used for creating links in HTML?',
                'activityChoices' => json_encode(['<link>', '<a>', '<href>']),
                'activityKey' => '<a>',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'Which attribute is used to provide alternative text for images in HTML?',
                'activityChoices' => json_encode(['alt', 'text', 'title']),
                'activityKey' => 'alt',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'What does CSS stand for?',
                'activityChoices' => json_encode(['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets']),
                'activityKey' => 'Cascading Style Sheets',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'Which tag is used for creating tables in HTML?',
                'activityChoices' => json_encode(['<table>', '<tr>', '<td>']),
                'activityKey' => '<table>',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'Which of the following is a correct CSS selector for an id?',
                'activityChoices' => json_encode(['#idName', '.className', 'idName']),
                'activityKey' => '#idName',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'Which CSS property is used to change the background color of an element?',
                'activityChoices' => json_encode(['background-color', 'bg-color', 'color']),
                'activityKey' => 'background-color',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'Which HTML tag is used to define a section of a webpage?',
                'activityChoices' => json_encode(['<section>', '<div>', '<header>']),
                'activityKey' => '<section>',
                'activityPicture' => null,
            ],
            [
                'activityQuestions' => 'What does JavaScript allow you to do in web development?',
                'activityChoices' => json_encode(['Add interactivity to a webpage', 'Style the page', 'Structure the content']),
                'activityKey' => 'Add interactivity to a webpage',
                'activityPicture' => null,
            ],
        ]);
    }
}
