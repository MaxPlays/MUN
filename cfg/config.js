$(document).ready(function(){
  $.get("../query.php?action=getTableInfo", function(data){
    var json = JSON.parse(data);
    for(var i = 0; i < json.length; i++){
      appendEntry(json[i].committee, json[i].topicA, json[i].topicB);
    }
  });
});

$("#toggle").click(function(){
  $(".create-options").slideToggle();
  if($("#toggle-lbl").html() == "+"){
    $("#toggle-lbl").html("-");
    $(".create-options").css("display", "inline-flex");
  }else{
    $("#toggle-lbl").html("+");
  }
});

$("#clear").click(function(){
  $("input[type=checkbox]").prop("checked", false);
});

$("#create").click(function(){
  var vname = $("#name").val();
  var vtopicA = $("#topica").val();
  var vtopicB = $("#topicb").val();

  var raw = {
    committee: vname,
    topicA: vtopicA,
    topicB: vtopicB,
    countries: Array()
  };

  var v = $("input[type=checkbox]");
  var c = 0;
  for(var i = 0; i < v.length; i++){
    if(v[i].checked == true){
      raw.countries[c] = new Country(v[i].value);
      c++;
    }
  }

  $.get("../query.php?action=create&data=" + JSON.stringify(raw), function(data){
    if(data == "success"){
      appendEntry(vname, vtopicA, vtopicB);
      $("input[type=text]").val("");
      $("input[type=checkbox]").prop("checked", false);
    }else{
      alert(data);
    }
  });
});

function Country(name){
  this.country = name;
  this.index = -1;
  this.warns = 0;
}
function appendEntry(committee, topicA, topicB){
  $("table").append('<tr><td class="table-committee">' + committee + '</td><td>' + topicA + '</td><td>' + topicB + '</td><td class="remove">X</td></tr>');
}

$(document).on("click", ".remove", function(e){
  var v = this.parentNode.getElementsByClassName("table-committee")[0];
  $.get("../query.php?action=remove&name=" + v.innerHTML, function(data){
    if(data == "success"){
      $(v.parentNode).remove();
    }
  });
});
