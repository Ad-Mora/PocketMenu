/**
 * Created by devinm on 6/10/16.
 */

var allInspectorView = (function () {

    // cache DOM
    var allInspectorsWrapper = document.querySelector("div.all-inspector-views-wrapper");
    var interestActionSign = allInspectorsWrapper.querySelector("div.interest-action-positioner");
        // mobile
    var mobileBackgroundOverlay = allInspectorsWrapper.querySelector("div.mobile-inspector-background-overlay");
    var exitMobileInspectorIcon = allInspectorsWrapper.querySelector("span.close-inspector-icon");
        // desktop
    var desktopBackgroundOverlay = allInspectorsWrapper.querySelector("div.desktop-inspector-background-overlay");
    var exitDesktopInspectorIcon = allInspectorsWrapper.querySelector("span.exit-food-modal-icon");

    // bind events
        // mobile
    exitMobileInspectorIcon.addEventListener('click', hideInspectorView);
    mobileBackgroundOverlay.addEventListener('click', hideInspectorView);
        // desktop
    exitDesktopInspectorIcon.addEventListener('click', hideInspectorView);
    desktopBackgroundOverlay.addEventListener('click', hideInspectorView);

    // private variables
    var currentFood;
    var foodInterestStates = {true:"like-food", false:"not-like-food"};
    var inspectorIsOpen = false;
    var onKeyPress= keyPressFunction();

    // public variables

    // private functions
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
        // mobileInterestIcon.className = mobileInterestIcon.className.replace(
        //                                     " " + foodInterestStates[ !currentInterestInFood ],
        //                                     " " + foodInterestStates[ currentInterestInFood ]
        //                                 );
        // desktopInterestIcon.className = desktopInterestIcon.className.replace(
        //                                     " " + foodInterestStates[ !currentInterestInFood ],
        //                                     " " + foodInterestStates[ currentInterestInFood ]
        //                                 );
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

    // public functions
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

    // return public pointers to private variables & functions
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
    var mobileInspector = document.querySelector("div.mobile-inspector-view-wrapper");
    var rightMobilePictureIcon = mobileInspector.querySelector("span.inspector.right-arrow");
    var leftMobilePictureIcon = mobileInspector.querySelector("span.inspector.left-arrow");
    var mobileInterestIcon = mobileInspector.querySelector("span.inspector.interested-in-food-icon");
    var mobileFoodImage = mobileInspector.querySelector("img.inspector.food-image");

    // bind events
    swipeGesture.addSwipeListener('left', mobileFoodImage, allInspectorView.showNextFood); // swiping left = clicking right
    swipeGesture.addSwipeListener('right', mobileFoodImage, allInspectorView.showPreviousFood); // swiping right = clicking left
    rightMobilePictureIcon.addEventListener('click', allInspectorView.showNextFood);
    leftMobilePictureIcon.addEventListener('click', allInspectorView.showPreviousFood);
    mobileInterestIcon.addEventListener('click', allInspectorView.toggleInterestInFood);

    // variables

    // functions

    // return public pointers to private variables & functions
    return {

    };

})();



var desktopInspectorView = (function () {

    // cache DOM
    var desktopInspector = document.querySelector("div.food-modal-container");
    var rightDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-right-arrow-icon");
    var leftDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-left-arrow-icon");
    var desktopInterestIcon = desktopInspector.querySelector("span.food-interest-icon");

    // bind events
    rightDesktopPictureIcon.addEventListener('click', allInspectorView.showNextFood);
    leftDesktopPictureIcon.addEventListener('click', allInspectorView.showPreviousFood);
    desktopInterestIcon.addEventListener('click', allInspectorView.toggleInterestInFood);

    // variables

    // functions

    // return public pointers to private variables & functions
    return {

    };

})();
