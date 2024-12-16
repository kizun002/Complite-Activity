<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnrollSectionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enroll_section', function (Blueprint $table) {
            $table->id('enrollID');
            $table->unsignedBigInteger('section_ID');
            $table->foreign('section_ID')->references('sectionID')->on('section')->onDelete('cascade');
            $table->unsignedBigInteger('student_ID');
            $table->foreign('student_ID')->references('studentID')->on('student_profile')->onDelete('cascade');
            $table->enum('lessonStatus', ['Not Started', 'In Progress', 'Completed'])->default('Not Started');
            $table->enum('activityStatus', ['Not Started', 'In Progress', 'Completed'])->default('Not Started');
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
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('enroll_section');
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    }
}
