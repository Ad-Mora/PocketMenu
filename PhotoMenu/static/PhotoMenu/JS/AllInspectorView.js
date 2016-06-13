/**
 * Created by devinm on 6/10/16.
 */

var allInspectorView = (function () {

    // cache DOM
    var allInspectorsWrapper = document.querySelector("div.all-inspector-views-wrapper");
    var interestActionSign = allInspectorsWrapper.querySelector("div.interest-action-positioner");
    var mobileBackgroundOverlay = allInspectorsWrapper.querySelector("div.mobile-inspector-background-overlay");
    var desktopBackgroundOverlay = allInspectorsWrapper.querySelector("div.desktop-inspector-background-overlay");

    // bind events
    mobileBackgroundOverlay.addEventListener('click', hideInspectorView);
    desktopBackgroundOverlay.addEventListener('click', hideInspectorView);

    // private variables
    var currentFood;
    var foodInterestStates = {true:"like-food", false:"not-like-food"};
    var inspectorIsOpen = false;
    var onKeyPress= keyPressFunction();

    // public variables

    // private functions-------------------------------------------------------------------------
    function _populateMobileAndDesktopInspectorWithFood(food) {
        // prevent balloon from showing up for no reason
        interestActionSign.style.display = "none";

        currentFood = food;
        var foodName = currentFood.getAttribute("data-food-name");
        var foodDetails = currentFood.getAttribute("data-food-details");
        var foodImageLocaction = currentFood.getAttribute("data-food-image-location");
        var foodPrice = currentFood.getAttribute("data-food-price");
        var foodIsLiked = currentFood.getAttribute("data-food-is-liked");
        var listItemNumber = currentFood.getAttribute("data-list-item-number");

        console.log(listItemNumber);                      // UNCOMMENT TO DEBUG!!
        _setInterestIconBasedOnCurrentInterest();
    }

    function _setInterestIconBasedOnCurrentInterest() {
        var currentInterestInFood = currentFood.getAttribute("data-food-is-liked") == "true";
        mobileInspectorView.interestIcon.className = mobileInspectorView.interestIcon.className.replace(
                                            " " + foodInterestStates[ !currentInterestInFood ],
                                            " " + foodInterestStates[ currentInterestInFood ]
                                        );
        desktopInspectorView.interestIcon.className = desktopInspectorView.interestIcon.className.replace(
                                            " " + foodInterestStates[ !currentInterestInFood ],
                                            " " + foodInterestStates[ currentInterestInFood ]
                                        );
    }

    function _displayInterestActionSign(foodIsLiked) {
        var interestMessageDict = {
            true: "Item saved to \"Favorites\".",
            false: "Item removed from \"Favorites\"."
        }

        var oldOne = interestActionSign;
        interestActionSign = oldOne.cloneNode(true);
        var interestActionMessage = interestActionSign.querySelector("p.interest-action-taken");
        interestActionMessage.innerHTML = interestMessageDict[foodIsLiked];
        oldOne.parentNode.replaceChild(interestActionSign, oldOne);
        interestActionSign.style.display = "block";
    }
    
    function keyPressFunction() {
        var ESCAPE_KEY_CODE = 27;
        var RIGHT_ARROW_KEY_CODE = 39;
        var LEFT_ARROW_KEY_CODE = 37;

        documentModule.addOnKeyPressFunction(function(event){
            if (inspectorIsOpen) {
                if (event.keyCode == ESCAPE_KEY_CODE) {
                    hideInspectorView(event);
                }
                else if (event.keyCode == RIGHT_ARROW_KEY_CODE) {
                    showNextFood();
                }
                else if (event.keyCode == LEFT_ARROW_KEY_CODE) {
                    showPreviousFood();
                }
            }
        });
    }

    // public functions-------------------------------------------------------------------------
    function showInspectorView(clickedFood) {
        _populateMobileAndDesktopInspectorWithFood(clickedFood);
        allInspectorsWrapper.style.display = "block";
        inspectorIsOpen = true;
    }

    function hideInspectorView(event) {
        allInspectorsWrapper.style.display = "none";
        inspectorIsOpen = false;
    }

    function showNextFood(event) {
        var nextFood = foodEntry.getNextFoodItem(currentFood);
        _populateMobileAndDesktopInspectorWithFood(nextFood);
    }

    function showPreviousFood(event) {
        var previousFood = foodEntry.getPreviousFoodItem(currentFood);
        _populateMobileAndDesktopInspectorWithFood(previousFood);
    }

    function toggleInterestInFood(event) {
        var newInterestInFood = ! (currentFood.getAttribute("data-food-is-liked") == "true");
        currentFood.setAttribute("data-food-is-liked", newInterestInFood);
        _setInterestIconBasedOnCurrentInterest();
         _displayInterestActionSign(newInterestInFood);
    }

    // return public pointers to private variables & functions------------------------------------
    return {
        showInspectorView: showInspectorView,
        hideInspectorView: hideInspectorView,
        showNextFood: showNextFood,
        showPreviousFood: showPreviousFood,
        toggleInterestInFood: toggleInterestInFood
    };

})();


