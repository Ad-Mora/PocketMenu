/**
 * Created by devinm on 6/10/16.
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



var inspectorView = (function () {

    // cache DOM
        // mobile
    var allInspectorsWrapper = document.querySelector("div.all-inspector-views-wrapper");
    var mobileBackgroundOverlay = allInspectorsWrapper.querySelector("div.mobile-inspector-background-overlay");
    var mobileInspector = allInspectorsWrapper.querySelector("div.inspector-view-wrapper");
    var exitMobileInspectorIcon = mobileInspector.querySelector("span.close-inspector-icon");
    var rightMobilePictureIcon = mobileInspector.querySelector("span.inspector.right-arrow");
    var leftMobilePictureIcon = mobileInspector.querySelector("span.inspector.left-arrow");
    var mobileInterestIcon = mobileInspector.querySelector("span.inspector.interested-in-food-icon");
    var mobileFoodImage = mobileInspector.querySelector("img.inspector.food-image");
        // desktop
    var desktopBackgroundOveraly = allInspectorsWrapper.querySelector("div.desktop-inspector-background-overlay");
    var desktopInspector = allInspectorsWrapper.querySelector("div.food-modal-container");
    var exitDesktopInspectorIcon = desktopInspector.querySelector("span.exit-food-modal-icon");
    var rightDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-right-arrow-icon");
    var leftDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-left-arrow-icon");
    var desktopInterestIcon = desktopInspector.querySelector("span.food-interest-icon");

    // bind events
        // mobile
    swipeGesture.addSwipeListener('left', mobileFoodImage, _showNextFood); // swiping left = clicking right
    swipeGesture.addSwipeListener('right', mobileFoodImage, _showPreviousFood); // swiping right = clicking left
    exitMobileInspectorIcon.addEventListener('click', _hideInspectorView);
    mobileBackgroundOverlay.addEventListener('click', _hideInspectorView);
    rightMobilePictureIcon.addEventListener('click', _showNextFood);
    leftMobilePictureIcon.addEventListener('click', _showPreviousFood);
    mobileInterestIcon.addEventListener('click', _toggleInterestInFood);
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
        mobileInterestIcon.className = mobileInterestIcon.className.replace(
                                            " " + foodInterestStates[ !currentInterestInFood ],
                                            " " + foodInterestStates[ currentInterestInFood ]
                                        );
        desktopInterestIcon.className = desktopInterestIcon.className.replace(
                                            " " + foodInterestStates[ !currentInterestInFood ],
                                            " " + foodInterestStates[ currentInterestInFood ]
                                        );
        console.log(mobileInterestIcon.className + "    " + desktopInterestIcon.className);
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


