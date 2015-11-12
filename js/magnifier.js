'use strict';

window.onload = function(){
    var oS = document.getElementById('s');
    var oB = document.getElementById('b');
    var oM = document.getElementsByTagName('span')[0];
    var aImg = document.getElementsByTagName('img');
    var oImg = document.getElementsByTagName('img')[1];
    oS.onmouseover = function(){
        oM.style.display = 'block';
        oB.style.display = 'block';
    };
    oS.onmouseout = function(){
        oM.style.display = 'none';
        oB.style.display = 'none';
    };
    oS.onmousemove = function(ev){
        var oEvent = ev||event;
        var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
        var scrollL = document.documentElement.scrollLeft||document.body.scrollLeft;
        var l = oEvent.clientX-oS.offsetLeft+scrollL-oM.offsetWidth/2;
        var t = oEvent.clientY-oS.offsetTop+scrollT-oM.offsetHeight/2;
        if (l < 0) {
            l=0;
        }else if(l > 300){
            l=300;
        }
        if (t<0) {
            t=0;
        }else if(t>150){
            t=150;
        }
        oM.style.left = l+'px';
        oM.style.top = t+'px';
        //以上为小块移动
        oImg.style.left = -l/(oS.offsetWidth-oM.offsetWidth)*(oImg.offsetWidth-oB.offsetWidth)+'px';
        oImg.style.top = -t/(oS.offsetHeight-oM.offsetHeight)*(oImg.offsetHeight-oB.offsetHeight)+'px';
    };
};
