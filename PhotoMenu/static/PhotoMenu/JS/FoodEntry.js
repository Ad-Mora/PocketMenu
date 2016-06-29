/**
 * Created by devinm on 6/9/16.
 */
var foodEntry = (function () {

    // cache DOM
    var listOfFoodEntryLI;

    // bind events

    // private variables
    var MAX_NUMBER_OF_SCROLL_LISTENERS = 4;
    var scrollListenersCount = 0;
    var bufferCutOffDepth = window.innerHeight;
    var intializeFoodEntries = bindAllFoodEntriesWithClickEvent();

    // public variables

    // private functions
    function loadActualImageForFoodEntry(foodEntry) {
        var actualSrc = foodEntry.getAttribute("data-food-image-location");
        var foodEntryImage = foodEntry.querySelector("img");
        var tempImage = new Image();
        tempImage.onload = function (event) {
            foodEntryImage.src = this.src;
            foodEntry.classList.remove("unloaded-image");
        }
        tempImage.src = actualSrc;
    }

    function displayInspectorViewForFood(event) {
        allInspectorView.showInspectorView(this);
    }

    function loadFoodsAboveBufferCutoff() {
        var foodsToLoad = document.querySelectorAll("li.unloaded-image");
        for (var i = 0; i < foodsToLoad.length; i++) {
            var verticalImageOffset = foodsToLoad[ i ].getBoundingClientRect().top;
            if (verticalImageOffset < bufferCutOffDepth) {
                loadActualImageForFoodEntry( foodsToLoad[ i ] );
            }
        }
    }

    // public functions
    function getNextFoodItem(foodItem) {
        var currentFoodIndex = foodItem.getAttribute("data-list-item-number");
        var nextFoodIndex = ++currentFoodIndex;
        //if its the last element in the list, return the 1st element
        if (nextFoodIndex == listOfFoodEntryLI.length) {
            return listOfFoodEntryLI[0];
        }
        return listOfFoodEntryLI[ nextFoodIndex ];
    }

    function getPreviousFoodItem(foodItem) {
        var currentFoodIndex = foodItem.getAttribute("data-list-item-number");
        var previousFoodIndex = --currentFoodIndex;
        // if its the first element in the list, return the last element
        if (previousFoodIndex == -1) {
            return listOfFoodEntryLI[ listOfFoodEntryLI.length -1 ];
        }
        return listOfFoodEntryLI[ previousFoodIndex ];
    }

    function bindAllFoodEntriesWithClickEvent() {
        // If this function ever gets called twice, need to make sure
        // listOfFoodEntryLI stays up to data
        listOfFoodEntryLI = document.querySelectorAll("li.food-entry-li");
        for (var i = 0; i < listOfFoodEntryLI.length; i++) {
            var foodEntryElement = listOfFoodEntryLI[i];
            foodEntryElement.addEventListener('click', displayInspectorViewForFood);
            foodEntryElement.setAttribute("data-list-item-number", i);
        }

        // because its possible this function can get called multiple times,
        // we should esnure that there is only 1 event listener
        document.removeEventListener('scroll', loadFoodsAboveBufferCutoff);
        document.addEventListener('scroll', loadFoodsAboveBufferCutoff);
        loadFoodsAboveBufferCutoff();


        return listOfFoodEntryLI;
    }

    // return public points to private variables and functions
    return {
        "getNextFoodItem": getNextFoodItem,
        "getPreviousFoodItem": getPreviousFoodItem,
        bindAllFoodEntriesWithClickEvent: bindAllFoodEntriesWithClickEvent
    };

})();