<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('content', function (Blueprint $table) {
            $table->unsignedBigInteger('section_ID');
            $table->foreign('section_ID')->references('sectionID')->on('section')->onDelete('cascade');
            $table->unsignedBigInteger('lesson_ID');
            $table->foreign('lesson_ID')->references('lessonID')->on('lesson')->onDelete('cascade');
            $table->unsignedBigInteger('activity_ID');
            $table->foreign('activity_ID')->references('activityID')->on('activity')->onDelete('cascade');
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
        Schema::dropIfExists('content');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
