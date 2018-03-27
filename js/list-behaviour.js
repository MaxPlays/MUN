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
$(document).ready(updateListSize);

$(document).on("click", "option", function(){
  if(this.parentNode.classList.contains("notsl")){
    appendOption("sl", this.text);
    this.remove();
    updateListSize();
  }else if(this.parentNode.classList.contains("sl")){
    appendOption("notsl", this.text);
    this.remove();
    updateListSize();
  }
});

function updateListSize(){
  var list = document.querySelectorAll("select");
  for(var i = 0; i < list.length; i++){
    var l = list[i].length;
    if(l == 1){
      list[i].size = 2;
      continue;
    }
    list[i].size = l;
  }
  var top = $(".sl").find(":first").text();
  $("#speaking-country").html(top != "" ? top : "-");
}

function fill(data){
  $(".notsl").html("");
  $(".sl").html("");
  $("#warnings").html("");
  var json = JSON.parse(data);
  for(var i = 0; i < json.length; i++){
    var country = json[i].country;
    var index = json[i].index;
    var warns = json[i].warns;
    if(warns > 0){
      $("#warnings").append('<div class="warning"><div class="warn-country">' + country + '</div>: <div class="warn-amount">' + warns + '</div></div>');
    }
    if(index == -1){
      if(warns < 3){
        appendOption("notsl", country);
      }
    }else{
      appendOption("sl", country);
    }
  }
  updateListSize();
}

function appendOption(list, text){
  $("." + list).append("<option>" + text + "</option>");

  if(list == "notsl"){
      var v = document.getElementsByClassName("notsl")[0].querySelectorAll("option");
      var a = Array();
      for(var i = 0; i < v.length; i++){
        a[i] = v[i].innerHTML;
      }
      a.sort(function(a, b){
        if(a < b) return -1;
        if(b < a) return 1;
        return 0;
      });
      $(".notsl").html("");
      for(var j = 0; j < a.length; j++){
        $(".notsl").append("<option>" + a[j] + "</option>");
      }
  }
}
