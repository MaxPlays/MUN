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
$(document).on("contextmenu", "option", function(e){
  e.preventDefault();
  if(confirm("Are you sure that you want to warn " + this.text + "?")){
    warn(this.text);
  }
});

$(document).on("contextmenu", ".warning", function(e){
  e.preventDefault();
  var country = this.getElementsByClassName("warn-country")[0].innerHTML;
  var to = parseInt(this.getElementsByClassName("warn-amount")[0].innerHTML) - 1;
  if(confirm("Are you sure that you want to remove one warning from " + country) + "?"){
    $(this).remove();
    if(to > 0){
      $("#warnings").prepend('<div class="warning"><div class="warn-country">' + country + '</div>: <div class="warn-amount">' + to + '</div></div>');
    }
    if(to == 2){
      $(".notsl").append('<option>' + country + '</option>');
    }
    updateListSize();
  }
});

function warn(country){
  var list = document.getElementsByClassName("warning");
  var warnings = 0;
  for(var i = 0; i < list.length; i++){
    if(country == list[i].getElementsByClassName("warn-country")[0].innerHTML){
      warnings = parseInt(list[i].getElementsByClassName("warn-amount")[0].innerHTML);
      $(list[i]).remove();
      break;
    }
  }
  $("#warnings").prepend('<div class="warning"><div class="warn-country">' + country + '</div>: <div class="warn-amount">' + (warnings + 1) + '</div></div>');
  if((warnings + 1) >= 3){
    var v = document.querySelectorAll("option");
    for(var s = 0; s < v.length; s++){
      if(v[s].innerHTML == country){
        $(v[s].remove());
      }
    }
  }
}
