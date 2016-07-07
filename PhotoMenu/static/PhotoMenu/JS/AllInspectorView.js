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
        mobileInspectorView.initializeMobileViewWithFood(clickedFood);
        desktopInspectorView.initializeDesktopViewWithFood(clickedFood);

        currentFood = clickedFood;
        inspectorIsOpen = true;

        // prevent balloon from showing up for no reason
        interestActionSign.style.display = "none";

        allInspectorsWrapper.style.display = "block";
    }

    function hideInspectorView(event) {
        allInspectorsWrapper.style.display = "none";
        inspectorIsOpen = false;
    }

    function showNextFood(event) {
        var nextFood = foodEntry.getNextFoodItem(currentFood);
        showInspectorView(nextFood);
    }

    function showPreviousFood(event) {
        var previousFood = foodEntry.getPreviousFoodItem(currentFood);
        showInspectorView(previousFood);
    }

    function toggleInterestInFood(event) {
        var newInterestInFood = ! (currentFood.getAttribute("data-food-is-liked") == "true");
        currentFood.setAttribute("data-food-is-liked", newInterestInFood);
        setInterestIconBasedOnCurrentInterest(desktopInspectorView.interestIcon, currentFood);
        setInterestIconBasedOnCurrentInterest(mobileInspectorView.interestIcon, currentFood);
        foodFavoriting.saveNewFoodInterest(currentFood, newInterestInFood);
        _displayInterestActionSign(newInterestInFood);
    }

    function setInterestIconBasedOnCurrentInterest(interestIcon, foodElement) {
        var interestInFood = foodElement.getAttribute("data-food-is-liked") == "true";
        interestIcon.className = interestIcon.className.replace(
                                            " " + foodInterestStates[ !interestInFood ],
                                            " " + foodInterestStates[ interestInFood ]
                                        );
    }

    // return public pointers to private variables & functions------------------------------------
    return {
        showInspectorView: showInspectorView,
        hideInspectorView: hideInspectorView,
        showNextFood: showNextFood,
        showPreviousFood: showPreviousFood,
        toggleInterestInFood: toggleInterestInFood,
        setInterestIconBasedOnCurrentInterest: setInterestIconBasedOnCurrentInterest
    };

})();


