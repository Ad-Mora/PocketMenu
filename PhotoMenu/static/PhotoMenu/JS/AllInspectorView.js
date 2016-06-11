/**
 * Created by devinm on 6/10/16.
 */
var inspectorView = (function () {

    // cache DOM
        // mobile
    var allInspectorsWrapper = document.querySelector("div.all-inspector-views-wrapper");
    var mobileBackgroundOverlay = allInspectorsWrapper.querySelector("div.mobile-inspector-background-overlay");
    var mobileInspector = allInspectorsWrapper.querySelector("div.inspector-view-wrapper");
    var exitMobileInspectorIcon = mobileInspector.querySelector("span.close-inspector-icon");
    var rightMobilePictureIcon = mobileInspector.querySelector("span.inspector.right-arrow");
    var leftMobilePictureIcon = mobileInspector.querySelector("span.inspector.left-arrow");
    var mobileInterstIcon = mobileInspector.querySelector("span.inspector.interested-in-food-icon");
        // desktop
    var desktopBackgroundOveraly = allInspectorsWrapper.querySelector("div.desktop-inspector-background-overlay");
    var desktopInspector = allInspectorsWrapper.querySelector("div.food-modal-container");
    var exitDesktopInspectorIcon = desktopInspector.querySelector("span.exit-food-modal-icon");
    var rightDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-right-arrow-icon");
    var leftDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-left-arrow-icon");
    var desktopInterestIcon = desktopInspector.querySelector("span.food-interest-icon");

    // bind events
        // mobile
    exitMobileInspectorIcon.addEventListener('click', _hideInspectorView);
    mobileBackgroundOverlay.addEventListener('click', _hideInspectorView);
    rightMobilePictureIcon.addEventListener('click', _showNextFood);
    leftMobilePictureIcon.addEventListener('click', _showPreviousFood);
    mobileInterstIcon.addEventListener('click', _toggleInterestInFood);
        // desktop
    exitDesktopInspectorIcon.addEventListener('click', _hideInspectorView);
    desktopBackgroundOveraly.addEventListener('click', _hideInspectorView);
    rightDesktopPictureIcon.addEventListener('click', _showNextFood);
    leftDesktopPictureIcon.addEventListener('click', _showPreviousFood);
    desktopInterestIcon.addEventListener('click', _toggleInterestInFood);

    // private variables
    var currentFood;
    var foodInterestStates = {true:"like-food", false:"not-like-food"};

    // public variables

    // private functions
    function _hideInspectorView(event) {
        allInspectorsWrapper.style.display = "none";
    }

    function _showNextFood() {
        var nextFood = foodEntry.getNextFoodItem(currentFood);
        _populateMobileAndDesktopInspectorWithFood(nextFood);
    }

    function _showPreviousFood() {
        var previousFood = foodEntry.getPreviousFoodItem(currentFood);
        _populateMobileAndDesktopInspectorWithFood(previousFood);
    }

    function _populateMobileAndDesktopInspectorWithFood(food) {
        currentFood = food;
        var foodName = currentFood.getAttribute("data-food-name");
        var foodDetails = currentFood.getAttribute("data-food-details");
        var foodImageLocaction = currentFood.getAttribute("data-food-image-location");
        var foodPrice = currentFood.getAttribute("data-food-price");
        var foodIsLiked = currentFood.getAttribute("data-food-is-liked");
        var listItemNumber = currentFood.getAttribute("data-list-item-number");

        console.log(listItemNumber);
        _setInterestIconBasedOnCurrentInterest();
    }
    
    function _toggleInterestInFood() {
        var newInterestInFood = ! (currentFood.getAttribute("data-food-is-liked") == "true");
        currentFood.setAttribute("data-food-is-liked", newInterestInFood);
        _setInterestIconBasedOnCurrentInterest();
    }

    function _setInterestIconBasedOnCurrentInterest() {
        var currentInterestInFood = currentFood.getAttribute("data-food-is-liked") == "true";
        mobileInterstIcon.className = mobileInterstIcon.className.replace(
                                            " " + foodInterestStates[ !currentInterestInFood ],
                                            " " + foodInterestStates[ currentInterestInFood ]
                                        );
        desktopInterestIcon.className = desktopInterestIcon.className.replace(
                                            " " + foodInterestStates[ !currentInterestInFood ],
                                            " " + foodInterestStates[ currentInterestInFood ]
                                        );
        console.log(mobileInterstIcon.className + "    " + desktopInterestIcon.className);
    }
    
    // public functions
    function showInspectorView(clickedFood) {
        _populateMobileAndDesktopInspectorWithFood(clickedFood);
        allInspectorsWrapper.style.display = "block";
    }

    // return public pointers to private variables & functions
    return {
        showInspectorView: showInspectorView
    };

})();