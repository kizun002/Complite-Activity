<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id('accountID');
            $table->string('username', 50)->unique();
            $table->string('password');
            $table->enum('accountType', ['Student', 'Instructor', 'Admin']);
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->timestamp('dateTime')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
