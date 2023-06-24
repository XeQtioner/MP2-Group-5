// touchElement(document.querySelector(".navbar-toggler"));
    
// function touchElement(elmnt) {
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
//     elmnt.ontouchstart = touchTouchStart(e);
    
//     function touchTouchStart(e) {
//       e.preventDefault();
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       document.ontouchend = closeTouchElement;
//       document.ontouchmove = elementTouch;
//     }
  
//     function elementTouch(e) {
//       e = e || window.event;
//       e.preventDefault();
//       pos1 = pos3 - e.clientX;
//       pos2 = pos4 - e.clientY;
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//       elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//     }
  
//     function closeTouchElement() {
//       document.ontouchend = null;
//       document.ontouchmove = null;
//     }
//   }


window.onload = function()  {

var touchmode   = document.querySelector(".navbar-toggler");

touchmode.addEventListener('touchmove', function(ev){
    
    var touchLocation = ev.targetTouches[0];

    touchmode.style.left = touchLocation.pageX -25 + 'px';
    touchmode.style.top = touchLocation.pageY -36 + 'px';

})

touchmode.addEventListener('touchend', function(ev){

    var x = parseInt(touchmode.style.left);
    var y = parseInt(touchmode.style.top);

})



}