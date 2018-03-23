$("#mc-button").click(function(){
  $(".overlay-header").html("Moderated Caucus");
  $(".overlay-wrapper").show();
});

$("#sc-button").click(function(){
  $(".overlay-header").html("Simple Caucus");
  $(".overlay-wrapper").show();
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
