'use strict';

window.onload = function(){
	var oHour=document.getElementById("hour");
	var oMin=document.getElementById("min");
	var oSec=document.getElementById("sec");
	toTime(oHour,oMin,oSec);
	setInterval(function(){
		toTime(oHour,oMin,oSec);
	},1000);

	function toTime(oHour,oMin,oSec){
		var oDate=new Date();
		var iSec=oDate.getSeconds();
		var iMin=oDate.getMinutes()+iSec/60;
		var iHour=(oDate.getHours()%12)+iMin/60;
		oSec.style.WebkitTransform="rotate("+(iSec*360/60)+"deg)";
		oMin.style.WebkitTransform="rotate("+(iMin*360/60)+"deg)";
		oHour.style.WebkitTransform="rotate("+(iHour*360/12)+"deg)";
	}
};