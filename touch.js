window.onload = function()  {

var touchmode   = document.querySelector(".navbar-toggler");

touchmode.addEventListener('touchmove', function(ev){
    
    var touchLocation = ev.targetTouches[0];

    touchmode.style.left = touchLocation.clientX -25 + 'px';
    touchmode.style.top = touchLocation.clientY -36 + 'px';
    // touchmode.style.right = touchLocation.pageX  - 'px';

})

touchmode.addEventListener('touchend', function(ev){

    var x = parseInt(touchmode.style.left);
    var y = parseInt(touchmode.style.top);

})

}

var touchmode   = document.querySelector(".navbar-nav");

touchmode.addEventListener('touchmove', function(ev){
    
    var touchLocation = ev.targetTouches[0];

    touchmode.style.top = touchLocation.clientY -155 + 'px';

})

touchmode.addEventListener('touchend', function(ev){

    var x = parseInt(touchmode.style.left);
    var y = parseInt(touchmode.style.top);

})


