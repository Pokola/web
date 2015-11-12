'use strict';

function hoverDir(obj,ev){
    var w = obj.offsetWidth;
    var h = obj.offsetHeight;
    var x = obj.offsetLeft+w/2-ev.clientX;
    var y = obj.offsetTop+h/2-ev.clientY;
    return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}
function through(obj){
    var oS = obj.children[0];
    obj.onmouseover=function(ev){
        var oEvent = ev||event;
        var oFrom = oEvent.fromElement||oEvent.relatedTarget;
        if(obj.contains(oFrom))return;
        var n = hoverDir(obj,oEvent);
        switch(n){
            case 0:
                oS.style.left='200px';
            oS.style.top=0;
            break;
            case 1:
                oS.style.left=0;
                oS.style.top='200px';
            break;
            case 2:
                oS.style.left='-200px';
                oS.style.top=0;
            break;
            case 3:
                oS.style.left=0;
                oS.style.top='-200px';
            break;
        }
        startMove(oS,{top:0,left:0});
    };
    obj.onmouseout=function(ev){
        var oEvent = ev||event;
        var oTo = oEvent.toElement||oEvent.relatedTarget;
        if(obj.contains(oTo))return;
        var n = hoverDir(obj,oEvent);
        switch(n){
            case 0:
                startMove(oS,{top:0,left:200});
            break;
            case 1:
                startMove(oS,{top:200,left:0});
            break;
            case 2:
                startMove(oS,{top:0,left:-200});
            break;
            case 3:
                startMove(oS,{top:-200,left:0});
            break;
        }
    };
}
window.onload=function(){
    var aLi=document.getElementsByTagName('li');
    for(var i=0;i<aLi.length;i++){
        through(aLi[i]);
    }
};