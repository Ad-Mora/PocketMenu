/**
 * Created by devinm on 6/12/16.
 */
var swipeGesture = (function (){
    // cache DOM

    // event listeners

    // private variables

    // public variables

    // private functions
    function _swipeGestureData(dragCallback) {
        this.swipeDirection;
        this.startX;
        this.startY;
        this.deltaX;
        this.deltaY;
    }

    function _beginSwipeGesture(event, data, dragHandler) {
        // set data for later in gesture
        var touchPoint = event.changedTouches[0];
        data.swipeDirection = 'none';
        data.deltaX = 0;
        data.deltaY = 0;
        data.startX = touchPoint.pageX;
        data.startY = touchPoint.pageY;

        // call dragHandler
        dragHandler(data.direction, data.deltaX, data.deltaY);
        event.preventDefault(); // prevent click event
    }

    function _duringSwipeGesture(event, data, dragHandler) {
        // update data for later in gesture
        var touchPoint = event.changedTouches[0];
        data.deltaX = touchPoint.pageX - data.startX;
        data.deltaY = touchPoint.pageY - data.startY;
        if (Math.abs(data.deltaX) >= Math.abs(data.deltaY)) {
            data.swipeDirection = (data.deltaX <= 0) ? 'left' : 'right';
        }
        else {
            data.swipeDirection = (data.deltaY <= 0) ? 'up' : 'down';
        }

        // call dragHandler
        dragHandler(data.swipeDirection, data.deltaX, data.deltaY);
        event.preventDefault(); // prevent scrolling
    }

    function _endSwipeGesture(event, data, swipeCallback) {
        swipeCallback(data.swipeDirection, data.deltaX, data.deltaY);
        event.preventDefault(); // prevent mouseup event
    }

    // public functions
    function addSwipeListener(element, swipeCallback) {
        var noDragHandler = function (deltaX, deltaY) {
            // do nothing...
        }
        addSwipeAndDragListener(element, noDragHandler, swipeCallback);
    }

    function addSwipeAndDragListener(element, dragHandler, swipeCallback) {
        var data = new _swipeGestureData();

        element.addEventListener('touchstart', function(event) {
           _beginSwipeGesture(event, data, dragHandler);
        });
        element.addEventListener('touchmove', function(event) {
            _duringSwipeGesture(event, data, dragHandler);
        });
        element.addEventListener('touchend',function(event) {
            _endSwipeGesture(event, data, swipeCallback);
        });
    }

    // return public points to private variables & functions
    return {
        addSwipeListener: addSwipeListener,
        addSwipeAndDragListener: addSwipeAndDragListener
    };

})();