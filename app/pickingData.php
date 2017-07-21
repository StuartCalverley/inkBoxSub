<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use \Carbon\Carbon;

class pickingData extends Model
{
    //
	protected $table = 'picking_data';

    protected $dates = ["created_at", "updated_at"];

    

    public static function getBreakDown($num) {

    	$userC = static::where('picker', $num);
    	$userM = $userC->get()->all();
    	$timeDifference = array();
    	$totalEntries = $userC->count();

    	//Creates two Carbon variable that hold the current date and time
    	$totalTime = new Carbon();
    	$currentTime = new Carbon();


    	for($i = 0; $i< $userC->count(); $i++) {
    		//Saves all the required values asked in task 1
    		$first = $userM[$i]->updated_at;
    		$totalTime = $totalTime->addSeconds($userM[$i]->created_at->diffInSeconds($first));
    		$timeDifference[$i] = $userM[$i]->created_at->diffInSeconds($first);
    	}

    	//Calculates the time difference between totalTime and currentTime which results in the time elasped
    	$totalTime = $totalTime->diffInSeconds($currentTime);
    	$package = array($totalTime, $timeDifference, $totalEntries);

    	//Sends an array back with the count, time elasped, and an array of all the times
    	return $package;
    }


    public static function leaderBoard() {
    	//Sends back an array where all the status are complete
    	return static::where('status', 'complete')->get()->all();
    }

    public static function getAllData() {
    	//Returns an array which contains the whole database
    	return static::all();
    }

    public static function getDateBreakDown($num) {
    	$userC = static::where('picker', $num);
    	$userM = $userC->get()->all();
    	$holder = array();

    	$currentTime = new Carbon();

    	for($i =0; $i<$userC->count(); $i++) {
    		if(!array_key_exists($userM[$i]->created_at->toDateString(),$holder)) {
    			$first = $userM[$i]->updated_at;
    			$totalTime = new Carbon();
    			$totalTime = $totalTime->addSeconds($userM[$i]->created_at->diffInSeconds($first));
    			$holder[$userM[$i]->created_at->toDateString()] = array(1, $totalTime, array($userM[$i]->created_at->diffInSeconds($first)));
    			
    		} else {
    			$first = $userM[$i]->updated_at;
    			//Calcaulates the count
    			$holder[$userM[$i]->created_at->toDateString()][0] = $holder[$userM[$i]->created_at->toDateString()][0] + 1;
    			//Calcaulates the time elasped
    			$holder[$userM[$i]->created_at->toDateString()][1] = $holder[$userM[$i]->created_at->toDateString()][1]->addSeconds($userM[$i]->created_at->diffInSeconds($first));
    			//Stores all the times in arrays
    			$holder[$userM[$i]->created_at->toDateString()][2][] = $userM[$i]->created_at->diffInSeconds($first);
    		}
    	}


    	foreach($holder as $key =>$value) {
    		$holder[$key][1] = $holder[$key][1]->diffInSeconds($currentTime);
    	}

    	//Sends back an Object which contains x number of arrays and in those arrays there is the count, time elasped and an array of all the times 
    	return $holder;
    }
}

