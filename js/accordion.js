'use strict';

window.onload=function(){
	var oBox=document.getElementById('box');
	var aA=oBox.getElementsByTagName('a');

	for(var i=0;i<aA.length;i++){
		aA[i].style.left=i*40+'px';
		(function(index){
			aA[i].onmouseover=function(){
				for(var j=0;j<aA.length;j++){
					if(index>=j){
						aA[j].style.left=j*40+'px';
					}else{
						aA[j].style.left=600+j*40+'px';
					}
				}
			};
		})(i)
	}
};