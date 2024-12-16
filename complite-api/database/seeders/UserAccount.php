<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserAccount extends Seeder
{
    public function run()
    {
        $accounts = [
            [
                'username'=> '@dmin01',
                'password'=> Hash::make('admin123'),
                'accountType'=> 'Admin'
            ],
            [
                'username'=> 'john@doe',
                'password'=> Hash::make('doe012'),
                'accountType'=> 'Student'
            ],
            [
                'username'=> 'bobby@brown',
                'password'=> Hash::make('brown012'),
                'accountType'=> 'Instructor'
            ]
        ];

        DB::table('accounts')->insert($accounts);

        DB::table('admin')->insert([
            'account_ID' => 1,
            'firstName' => 'Eric',
            'lastName' => 'Lopez',
            'middleName' => 'Gomez',
            'email' => 'eric_lopez@sample.com',
            'sex' => 'Male',
            'birthDate' => \Carbon\Carbon::createFromDate(2000,01,01)->toDateTimeString(),
            'profilePhoto' => ''
        ]);

        DB::table('student_profile')->insert([
            'account_ID' => 2,
            'firstName' => 'John',
            'lastName' => 'Doe',
            'middleName' => 'Gi',
            'email' => 'john_doe@sample.com',
            'sex' => 'Male',
            'birthDate' => Carbon::createFromDate(2003,12,05)->toDateTimeString(),
            'profilePhoto' => '',
            'points' => 100,
            'grades' => 80
        ]);

        DB::table('instructor_profile')->insert([
            'account_ID' => 3,
            'firstName' => 'Bobby',
            'lastName' => 'Brown',
            'middleName' => 'Green',
            'email' => 'bobby_brown@sample.com',
            'sex' => 'Male',
            'birthDate' => \Carbon\Carbon::createFromDate(1986,05,05)->toDateTimeString(),
            'profilePhoto' => ''
        ]);

    }
}
