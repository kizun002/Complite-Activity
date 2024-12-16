<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id('reportID');
            $table->unsignedBigInteger('account_ID');
            $table->foreign('account_ID')->references('accountID')->on('accounts')->onDelete('cascade');
            $table->text('reportMessage');
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
        Schema::dropIfExists('reports');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
