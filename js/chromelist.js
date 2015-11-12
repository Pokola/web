'use strict';

window.onload=function(){
	var oUl=document.getElementById('ul1');
	var aLi=oUl.children;
	var zIndex=1000;
	var aPos=[]; 

	for(var i=0; i<aLi.length; i++){
		aPos[i]={left:aLi[i].offsetLeft, top:aLi[i].offsetTop};
	}
	for(var i=0; i<aLi.length; i++){
		aLi[i].style.left=aPos[i].left+'px';
		aLi[i].style.top=aPos[i].top+'px';
		aLi[i].style.position='absolute';
		aLi[i].style.margin=0;
	}

	for(var i=0; i<aLi.length; i++){
		drag(aLi[i]);
		aLi[i].index=i;
	}

	function drag(obj){
		obj.onmousedown=function(ev){
			var oEvent=ev || event;
			var disX=oEvent.clientX-obj.offsetLeft;
			var disY=oEvent.clientY-obj.offsetTop;

			obj.style.zIndex=zIndex++;

			clearInterval(obj.timer);

			document.onmousemove=function(ev){
				var oEvent=ev || event;
				obj.style.left=oEvent.clientX-disX+'px';
				obj.style.top=oEvent.clientY-disY+'px';

				var oNear=findNearest(obj);
				if(oNear && obj!=oNear){
					var n=obj.index;
					var m=oNear.index;
					if(n<m){
						for(var i=0; i<aLi.length; i++){
							if(aLi[i].index>=n+1 && aLi[i].index<=m){
								aLi[i].index--;
								startMove(aLi[i],aPos[aLi[i].index]);
							}
						}
						obj.index=m;
					}else{
						for(var i=0; i<aLi.length; i++){
							if(aLi[i].index>=m && aLi[i].index<=n-1){
								aLi[i].index++;
								startMove(aLi[i],aPos[aLi[i].index]);
							}
						}
						obj.index=m;
					}
				}
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;


				startMove(obj,aPos[obj.index]);
			};
			return false;
		};
	}

	function findNearest(obj){
		var iMin=999999999999999;
		var iMinIndex=-1;

		for(var i=0; i<aLi.length; i++){
			if(collTest(obj,aLi[i])){
				var dis=getDis(obj,aLi[i]);
				if(dis<iMin){
					iMin=dis;
					iMinIndex=i;
				}
			}
		}

		if(iMinIndex==-1){
			return null;
		}else{
			return aLi[iMinIndex];
		}
	}

	function getDis(obj,obj2){
		var l1=obj.offsetWidth/2+obj.offsetLeft;
		var l2=obj2.offsetWidth/2+aPos[obj2.index].left;

		var t1=obj.offsetTop+obj.offsetHeight/2;
		var t2=aPos[obj2.index].top+obj2.offsetHeight/2;

		var a=l1-l2;
		var b=t1-t2;

		return Math.sqrt(a*a+b*b);
	}

	function collTest(oDiv,oDiv2){
		var l1=oDiv.offsetLeft;
		var r1=oDiv.offsetLeft+oDiv.offsetWidth;
		var t1=oDiv.offsetTop;
		var b1=oDiv.offsetTop+oDiv.offsetHeight;

		var l2=aPos[oDiv2.index].left;
		var r2=aPos[oDiv2.index].left+oDiv2.offsetWidth;
		var t2=aPos[oDiv2.index].top;
		var b2=aPos[oDiv2.index].top+oDiv2.offsetHeight;

		if(r1<l2 || l1>r2 || b1<t2 || t1>b2){
			return false;
		}else{
			return true;
		}
	}
};