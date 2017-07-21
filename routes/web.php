<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'AnalyticController@index');

Route::get('/get/values', 'AnalyticController@getBreakDown');

Route::get('/get/display', 'AnalyticController@compare');

Route::get('/get/leaderBoard', 'AnalyticController@leaderBoard');

Route::get('/get/getDateBreakDown', 'AnalyticController@getDateBreakDown');


