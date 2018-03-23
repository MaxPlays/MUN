var olRunning = false, olPaused = false;
var setOlMinutes = 0, setOlSeconds = 0;
var olInterval;

$("#ol-reset-timer").click(reset);

$(".overlay-close").click(function(){
  $(".overlay-wrapper").hide();
  reset();
  setOlMinutes = 0;
  setOlSeconds = 0;
});

function reset(){
  if(olRunning == true){
    olRunning = false;
    olPaused = false;
    window.clearInterval(olInterval);
    outOlTime(setOlMinutes, setOlSeconds);
    $("#ol-minutes").removeClass("ol-red");
    $("#ol-seconds").removeClass("ol-red");
    $("#ol-minutes").prop("disabled", false);
    $("#ol-seconds").prop("disabled", false);
  }
}

$("#ol-start-timer").click(function(){
  if(olRunning == false){
    var minutes = parseInt($("#ol-minutes").val());
    var seconds = parseInt($("#ol-seconds").val());
    if(!isNaN(minutes) && !isNaN(seconds)){
      outOlTime(minutes, seconds);
      setOlMinutes = minutes;
      setOlSeconds = seconds;
      olRunning = true;
      olInterval = setInterval(olRun, 1000);
      $("#ol-minutes").prop("disabled", true);
      $("#ol-seconds").prop("disabled", true);
    }else{
      alert("Timer input error");
    }
  }else if(olPaused == false){
    olPaused = true;
  }else if(olPaused == true){
    olPaused = false;
  }
});

function outOlTime(minutes, seconds){
  var m = ((minutes <= 9 && minutes >= 0) ? "0" + minutes : minutes);
  var s = ((seconds <= 9 && seconds >= 0) ? "0" + seconds : seconds);
  $("#ol-minutes").val(m);
  $("#ol-seconds").val(s);
}

function olRun(){
  if(olPaused == false){
    var m = parseInt($("#ol-minutes").val());
    var s = parseInt($("#ol-seconds").val());
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
    if((m < 0 | (m == 0 && s <= 10)) && !$("#ol-minutes").hasClass("ol-red")){
      $("#ol-minutes").addClass("ol-red");
      $("#ol-seconds").addClass("ol-red");
    }
    outOlTime(m, s);
  }
}
