/**
 * Created by devinm on 6/12/16.
 */
var documentModule = (function(){
    // cache DOM

    // bind events
    document.addEventListener('keydown', _callKeypressFunctions);
    window.addEventListener('resize', _callResizeFunctions);

    // private variables
    var onKeyPressEvents = [];
    var onResizeEvents = [];

    // public variables

    // private functions
    function _callKeypressFunctions() {
        for (var i = 0; i < onKeyPressEvents.length; i++) {
            (onKeyPressEvents[i])(event);
        }
    }
    
    function _callResizeFunctions() {
        for (var i = 0; i < onResizeEvents.length; i++) {
            (onResizeEvents[i])(event);
        }
    }

    // public functions
    function addOnKeyPressFunction(func) {
        onKeyPressEvents.push(func)
    }
    
    function addOnResizeFunction(func) {
        onResizeEvents.push(func)
    }

    // return public pointers to private variables & functions
    return {
        addOnKeyPressFunction: addOnKeyPressFunction,
        addOnResizeFunction: addOnResizeFunction
    };

})();