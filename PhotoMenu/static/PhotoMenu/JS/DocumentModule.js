/**
 * Created by devinm on 6/12/16.
 */
var documentModule = (function(){
    // cache DOM

    // bind events
    document.addEventListener('keydown', callKeypressFunctions);
    window.addEventListener('resize', callResizeFunctions);
    window.addEventListener('click', callClickFunctions);
    window.addEventListener('scroll', callClickFunctions);

    // private variables
    var onKeyPressEvents = [];
    var onResizeEvents = [];
    var onClickEvents = [];
    var onScrollEvents = [];

    // public variables

    // private functions
    function callKeypressFunctions(event) {
        for (var i = 0; i < onKeyPressEvents.length; i++) {
            (onKeyPressEvents[i])(event);
        }
    }
    
    function callResizeFunctions(event) {
        for (var i = 0; i < onResizeEvents.length; i++) {
            (onResizeEvents[i])(event);
        }
    }

    function callClickFunctions(event) {
        for (var i = 0; i < onClickEvents.length; i++) {
            (onClickEvents[i])(event);
        }
    }

    function callScrollFunctions(event) {
        for (var i = 0; i < onScrollEvents.length; i++) {
            (onScrollEvents[i])(event);
        }
    }

    // public functions
    function addOnKeyPressFunction(func) {
        onKeyPressEvents.push(func)
    }
    
    function addOnResizeFunction(func) {
        onResizeEvents.push(func)
    }

    function addOnClickFunction(func) {
        onClickEvents.push(func);
    }

    function addOnScrollFunction(func) {
        onScrollEvents.push(func);
    }

    // return public pointers to private variables & functions
    return {
        addOnKeyPressFunction: addOnKeyPressFunction,
        addOnResizeFunction: addOnResizeFunction,
        addOnClickFunction: addOnClickFunction,
        addOnScrollFunction: addOnScrollFunction
    };

})();