var running = false, paused = false;
var setMinutes = 0, setSeconds = 0;
var interval;

$("#reset-timer-sl").click(function(){
  if(running == true){
    running = false;
    paused = false;
    window.clearInterval(interval);
    outTime(setMinutes, setSeconds);
    $("#minutes-sl").removeClass("red");
    $("#seconds-sl").removeClass("red");
    $("#minutes-sl").prop("disabled", false);
    $("#seconds-sl").prop("disabled", false);
  }
});

$("#start-timer-sl").click(function(){
  if(running == false){
    var minutes = parseInt($("#minutes-sl").val());
    var seconds = parseInt($("#seconds-sl").val());
    if(!isNaN(minutes) && !isNaN(seconds)){
      outTime(minutes, seconds);
      setMinutes = minutes;
      setSeconds = seconds;
      running = true;
      interval = setInterval(run, 1000);
      $("#minutes-sl").prop("disabled", true);
      $("#seconds-sl").prop("disabled", true);
    }else{
      alert("Timer input error");
    }
  }else if(paused == false){
    paused = true;
  }else if(paused == true){
    paused = false;
  }
});

function outTime(minutes, seconds){
  var m = ((minutes <= 9 && minutes >= 0) ? "0" + minutes : minutes);
  var s = ((seconds <= 9 && seconds >= 0) ? "0" + seconds : seconds);
  $("#minutes-sl").val(m);
  $("#seconds-sl").val(s);
}

function run(){
  if(paused == false){
    var m = parseInt($("#minutes-sl").val());
    var s = parseInt($("#seconds-sl").val());
    if(m <= 0 && s <= 0){
      if(s == -59){
        m--;
        s = 0;
      }else{
        s--;
      }
    }else{
      if(s == 0){
        m --;
        s = 59;
      }else{
        s --;
      }
    }
    if((m < 0 | (m == 0 && s <= 10)) && !$("#minutes-sl").hasClass("red")){
      $("#minutes-sl").addClass("red");
      $("#seconds-sl").addClass("red");
    }
    outTime(m, s);
  }
}
