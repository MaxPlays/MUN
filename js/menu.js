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
$(document).ready(function(){
  $.get("query.php?action=getCommittees", function(data){
    var json = JSON.parse(data);
    for(var i = 0; i < json.length; i++){
      $("#menu-committee-wrapper").append('<input type="radio" name="menu-committee" value="' + json[i].name + '">' + json[i].name + '</input>' + (i == (json.length - 1) ? "" : "<br>"));
    }
  });
});

$(".start-session").click(function(){
  var c = document.getElementsByName("menu-committee");
  var com = "";
  for(var i = 0; i < c.length; i++){
    if(c[i].checked){
      com = c[i].value;
      break;
    }
  }

  var t = document.getElementsByName("menu-topic");
  var top = "";
  for(var j = 0; j < t.length; j++){
    if(t[j].checked){
      top = t[j].value;
      break;
    }
  }

  var s = parseInt($("#menu-session").val());

  if(com != "" && top != "" && !isNaN(s) && s > 0){
    $.get("query.php?action=getInfo&committee=" + com + "&topic=" + top, function(data){
      var json = JSON.parse(data);
      $("#commitee").html(com);
      $("#topic").html(json.name);
      $("#session").html(s);

      fill(JSON.stringify(json.countries));

      $(".menu").hide();
      $(".wrapper-started").show();
    });
  }else{
    alert("Input error");
  }

});
