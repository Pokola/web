'use strict';

window.onload = function(){

	var oExp = document.getElementById('exp');
	var oUl = oExp.getElementsByTagName('ul')[0];
	var aLi = oUl.children;
	var oOl = document.getElementById('btn');
	var aBtn=  oOl.children;
	var oPrev = document.getElementById('prev');
	var oNext = document.getElementById('next');
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
	var W = oUl.offsetWidth/2;
	var iNow=0;
	var timer =null;

	oExp.onmouseover=function(){
		clearInterval(timer);
		oPrev.style.display='block';
		oNext.style.display='block';
	};
	oExp.onmouseout=function(){
		timer = setInterval(function(){
			fnNext();
		},2000);
		oPrev.style.display='none';
		oNext.style.display='none';
	};
	for(var i=0;i<aBtn.length;i++){
		(function(index){
			aBtn[i].onclick=function(){
				if(iNow%aBtn.length==0&&index==4){
					iNow--;
				}
				if((iNow%aBtn.length==4||iNow==-1)&&index==0){
					iNow++;
				}
				iNow=Math.floor(iNow/aBtn.length)*aBtn.length+index;
				tab();
			};
		})(i);
	}
	function tab(){
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].className='';
		}
		if(iNow>0){
			aBtn[iNow%aBtn.length].className='on';
		}else{
			aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='on';
		}
		startMove(oUl,-iNow*aLi[0].offsetWidth);
	}
	oPrev.onclick=function(){
		iNow--;
		tab();
	};
	oNext.onclick=fnNext;
	function fnNext(){
		iNow++;
		tab();
	}
	
	timer = setInterval(function(){
		fnNext();
	},2000);
	
	
	var left = 0;
	function startMove(obj,iTarget){
		var start = left;
		var dis = iTarget-start;
		var count = Math.floor(700/30);
		var n = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			n++;
			var a = 1-n/count;
			left = start+dis*(1-Math.pow(a,3));
			if(left<0){
				obj.style.left=left%W+'px';
			}else{
				obj.style.left=(left%W-W)%W+'px';
			}
			if(n==count){
				clearInterval(obj.timer);
			}
		},30);
	}

	// 钟表
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
		oSec.style.MozTransform="rotate("+(iSec*360/60)+"deg)";
		oMin.style.MozTransform="rotate("+(iMin*360/60)+"deg)";
		oHour.style.MozTransform="rotate("+(iHour*360/12)+"deg)";
	}

	// 轮播图链接
	var oCh = document.getElementById('choosebtn');
	var aLi1 = oCh.children;
	for (var i = 0; i < aLi1.length; i++) { 
		(function(index){
			aLi1[i].onclick = function(){
				if(index==0){
					window.open('exp/through.html');
				}
				else if(index==1){
					window.open('exp/magnifier.html');
				}
				else if(index==2){
					window.open('exp/accordion.html');
				}
				else if(index==3){
					window.open('exp/chromelist.html');
				}
				else{
					window.open('exp/3drotate.html');
				}
			}
		})(i)
	}
};