var mobileInspectorView = (function () {

    // cache DOM
    var listOfMobileInspectors = document.querySelector("ul.list-of-mobile-inspectors");
    var mobileInspector = listOfMobileInspectors.querySelector("li.mobile-inspector-view-wrapper");
    var rightMobilePictureIcon = mobileInspector.querySelector("span.inspector.right-arrow");
    var leftMobilePictureIcon = mobileInspector.querySelector("span.inspector.left-arrow");
    var mobileInterestIcon = mobileInspector.querySelector("span.inspector.interested-in-food-icon");
    var mobileFoodImage = mobileInspector.querySelector("img.inspector.food-image");
    var exitMobileInspectorIcon = mobileInspector.querySelector("span.close-inspector-icon");


    // bind events
    // swipeGesture.addSwipeListener('left', mobileFoodImage, allInspectorView.showNextFood); // swiping left = clicking right
    swipeGesture.addSwipeAndDragListener('left', mobileFoodImage, _dragImage, allInspectorView.showNextFood);
    // swipeGesture.addSwipeListener('right', mobileFoodImage, allInspectorView.showPreviousFood); // swiping right = clicking left
    swipeGesture.addSwipeAndDragListener('right', mobileFoodImage, _dragImage, allInspectorView.showPreviousFood);
    rightMobilePictureIcon.addEventListener('click', allInspectorView.showNextFood);
    leftMobilePictureIcon.addEventListener('click', allInspectorView.showPreviousFood);
    mobileInterestIcon.addEventListener('click', allInspectorView.toggleInterestInFood);
    exitMobileInspectorIcon.addEventListener('click', allInspectorView.hideInspectorView);

    // private variables
    var leftInspectorView = mobileInspector.cloneNode(true);
    var rightInspectorView = mobileInspector.cloneNode(true);
    var initializeInspectorViewList = _addLeftAndRightInspectorView();
    var resizeInspectorView = documentModule.addOnResizeFunction(_changeInspectorViewDimensionsOnResize);

    // public variables

    // private functions
    function _changeInspectorViewDimensionsOnResize(event) {
        listOfMobileInspectors.style.width = 3 * window.innerWidth + "px";
        listOfMobileInspectors.style.transform = "translate3d(-" + window.innerWidth + "px,0px,0px)";

        leftInspectorView.style.width = window.innerWidth + "px";
        mobileInspector.style.width = window.innerWidth + "px";
        rightInspectorView.style.width = window.innerWidth + "px";
    }

    function _addLeftAndRightInspectorView() {
        // add leftInspectorView
        listOfMobileInspectors.insertBefore(leftInspectorView, mobileInspector);

        // add rightInspectorView
        listOfMobileInspectors.appendChild(rightInspectorView);
    }
    
    function _dragImage(swipeGestureData) {
        console.log("this works");
    }
    
    // public functions

    // return public pointers to private variables & functions
    return {
        interestIcon: mobileInterestIcon
    };

})();



var desktopInspectorView = (function () {

    // cache DOM
    var desktopInspector = document.querySelector("div.food-modal-container");
    var rightDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-right-arrow-icon");
    var leftDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-left-arrow-icon");
    var desktopInterestIcon = desktopInspector.querySelector("span.food-interest-icon");
    var exitDesktopInspectorIcon = desktopInspector.querySelector("span.exit-food-modal-icon");

    // bind events
    rightDesktopPictureIcon.addEventListener('click', allInspectorView.showNextFood);
    leftDesktopPictureIcon.addEventListener('click', allInspectorView.showPreviousFood);
    desktopInterestIcon.addEventListener('click', allInspectorView.toggleInterestInFood);
    exitDesktopInspectorIcon.addEventListener('click', allInspectorView.hideInspectorView);

    // variables

    // functions

    // return public pointers to private variables & functions
    return {
        interestIcon: desktopInterestIcon
    };

})();
