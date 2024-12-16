<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Model\Accounts;

class usertestdata extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Accounts::create([
            'username' => 'admin123',
            'password' => Hash::make('admin@123'),
            'accountType' => 'Admin'
        ]);
    }
}