var mobileInspectorView = (function () {

    // cache DOM
    var listOfMobileInspectors = document.querySelector("ul.list-of-mobile-inspectors");
    var mobileInspector = listOfMobileInspectors.querySelector("li.mobile-inspector-view-wrapper");
    var leftInspectorView = mobileInspector.cloneNode(true);
    var rightInspectorView = mobileInspector.cloneNode(true);
    var rightMobilePictureIcon = mobileInspector.querySelector("span.right-arrow");
    var leftMobilePictureIcon = mobileInspector.querySelector("span.left-arrow");
    var mobileInterestIcon = mobileInspector.querySelector("span.interested-in-food-icon");
    var mobileFoodImage = mobileInspector.querySelector("img.food-image");
    var exitMobileInspectorIcon = mobileInspector.querySelector("span.close-inspector-icon");
    var restaurantLinkIcon = mobileInspector.querySelector("a.restaurant-page-link");

    // bind events
    swipeGesture.addSwipeAndDragListener( mobileFoodImage, _whileDraggingImage, _onDragEnd);
    rightMobilePictureIcon.addEventListener('click', allInspectorView.showNextFood);
    leftMobilePictureIcon.addEventListener('click', allInspectorView.showPreviousFood);
    mobileInterestIcon.addEventListener('click', allInspectorView.toggleInterestInFood);
    exitMobileInspectorIcon.addEventListener('click', allInspectorView.hideInspectorView);

    // private variables
    var RIGHT_POSITION = 0;
    var CENTER_POSITION = -1 * window.innerWidth;
    var LEFT_POSITION = -2 * window.innerWidth;
    var previousFood;
    var centerFood;
    var nextFood;
    var GLIDING_ANIMATION_CLASS = "enable-list-gliding";

    var initializeInspectorViewList = _addLeftAndRightInspectorView();
    var intializeInspectorViewDimensions = _changeInspectorViewDimensionsOnResize();
    var enableInspectorViewResize= documentModule.addOnResizeFunction(_changeInspectorViewDimensionsOnResize);

    // public variables


    // private functions
    function _changeInspectorViewDimensionsOnResize(event) {
        listOfMobileInspectors.style.width = 3 * window.innerWidth + "px";
        listOfMobileInspectors.style.webkitTransform = "translate3d(-" + window.innerWidth + "px,0px,0px)";
        listOfMobileInspectors.style.mozTransform = "translate3d(-" + window.innerWidth + "px,0px,0px)";
        listOfMobileInspectors.style.transform = "translate3d(-" + window.innerWidth + "px,0px,0px)";

        leftInspectorView.style.width = window.innerWidth + "px";
        mobileInspector.style.width = window.innerWidth + "px";
        rightInspectorView.style.width = window.innerWidth + "px";

        RIGHT_POSITION = 0;
        CENTER_POSITION = -1 * window.innerWidth;
        LEFT_POSITION = -2 * window.innerWidth;
    }

    function _addLeftAndRightInspectorView() {
        // add leftInspectorView
        listOfMobileInspectors.insertBefore(leftInspectorView, mobileInspector);

        // add rightInspectorView
        listOfMobileInspectors.appendChild(rightInspectorView);
    }
    
    function _whileDraggingImage(direction, deltaX, deltaY) {
        listOfMobileInspectors.style.webkitTransform = "translate3d("+ (-1 * (window.innerWidth - deltaX)) +"px,0px,0px)";
        listOfMobileInspectors.style.mozTransform = "translate3d("+ (-1 * (window.innerWidth - deltaX)) +"px,0px,0px)";
        listOfMobileInspectors.style.transform = "translate3d("+ (-1 * (window.innerWidth - deltaX)) +"px,0px,0px)";
    }

    function _onDragEnd(direction, deltaX, deltaY) {
        var MIN_SWIPE_DISTANCE = window.innerWidth * 0.1;
        var GLIDE_TO_PLACE_DURATION = 300;
        // add gliding animation class here
        listOfMobileInspectors.classList.add(GLIDING_ANIMATION_CLASS);
        
        if (direction == 'left' && Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
            listOfMobileInspectors.style.webkitTransform = "translate3d("+ LEFT_POSITION +"px,0px,0px)";
            listOfMobileInspectors.style.mozTransform = "translate3d("+ LEFT_POSITION +"px,0px,0px)";
            listOfMobileInspectors.style.transform = "translate3d("+ LEFT_POSITION +"px,0px,0px)";
            setTimeout(function () {
                // remove gliding animation class here
                listOfMobileInspectors.classList.remove(GLIDING_ANIMATION_CLASS);
                allInspectorView.showNextFood(null);
            }, GLIDE_TO_PLACE_DURATION);

        }
        else if (direction == 'right' && Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
            listOfMobileInspectors.style.webkitTransform = "translate3d("+ RIGHT_POSITION +"px,0px,0px)";
            listOfMobileInspectors.style.mozTransform = "translate3d("+ RIGHT_POSITION +"px,0px,0px)";
            listOfMobileInspectors.style.transform = "translate3d("+ RIGHT_POSITION +"px,0px,0px)";
            setTimeout(function () {
                // remove gliding animation class here
                listOfMobileInspectors.classList.remove(GLIDING_ANIMATION_CLASS);
                allInspectorView.showPreviousFood(null);
            }, GLIDE_TO_PLACE_DURATION);

        }
        else {
            listOfMobileInspectors.style.mozTransform = "translate3d("+ CENTER_POSITION +"px,0px,0px)";
            listOfMobileInspectors.style.webkitTransform = "translate3d("+ CENTER_POSITION +"px,0px,0px)";
            listOfMobileInspectors.style.transform = "translate3d("+ CENTER_POSITION +"px,0px,0px)";
            setTimeout(function () {
                // remove gliding animation class here
                listOfMobileInspectors.classList.remove(GLIDING_ANIMATION_CLASS);
            }, GLIDE_TO_PLACE_DURATION);
        }
    }

    function _populateMobileViewWithFoodData(mobileView, foodElement) { /*--------------------------------STILL NEED TO FINISH---------------------*/
        var foodNameElement = mobileView.querySelector("h3.food-name");
        var foodDetailsElement = mobileView.querySelector("p.food-description");
        var foodImageElement = mobileView.querySelector("img.food-image");
        var foodPriceElement = mobileView.querySelector("p.food-price");
        var categoryNameElement = mobileView.querySelector("h4.food-category-name");
        var categoryDescriptionElement = mobileView.querySelector("p.food-category-description");
        var restaurantHeaderLinkElement = mobileView.querySelector("h2.inspector.restaurant-name a");


        var foodName = foodElement.getAttribute("data-food-name");
        foodNameElement.innerHTML = foodName;
        foodImageElement.alt = foodName;

        var foodDetails = foodElement.getAttribute("data-food-details");
        foodDetailsElement.innerHTML = foodDetails;

        var foodImageLocation = foodElement.getAttribute("data-food-image-location");
        foodImageElement.src = foodImageLocation;

        var foodPrice = foodElement.getAttribute("data-food-price");
        foodPriceElement.innerHTML = foodPrice;

        var categoryName = foodElement.getAttribute("data-category-name");
        categoryNameElement.innerHTML = categoryName;

        var categoryDescription = foodElement.getAttribute("data-category-description");
        categoryDescriptionElement.innerHTML = categoryDescription;

        var restaurantName = foodElement.getAttribute("data-restaurant-name");
        restaurantHeaderLinkElement.innerHTML = restaurantName;

        var restaurantLink = foodElement.getAttribute("data-restaurant-link");
        restaurantHeaderLinkElement.href = restaurantLink;
        restaurantLinkIcon.href = restaurantLink;

        var interestIconForView = mobileView.querySelector("span.inspector.interested-in-food-icon");
        allInspectorView.setInterestIconBasedOnCurrentInterest(interestIconForView, foodElement);
    }

    // public functions
    function initializeMobileViewWithFood(foodElement) {
        // update module's variables
        previousFood = foodEntry.getPreviousFoodItem(foodElement);
        centerFood = foodElement;
        nextFood = foodEntry.getNextFoodItem(foodElement);

        // center the 3 InspectorViews
        listOfMobileInspectors.style.webkitTransform = "translate3d("+ CENTER_POSITION +"px,0px,0px)";
        listOfMobileInspectors.style.mozTransform = "translate3d("+ CENTER_POSITION +"px,0px,0px)";
        listOfMobileInspectors.style.transform = "translate3d("+ CENTER_POSITION +"px,0px,0px)";

        // update the 3 InspectorViews with their relevant info
        _populateMobileViewWithFoodData(leftInspectorView, previousFood);
        _populateMobileViewWithFoodData(mobileInspector, centerFood);
        _populateMobileViewWithFoodData(rightInspectorView, nextFood);
    }

    // return public pointers to private variables & functions
    return {
        interestIcon: mobileInterestIcon,
        initializeMobileViewWithFood: initializeMobileViewWithFood
    };

})();



