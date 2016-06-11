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
    var rightPictureIcon = desktopInspector.querySelector("span.food-modal-right-arrow-icon");
    var leftPictureIcon = desktopInspector.querySelector("span.food-modal-left-arrow-icon");

    // bind events
    exitMobileInspectorIcon.addEventListener('click', _hideInspectorView);
    mobileBackgroundOverlay.addEventListener('click', _hideInspectorView);
    exitDesktopInspectorIcon.addEventListener('click', _hideInspectorView);
    desktopBackgroundOveraly.addEventListener('click', _hideInspectorView);
    rightPictureIcon.addEventListener('click', _showNextFood);
    leftPictureIcon.addEventListener('click', _showPreviousFood);

    // private variables
    var currentFood;

    // public variables

    // private functions
    function _hideInspectorView(event) {
        allInspectorsWrapper.style.display = "none";
    }

    function _showNextFood() {
        var nextFood = foodEntry.getNextFoodItem(currentFood);
        populateMobileAndDesktopInspectorWithFood(nextFood);
    }

    function _showPreviousFood() {
        var previousFood = foodEntry.getPreviousFoodItem(currentFood);
        populateMobileAndDesktopInspectorWithFood(previousFood);
    }

    function populateMobileAndDesktopInspectorWithFood(food) {
        currentFood = food;
        var foodName = currentFood.getAttribute("data-food-name");
        var foodDetails = currentFood.getAttribute("data-food-details");
        var foodImageLocaction = currentFood.getAttribute("data-food-image-location");
        var foodPrice = currentFood.getAttribute("data-food-price");
        var foodIsLiked = currentFood.getAttribute("data-food-is-liked");
        var listItemNumber = currentFood.getAttribute("data-list-item-number");

        console.log(listItemNumber);
    }

    // public functions
    function showInspectorView(clickedFood) {
        populateMobileAndDesktopInspectorWithFood(clickedFood);
        allInspectorsWrapper.style.display = "block";
    }

    // return public pointers to private variables & functions
    return {
        showInspectorView: showInspectorView
    };

})();