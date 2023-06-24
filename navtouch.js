window.onload = function()  {

    var touchnav   = document.querySelector(".navbar-nav");
    
    touchnav.addEventListener('touchmove', function(ev){
        
        var navtouchLocation = ev.targetTouches[0];
    
        touchnav.style.top = navtouchLocation.clientY -50 + 'px';
    
    })
    
    touchnav.addEventListener('touchend', function(ev){
    
        var x = parseInt(touchnav.style.left);
        var y = parseInt(touchnav.style.top);
    
    })
    
    }