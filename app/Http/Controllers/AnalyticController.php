<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnalyticController extends Controller
{
    //

	public function index() {
		return view('pages.analytic');
	}


	public function getBreakDown(Request $request) {
		//$id = Input::get("temp");
		$id = $request->temp;
		$model = '\App\pickingData';

		return $model::getBreakDown($id);
	}

	public function getDateBreakDown(Request $request) {
		$id = $request->id;
		$model = '\App\pickingData';

		return $model::getDateBreakDown($id);
	}

	public function leaderBoard() {
		$model = '\App\pickingData';

		return $model::leaderBoard();
	}

	public function compare() {
		$model = '\App\pickingData';

		return $model::getAllData();
	}

}
