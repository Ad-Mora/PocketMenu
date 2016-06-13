/**
 * Created by devinm on 6/12/16.
 */
var documentModule = (function(){
    // cache DOM

    // bind events
    document.addEventListener("keydown", _callKeypressFunctions);

    // private variables
    var onKeyPressEvents = [];

    // public variables

    // private functions
    function _callKeypressFunctions() {
        for (var i = 0; i < onKeyPressEvents.length; i++) {
            (onKeyPressEvents[i])(event);
        }
    }

    // public functions
    function addOnKeyPressFunction(func) {
        onKeyPressEvents.push(func)
    }

    // return public pointers to private variables & functions
    return {
        addOnKeyPressFunction: addOnKeyPressFunction
    };

})();