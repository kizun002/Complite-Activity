<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSectionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('section', function (Blueprint $table) {
            $table->id('sectionID');
            $table->unsignedBigInteger('instructor_ID');
            $table->foreign('instructor_ID')->references('instructorID')->on('instructor_profile')->onDelete('cascade');
            $table->string('courseName');
            $table->text('courseDescription');
            $table->string('activityName');
            $table->string('sectionName');
            $table->string('sectionCode')->unique();
            $table->timestamp('actDueDate');
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
        Schema::dropIfExists('section');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
