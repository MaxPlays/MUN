$(document).ready(updateListSize);

fill('[{"name" : "Test 1"}, {"name" : "Test 2"}, {"name" : "Test 3"}, {"name" : "Test 4"}, {"name" : "Test 5"}, {"name" : "Test 6"}]');

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
  var json = JSON.parse(data);
  for(var i = 0; i < json.length; i++){
    appendOption("notsl", json[i].name);
  }
}

function appendOption(list, text){
  $("." + list).append("<option>" + text + "</option>");
}
