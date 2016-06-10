/**
 * Created by devinm on 6/10/16.
 */
var inspectorView = (function () {

    // cache DOM
    var allInspectorsWrapper = document.querySelector("div.all-inspector-views-wrapper");
    var mobileBackgroundOverlay = allInspectorsWrapper.querySelector("div.mobile-inspector-background-overlay");
    var mobileInspector = allInspectorsWrapper.querySelector("div.inspector-view-wrapper");
    var exitMobileInspectorIcon = mobileInspector.querySelector("span.close-inspector-icon");
    var desktopBackgroundOveraly = allInspectorsWrapper.querySelector("div.desktop-inspector-background-overlay");
    var desktopInspector = allInspectorsWrapper.querySelector("div.food-modal-container");
    var exitDesktopInspectorIcon = desktopInspector.querySelector("span.exit-food-modal-icon");

    // bind events
    exitMobileInspectorIcon.addEventListener('click', _hideInspectorView);
    mobileBackgroundOverlay.addEventListener('click', _hideInspectorView);
    exitDesktopInspectorIcon.addEventListener('click', _hideInspectorView);
    desktopBackgroundOveraly.addEventListener('click', _hideInspectorView);

    // private variables

    // public variables

    // private functions
    function _showInspectorView(dataDict) {
        allInspectorsWrapper.style.display = "block";
        /* populate inspector view with info from dataDict */
        console.log(dataDict);
    }

    function _hideInspectorView() {
        allInspectorsWrapper.style.display = "none";
    }

    // public functions

    // return public pointers to private variables & functions
    return {
        showInspectorView: _showInspectorView
    };

})();