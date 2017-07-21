$(document).ready(function() {
	$('#submit').click(function() {
		$.ajax({
			url : '/get/values',
			type : 'GET',
			data : {'temp' : $('#id').val()},
			success: function(data) {

				//Checks if any entries from the database were returned
				if(data[1].length == 0) {
					document.getElementById('simpleBreakDown').innerHTML = "<h1>No values found for that ID</h1>";
				} else {

					var count = "<h3>Total number of Orders: "+data[2]+"<h3>";
					var time = "";
					var average = "";
					var seconds = data[0];
					//moment allows the an easy conversion of seconds to a readable time format
					time ="<h3>The total time elasped is: "+ Math.floor(moment.duration(seconds,'seconds').asHours()) + ':' + moment.duration(seconds,'seconds').minutes() + ':' + moment.duration(seconds,'seconds').seconds()+"<h3>";

					var total = 0;
					for(var i=0; i<data[1].length; i++) {
						total = total + data[1][i];
					}
					var averageSeconds = total/data[1].length;
					average += "<h3>The average time spent on Orders is: "+ Math.floor(moment.duration(averageSeconds,'seconds').asHours()) + ':' + moment.duration(averageSeconds,'seconds').minutes() + ':' + moment.duration(averageSeconds,'seconds').seconds() + "</h3>";

					//All the html that was created above will no be inserted into the 'simpleBreakDown' element
					document.getElementById('simpleBreakDown').innerHTML = count + "<br>" + time + "<br>" + average + "<br>";
				}
				
			}
		})

		$.ajax({
			url : '/get/getDateBreakDown',
			type: 'GET',
			data: {'id' : $('#id').val()},
			success: function(data) {
				//Very similar to the ajax call about but instead of an array being return an Object with the date's as keys is returned
				var keys = Object.keys(data);
				//Creating a table to show the data in
				var myTable = "<table><tr><td style='width: 100px;'>Date</td>";
				myTable += "<td style='width: 100px;'>Count</td>";
				myTable += "<td style='width: 100px;'>Time Elasped</td>";
				myTable += "<td style='width: 100px;'>Average Time Per Order</td></tr>";
				for(var i =0; i<keys.length; i++) {
					data[keys[i]]
					myTable += "<tr><td style='width: 100px;'>"+keys[i]+"</td>";
					myTable += "<td style='width: 100px;'>"+data[keys[i]][0]+ "</td>";
					var seconds = parseInt(data[keys[i]][1]);
					myTable += "<td style='width: 100px;'>"+Math.floor(moment.duration(seconds,'seconds').asHours()) + ':' + moment.duration(seconds,'seconds').minutes() + ':' + moment.duration(seconds,'seconds').seconds()+"</td>";
						var averageSeconds = data[keys[i]][1]/data[keys[i]][0];
					myTable += "<td style='width: 100px;'>"+Math.floor(moment.duration(averageSeconds,'seconds').asHours()) + ':' + moment.duration(averageSeconds,'seconds').minutes() + ':' + moment.duration(averageSeconds,'seconds').seconds() +"</td></tr>";
				}
				myTable += "</table>";
				document.getElementById('dateBreakDownTable').innerHTML = myTable;



			}

		})
	});

	$('#leaderBoard').click(function() {
		$.ajax({
			url: '/get/leaderBoard',
			type: 'GET',
			success: function(data) {
				var date = [];
				var pickerId = [];
				
				//Finds all the different dates and id's in the array
				for(var i = 0; i<data.length; i++) {
					if(date.indexOf(data[i].created_at.substring(0,10)) == -1) {
						date.push(data[i].created_at.substring(0,10));
					}
					if(pickerId.indexOf(data[i].picker) == -1) {
						pickerId.push(data[i].picker);
					}
				}
				//This number will allow us to pick a random date from the possible dates
				var datePicker = Math.floor((Math.random() * date.length)+0);
				var score = new Array(pickerId.length);
				for(var temp = 0; temp < score.length; temp++) {
					score[temp] = 0;
				}
				for(var i = 0; i<data.length; i++) {
					if(data[i].created_at.substring(0,10) == date[datePicker]) {
						var indexNum = pickerId.indexOf(data[i].picker);
						score[indexNum]++;
					}
				}

				//Quick little bubble sort to sort score array, all mirrored any change in the score array to the pickerId array
				for(var i =0; i<pickerId.length; i++) {
					
					for(var j=1; j<pickerId.length; j++) {
						if(score[j] < score[j-1]) {
							var tempScore = score[j];
							score[j] = score[j-1];
							score[j-1] = tempScore;
							var tempPicker = pickerId[j];
							pickerId[j] = pickerId[j-1];
							pickerId[j-1] = tempPicker;
						}
					}
				}

				var backgroundCol = [];
				var boardCol = [];
				//Sets the proper colors for the bar graph
				for(var i =0; i< pickerId.length; i++) {
					if(pickerId.length -i == 1) {
						backgroundCol[i] = 'rgba(255, 215,0, 0.8)';
						boardCol[i] = 'rgba(255, 215,0, 1)';
					} else if(pickerId.length - i == 2) {
						backgroundCol[i] = 'rgba(198,226,255,0.8)';
						boardCol[i] = 'rgba(198,226,255,1)';
					} else if(pickerId.length -i == 3) {
						backgroundCol[i] = 'rgba(205,127,50,0.8)';
						boardCol[i] = 'rgba(205,127,50,1)';
					} else {
						backgroundCol[i] = 'rgba(220, 218, 218, 0.5)';
						boardCol[i] = 'rgba(220, 218, 218, 1)';
					}
				}

				document.getElementById("titleOfChart").innerHTML = "<h4 class='text-center'>Current Results based off of "+ date[datePicker] + " entries<h4>";

				var ctx = document.getElementById("leaderBoardChart");

				//Used chartsjs to create the graphs for this page.
				var leaderBoardChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels : pickerId,
						datasets: [{
							label: 'LeaderBoard',
							data: score,
							backgroundColor: backgroundCol,
							borderColor: boardCol
						}]
					},
					 options: {
				        scales: {
				            yAxes: [{
				                ticks: {
				                    beginAtZero:true
				                }
				            }]
				        }
				    }
				});
			}
		})
	})

	$('#chartCompare').click(function() {
		$.ajax({
			url : '/get/display',
			type : 'GET',
			success: function(data) {
				var xAxis = [];
				var pickerId = [];
				//Similar to the leaderboard ajax call
				for(var i = 0; i<data.length; i++) {
					if(xAxis.indexOf(data[i].created_at.substring(0,10)) == -1) {
						xAxis.push(data[i].created_at.substring(0,10));
					}
					if(pickerId.indexOf(data[i].picker) == -1) {
						pickerId.push(data[i].picker);
					}
				}
				//Create a 2D array and set the values all to 0
				var holder = new Array(pickerId.length);
				for(var j = 0; j<holder.length; j++) {
					holder[j] = new Array(xAxis.length);
					for(var i =0; i< xAxis.length; i++) {
						holder[j][i] = 0;
					}
				}
								
				//Increment the correct id count based off of the date
				for(var i =0; i<data.length; i++) {
					var xValue = xAxis.indexOf(data[i].created_at.substring(0,10));
					var id = pickerId.indexOf(data[i].picker);
					holder[id][xValue]++;
				}

				var storeData = [];
				for(var i =0; i< pickerId.length; i++) {
					var temp = {};
					temp.label = "Picker "+pickerId[i];
					temp.data = holder[i];
					//randomize the color of each line
					var color1 = ((Math.random() * 255)+0);
					var color2 = ((Math.random() * 255)+0);
					var color3 = ((Math.random() * 255)+0);
		            temp.borderColor="rgba("+color1+","+color2+","+color3+",1)";
		            temp.pointBorderColor= "rgba("+color1+","+color2+","+color3+",1)";
		            temp.fill = false;
		            storeData[i] = temp;
				}

				document.getElementById("titleOfGraph").innerHTML = "<h4 class='text-center'>Picker Id Vs. Date<h4>";

				console.log(Math.floor((Math.random() * 255)+0));
				var ctx = document.getElementById("myChart");

				var myChart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: xAxis,
				        datasets: storeData,
					},
					options: {
				        scales: {
				            yAxes: [{
				                ticks: {
				                    beginAtZero:true,
				                },
				                
				            }],
				            scaleLabel: [{
				            	display: true,
				                labelString: 'Amount of Orders'
				            }],
				            xAxes: [{
				            	display: true,
				            	labelString: 'Dates'
				            }]
				        }
				    }
				})
			}
		})
	});
});


//So the graph appear but is left blank when the page is loaded
var inital = document.getElementById("myChart");

var myChart = new Chart(inital, {
	type: 'line',
	data: {},
	options: {}
});



var intial2 = document.getElementById("leaderBoardChart");

var myChart2 = new Chart(intial2, {
	type: 'bar',
	data: {},
	options: {}
});

