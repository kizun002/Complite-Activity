<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actions', function (Blueprint $table) {
            $table->id('actionID');
            $table->unsignedBigInteger('account_ID');
            $table->foreign('account_ID')->references('accountID')->on('accounts')->onDelete('cascade');
            $table->text('actionMessage');
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
        Schema::dropIfExists('actions');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
