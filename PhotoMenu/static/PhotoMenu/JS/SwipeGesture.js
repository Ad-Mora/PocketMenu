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
    function _swipeGestureData(dragCallback) {
        this.swipeDirection;
        this.swipeType;
        this.startX;
        this.startY;
        this.deltaX;
        this.deltaY;
        this.timeElapsed;
        this.startTime;
    }

    function _beginSwipeGesture(event, data, dragHandler) {
        // set data for later in gesture
        var touchPoint = event.changedTouches[0];
        data.swipeDirection = 'none';
        data.swipeType = 'none';
        data.deltaX = 0;
        data.deltaY = 0;
        data.startX = touchPoint.pageX;
        data.startY = touchPoint.pageY;
        data.startTime = new Date().getTime();

        // call dragHandler
        dragHandler(event, data.swipeDirection, 0);

        event.preventDefault(); // prevent click event
    }

    function _duringSwipeGesture(event, data, dragHandler) {
        // update data for later in gesture
        var touchPoint = event.changedTouches[0];
        data.deltaX = touchPoint.pageX - data.startX;
        data.deltaY = touchPoint.pageY - data.startY;

        // update more data, call dragHandler
        if (Math.abs(data.deltaX) >= Math.abs(data.deltaY)) {
            data.swipeDirection = (data.deltaX <= 0) ? 'left' : 'right';
            dragHandler(event, data.swipeDirection, data.deltaX);
        }
        else {
            data.swipeDirection = (data.deltaY <= 0) ? 'up' : 'down';
            dragHandler(event, data.swipeDirection, data.deltaY);
        }

        event.preventDefault(); // prevent scrolling
    }

    function _endSwipeGesture(event, data) {
        data.timeElapsed = new Date().getTime() - data.startTime;
        event.preventDefault(); // prevent mouseup event
    }

    function _callbackIfValidSwipe(data, targetSwipeDirection, swipeCallback) {
        if (data.timeElapsed <= maxSwipeTime) {
            if (Math.abs(data.deltaX) >= minSwipeDist
                && Math.abs(data.deltaY <= maxPerpindicularDisplacement)) {

                data.swipeType = data.swipeDirection;
            }
            else if (Math.abs(data.deltaY) >= minSwipeDist
                && Math.abs(data.deltaX <= maxPerpindicularDisplacement)) {

                data.swipeType = data.swipeDirection;
            }
        }

        if (data.swipeType == targetSwipeDirection) {
            swipeCallback();
        }
    }

    // public functions
    function addSwipeListener(targetSwipeDirection, element, swipeCallback) {
        var ignoreDrag= function (event, actualSwipeDirection, displacement) {
            // do nothing...
            console.log("this works");
        }
        addSwipeAndDragListener(targetSwipeDirection, element, ignoreDrag, swipeCallback);
    }

    function addSwipeAndDragListener(targetSwipeDirection, element, dragCallback, swipeCallback) {
        var data = new _swipeGestureData();

        element.addEventListener('touchstart', function(event) {
           _beginSwipeGesture(event, data, dragCallback);
        });
        element.addEventListener('touchmove', function(event) {
            _duringSwipeGesture(event, data, dragCallback);
        });
        element.addEventListener('touchend',function(event) {
            _endSwipeGesture(event, data);
            _callbackIfValidSwipe(data, targetSwipeDirection, swipeCallback);
        });
    }

    // return public points to private variables & functions
    return {
        addSwipeListener: addSwipeListener,
        addSwipeAndDragListener: addSwipeAndDragListener
    };

})();