var desktopInspectorView = (function () {

    // cache DOM
    var desktopInspector = document.querySelector("div.food-modal-container");
    var rightDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-right-arrow-icon");
    var leftDesktopPictureIcon = desktopInspector.querySelector("span.food-modal-left-arrow-icon");
    var desktopInterestIcon = desktopInspector.querySelector("span.food-interest-icon");
    var exitDesktopInspectorIcon = desktopInspector.querySelector("span.exit-food-modal-icon");
    var foodImageElement = desktopInspector.querySelector("img.food-modal-image");
    var restaurantHeaderLinkElement = desktopInspector.querySelector("h3.food-modal-restaurant-name a");
    var foodNameElement = desktopInspector.querySelector("h1.food-modal-food-name");
    var foodDetailsElement = desktopInspector.querySelector("p.food-modal-food-description");
    var categoryNameElement = desktopInspector.querySelector("h5.food-modal-category-name");
    var categoryDescriptionElement = desktopInspector.querySelector("p.food-modal-category-details");
    var foodPriceElement = desktopInspector.querySelector("span.food-modal-food-price");

    // bind events
    rightDesktopPictureIcon.addEventListener('click', allInspectorView.showNextFood);
    leftDesktopPictureIcon.addEventListener('click', allInspectorView.showPreviousFood);
    desktopInterestIcon.addEventListener('click', allInspectorView.toggleInterestInFood);
    exitDesktopInspectorIcon.addEventListener('click', allInspectorView.hideInspectorView);

    // variables

    // public functions
    function initializeDesktopViewWithFood(foodElement) {
        var foodName = foodElement.getAttribute("data-food-name");
        foodNameElement.innerHTML = foodName;
        foodImageElement.alt = foodName;

        var foodDetails = foodElement.getAttribute("data-food-details");
        foodDetailsElement.innerHTML = foodDetails;

        var foodImageLocation = foodElement.getAttribute("data-food-image-location");
        foodImageElement.src = foodImageLocation;

        var foodPrice = foodElement.getAttribute("data-food-price");
        foodPriceElement.innerHTML = foodPrice;

        var categoryName = foodElement.getAttribute("data-category-name");
        categoryNameElement.innerHTML = categoryName;

        var categoryDescription = foodElement.getAttribute("data-category-description");
        categoryDescriptionElement.innerHTML = categoryDescription;

        var restaurantName = foodElement.getAttribute("data-restaurant-name");
        restaurantHeaderLinkElement.innerHTML = restaurantName;

        var restaurantLink = foodElement.getAttribute("data-restaurant-link");
        restaurantHeaderLinkElement.href = restaurantLink;

        var foodIsLiked = foodElement.getAttribute("data-food-is-liked");
        var listItemNumber = foodElement.getAttribute("data-list-item-number");
        allInspectorView.setInterestIconBasedOnCurrentInterest(desktopInterestIcon, foodElement);

        // console.log(listItemNumber);                      // UNCOMMENT TO DEBUG!!
    }

    // return public pointers to private variables & functions
    return {
        interestIcon: desktopInterestIcon,
        initializeDesktopViewWithFood: initializeDesktopViewWithFood
    };

})();
