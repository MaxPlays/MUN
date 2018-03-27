/*
Copyright 2018 Maximilian Negedly

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$("#c-button").click(function(){
  $(".overlay-header").html("Start Caucus");
  $(".overlay-wrapper").show();

  $(".ol-select-wrapper").show();
  $(".ol-timer-wrapper").hide();
  $(".ol-vote-wrapper").hide();
});

$("#v-button").click(function(){
  $(".overlay-header").html("Vote");
  $(".overlay-wrapper").show();

  $(".ol-select-wrapper").hide();
  $(".ol-timer-wrapper").hide();
  $(".ol-vote-wrapper").show();

  startVote();
});

$("#mc-button").click(function(){
  $(".ol-select-wrapper").hide();
  $(".overlay-header").html("Moderated Caucus");
  $(".ol-timer-wrapper").show();
});

$("#sc-button").click(function(){
  $(".ol-select-wrapper").hide();
  $(".overlay-header").html("Simple Caucus");
  $(".ol-timer-wrapper").show();
});

window.onbeforeunload = function() {
    return true;
};

$("#end-session").click(function(){

  if(!confirm("Are you sure that you want to end the session?")){
    return;
  }

  var array = Array();

  var notsl = document.getElementsByClassName("notsl")[0].querySelectorAll("option");
  for(var i = 0; i < notsl.length; i++){
    array.push(new DataEntry(notsl[i].innerHTML, -1, getWarns(notsl[i].innerHTML)));
  }

  var sl = document.getElementsByClassName("sl")[0].querySelectorAll("option");
  for(var v = 0; v < sl.length; v++){
    array.push(new DataEntry(sl[v].innerHTML, v, getWarns(sl[v].innerHTML)));
  }

  var warns = document.getElementsByClassName("warning");
  for(var j = 0; j < warns.length; j++){
    var name = warns[j].getElementsByClassName("warn-country")[0].innerHTML;
    var amount = parseInt(warns[j].getElementsByClassName("warn-amount")[0].innerHTML);
    if(amount >= 3){
      array.push(new DataEntry(name, -1, amount));
    }
  }
  $.get("query.php?action=save&committee=" + $("#commitee").html() + "&data=" + JSON.stringify(array), function(data){
    console.log(data);
  });

  $(".menu").show();
  $(".wrapper-started").hide();

});

function DataEntry(country, index, warns){
  this.country = country;
  this.index = index;
  this.warns = warns;
}
function getWarns(country){
  var list = document.getElementsByClassName("warning");
  for(var i = 0; i < list.length; i++){
    if(country == list[i].getElementsByClassName("warn-country")[0].innerHTML){
      return parseInt(list[i].getElementsByClassName("warn-amount")[0].innerHTML);
    }
  }
  return 0;
}
