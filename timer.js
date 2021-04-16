var a = new Date();
a.setSeconds(a.getSeconds() + 12);
var x = setInterval(function(){
var y = new Date().getTime();
var z = a - y;
var min = Math.floor((z % (1000 * 60 * 60)) / (1000 * 60)); 
var sec = Math.floor((z % (1000 * 60)) / 1000);
document.getElementById("time").innerHTML = min  + "m" + "   " + sec + "s";
if (z < 0){
	clearInterval(a);
	document.getElementById("time").innerHTML = "Time Up";
	document.getElementById("form").submit();
}

 }, 1000);
