/**
 * Created by devinm on 6/12/16.
 */
var swipeGesture = (function (){
    // cache DOM

    // event listeners

    // private variables
    var minSwipeDist = 150;
    var maxPerpindicularDisplacement = 100;
    var maxSwipeTime = 300;

    // public variables

    // private functions
    function _swipeGestureData() {
        this.swipeDirection;
        this.startX;
        this.startY;
        this.deltaX;
        this.deltaY;
        this.timeElapsed;
        this.startTime;
    }

    function _beginSwipeGesture(event, swipeGestureData) {
        var touchPoint = event.changedTouches[0];
        swipeGestureData.swipeDirection = 'none';
        swipeGestureData.deltaX = 0;
        swipeGestureData.deltaY = 0;
        swipeGestureData.startX = touchPoint.pageX;
        swipeGestureData.startY = touchPoint.pageY;
        swipeGestureData.startTime = new Date().getTime();
        event.preventDefault(); // prevent click event
    }

    function _duringSwipeGesture(event, swipeGestureData) {
        event.preventDefault(); // prevent scrolling
    }

    function _endSwipeGesture(event, swipeGestureData) {
        var touchPoint = event.changedTouches[0];
        swipeGestureData.deltaX = touchPoint.pageX - swipeGestureData.startX;
        swipeGestureData.deltaY = touchPoint.pageY - swipeGestureData.startY;
        swipeGestureData.timeElapsed = new Date().getTime() - swipeGestureData.startTime;
        event.preventDefault(); // prevent mouseup event
    }

    function _callbackIfValidSwipe(swipeGestureData, swipeDirection, callback) {
        if (swipeGestureData.timeElapsed <= maxSwipeTime) {
            if (Math.abs(swipeGestureData.deltaX) >= minSwipeDist
                && Math.abs(swipeGestureData.deltaY <= maxPerpindicularDisplacement)) {
                if (swipeGestureData.deltaX <= 0) {
                    swipeGestureData.swipeDirection = 'left';
                }
                else {
                    swipeGestureData.swipeDirection = 'right';
                }
            }
            else if (Math.abs(swipeGestureData.deltaY) >= minSwipeDist
                && Math.abs(swipeGestureData.deltaX <= maxPerpindicularDisplacement)) {
                if (swipeGestureData.deltaY <= 0) {
                    swipeGestureData.swipeDirection = 'up';
                }
                else {
                    swipeGestureData.swipeDirection = 'down';
                }
            }
        }

        if (swipeGestureData.swipeDirection == swipeDirection) {
            callback();
        }
    }

    // public functions
    function addSwipeListener(swipeDirection, element, callback) {
        var swipeGestureData = new _swipeGestureData();

        element.addEventListener('touchstart', function(event) {
           _beginSwipeGesture(event, swipeGestureData);
        });
        element.addEventListener('touchmove', function(event) {
            _duringSwipeGesture(event, swipeGestureData);
        });
        element.addEventListener('touchend',function(event) {
            _endSwipeGesture(event, swipeGestureData);
            _callbackIfValidSwipe(swipeGestureData, swipeDirection, callback);
        });
    }

    // return public points to private variables & functions
    return {
        addSwipeListener: addSwipeListener
    };

})();