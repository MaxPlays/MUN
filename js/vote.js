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
var countries = Array();
function startVote(){
  countries = Array();
  $(".vote-country").html("-");
  $(".list-entry").remove();
  $(".num-val").html("0 [0%]");

  var list = document.querySelectorAll("option");
  for(var i = 0; i < list.length; i++){
    countries[i] = list[i].innerHTML;
  }
  countries.sort(function(a, b){
    if(a < b) return -1;
    if(b < a) return 1;
    return 0;
  });
  if(countries.length > 0){
    $(".vote-country").html(countries[0]);
  }
}
$("#button-favour").click(function(){
  var current = $(".vote-country").html();
  if(current != "-"){
    var index = countries.indexOf(current) + 1;
    if(index < countries.length){
      $(".vote-country").html(countries[index]);
    }else{
      $(".vote-country").html("-");
    }
    $(".list-favour").append('<div class="list-entry">' + current + '</div>');
    updateNumbers();
  }
});

$("#button-against").click(function(){
  var current = $(".vote-country").html();
  if(current != "-"){
    var index = countries.indexOf(current) + 1;
    if(index < countries.length){
      $(".vote-country").html(countries[index]);
    }else{
      $(".vote-country").html("-");
    }
    $(".list-against").append('<div class="list-entry">' + current + '</div>');
    updateNumbers();
  }
});

$("#button-abstain").click(function(){
  var current = $(".vote-country").html();
  if(current != "-"){
    var index = countries.indexOf(current) + 1;
    if(index < countries.length){
      $(".vote-country").html(countries[index]);
    }else{
      $(".vote-country").html("-");
    }
    $(".list-abstain").append('<div class="list-entry">' + current + '</div>');
    updateNumbers();
  }
});
function updateNumbers(){
  $("#num-fav").html($(".list-favour").children().length + " [" + (Math.round((($(".list-favour").children().length / $(".list-entry").length)*1000))/10) + "%]");

  $("#num-ag").html($(".list-against").children().length + " [" + (Math.round((($(".list-against").children().length / $(".list-entry").length)*1000))/10) + "%]");

  $("#num-ab").html($(".list-abstain").children().length + " [" + (Math.round((($(".list-abstain").children().length / $(".list-entry").length)*1000))/10) + "%]");
}
