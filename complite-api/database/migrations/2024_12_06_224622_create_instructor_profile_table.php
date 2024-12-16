<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInstructorProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('instructor_profile', function (Blueprint $table) {
            $table->id('instructorID');
            $table->unsignedBigInteger('account_ID');
            $table->foreign('account_ID')->references('accountID')->on('accounts')->onDelete('cascade');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('middleName');
            $table->string('email', 50);
            $table->enum('sex', ['Male', 'Female']);
            $table->date('birthDate');
            $table->string('profilePhoto')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('instructor_profile');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
