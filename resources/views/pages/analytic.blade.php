@extends ('master')

@section ('content')


<div class="row" style="background: #f9f9f9; width: 100%; height: 300px; padding: 12px;">
  <div class="col-md-2" >
  	<h1>Break Down of Orders</h1>
    Picker ID: <input type="text" name="pickerID" id="id"><br><br>
    <button class="btn btn-primary" id="submit" type="submit">Submit</button>
  </div>
  <div class="col-md-5">
    
    <div class="breakDown" id="simpleBreakDown">
    </div>
  </div>
  <div class="col-md-5" >
    <div class="table table-hover" id="dateBreakDownTable">
    </div>
  </div>
</div>

<div class="row" style="background: #f9f9f9; width: 100%; height: 600px; padding: 12px">
  <div class="col-md-6">
    <div id="titleOfChart">
    </div>
    <canvas id='leaderBoardChart' width='400' height='200'></canvas>
    <br>
    <button class="btn btn-primary" id="leaderBoard" type="submit">View Leader Board</button>
  </div>

  <div class="col-md-6">
    <div id="titleOfGraph">
    </div>
    <canvas id="myChart"></canvas>
    <br>
    <button class="btn btn-primary" id="chartCompare" type="submit">View Chart</button>
  </div>
</div>


@endsection