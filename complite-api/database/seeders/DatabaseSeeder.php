<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            UserAccount::class,
            Section::class,
            EnrollSection::class,
            LessonSeeder::class,
            ActivitySeeder::class,
            ContentSeeder::class,
            ReportSeeder::class
        ]);
    }
}
