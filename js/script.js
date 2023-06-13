var interval, minutos, segundos, loop, loops, dings;

jQuery(document).ready(function($){

  loops = 1;
  $("#play").click(function(){
    clearInterval(interval);
    loop = $("#loop").val();
    dings = $("#dings").val();
    minutos = parseInt($("#minutos").val(), 10);
    segundos = parseInt($("#segundos").val(), 10);
    interval = setInterval(function(){ calcula(); }, 1000); // motor do cronômetro
    $(".top").css("opacity", "0.1");
    $("input").attr("readonly", "readonly");
    if(loops === 1)
      $("#loops").html(1);
    $("#loops").css("opacity", "0.8");
  });

  $("#pause").click(function(){
    clearInterval(interval);
    $(".top").css("opacity", "1");
    $("input").attr("readonly", null);
    $("#loops").css("opacity", "0.2");
  });

  $("#reset").click(function(){
    clearInterval(interval);
    $(".top").css("opacity", "1");
    $("input").attr("readonly", null);    
    $("#minutos").val("05");
    $("#segundos").val("00");
    $("#loop").val(5);
    $("#loops").html(0).css("opacity", "0.2");
    $("#dings").val(3);
    loops = 1;
  });

  $("#loop").change(function(){
    if(parseInt($(this).val(), 10) < 1 || isNaN(parseInt($(this).val(), 10)))
      $(this).val(1);
    $("#minutos").val(checkTime($(this).val()));
  });

  $("#dings").change(function(){
    if(parseInt($(this).val(), 10) < 1 || isNaN(parseInt($(this).val(), 10)))
      $(this).val(1);
  });

  $("#minutos").change(function(){
    if(parseInt($(this).val(), 10) < 0 || isNaN(parseInt($(this).val(), 10)))
      $(this).val('00');
    else
      $(this).val(checkTime($(this).val()));
  });

  $("#segundos").change(function(){
    if(parseInt($(this).val(), 10) < 1 || isNaN(parseInt($(this).val(), 10)))
      $(this).val('00');
    else if(parseInt($(this).val(), 10) > 60)
      $(this).val('60');
    else
      $(this).val(checkTime($(this).val()));
  });

});

function calcula() {
  segundos--;
  if(segundos < 0){
    segundos = 59;
    minutos--;
    if(minutos < 0) {
      minutos = loop;
      segundos = 0;
      $("#loops").html(++loops);
    }
  }
  if(minutos === 0 && segundos < dings)
    document.getElementById("beep").play();
  $("#minutos").val(checkTime(minutos));
  $("#segundos").val(checkTime(segundos));
}

function checkTime(i) {
  if (i.toString().length < 2 && i < 10)
    i = "0" + i;
  return i;
}