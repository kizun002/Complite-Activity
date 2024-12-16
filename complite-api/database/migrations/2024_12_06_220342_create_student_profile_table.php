<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


class CreateStudentProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_profile', function (Blueprint $table) {
            $table->id('studentID');
            $table->unsignedBigInteger('account_ID');
            $table->foreign('account_ID')->references('accountID')->on('accounts')->onDelete('cascade');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('middleName');
            $table->string('email', 50);
            $table->enum('sex', ['Male', 'Female']);
            $table->date('birthDate');
            $table->string('profilePhoto')->nullable();
            $table->integer('points')->default(0);
            $table->float('grades');
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
        Schema::dropIfExists('student_profile');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
