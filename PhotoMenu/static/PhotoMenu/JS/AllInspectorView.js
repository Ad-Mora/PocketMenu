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
    var mobileInterestIcon = mobileInspector.querySelector("span.inspector.interested-in-food-icon");
    var mobileFoodImage = mobileInspector.querySelector("img.inspector.food-image");
        // desktop
    var desktopBackgroundOveraly = allInspectorsWrapper.querySelector("div.desktop-inspector-background-overlay");
    var desktopInspector = allInspectorsWrapper.querySelector("div.food-modal-container");
    var exitDesktopInspectorIcon = desktopInspector.querySelector("span.exit-food-modal-icon");
    var rightDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-right-arrow-icon");
    var leftDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-left-arrow-icon");
    var desktopInterestIcon = desktopInspector.querySelector("span.food-interest-icon");
        // other
    var interestActionSign = allInspectorsWrapper.querySelector("div.interest-action-positioner");

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
        // other



    // private variables
    var currentFood;
    var foodInterestStates = {true:"like-food", false:"not-like-food"};
    var inspectorIsOpen = false;
    var onKeyPress= keyPressFunction();

    // public variables

    // private functions
    function _hideInspectorView(event) {
        allInspectorsWrapper.style.display = "none";
        inspectorIsOpen = false;
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
    
    function _toggleInterestInFood() {
        var newInterestInFood = ! (currentFood.getAttribute("data-food-is-liked") == "true");
        currentFood.setAttribute("data-food-is-liked", newInterestInFood);
        _setInterestIconBasedOnCurrentInterest();
         _displayInterestActionSign(newInterestInFood);
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
                    _hideInspectorView(event);
                }
                else if (event.keyCode == RIGHT_ARROW_KEY_CODE) {
                    _showNextFood();
                }
                else if (event.keyCode == LEFT_ARROW_KEY_CODE) {
                    _showPreviousFood();
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

    // return public pointers to private variables & functions
    return {
        showInspectorView: showInspectorView
    };

})();

