/**
 * Created by devinm on 6/9/16.
 */
var foodEntry = (function () {

    // cache DOM
    var listOfFoodEntryLI;

    // bind events
    var intializeFoodEntries = bindAllFoodEntriesWithClickEvent();

    // private variables
    var INITIAL_LOAD_VOLUME = 10;
    var NUM_SCROLL_LISTENERS = 4;
    var bufferCutOffDepth = window.innerHeight;


    // public variables

    // private functions
    function loadActualImageForFoodEntry(foodEntry) {
        var actualSrc = foodEntry.getAttribute("data-food-image-location");
        var foodEntryImage = foodEntry.querySelector("img.unloaded_image");
        var tempImage = new Image();
        tempImage.onload = function (event) {
            foodEntryImage.src = this.src;
            foodEntryImage.className = "";
        }
        tempImage.src = actualSrc;
    }

    function displayInspectorViewForFood(event) {
        allInspectorView.showInspectorView(this);
    }

    function listenForScrollDepthToLoad(foodEntry) {
        var foodEntryIndex = foodEntry.getAttribute("data-list-item-number");
        documentModule.addOnScrollFunction(function (event) {
            if (foodEntry.getBoundingClientRect().top <= bufferCutOffDepth) {
                var eventListenerIndex = loadActualImageForFoodEntry(foodEntry);
                
                // place a new event listener on the this + NUM_SCROLL_LISTENERS foodEntry
                if (foodEntryIndex + NUM_SCROLL_LISTENERS < listOfFoodEntryLI.length) {
                    listenForScrollDepthToLoad(listOfFoodEntryLI[ foodEntryIndex + NUM_SCROLL_LISTENERS])
                }
                
                // remove the scroll event listener for this element from the document module
                // because the picture has already loaded
                
                
            }
        });
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

            if (i < INITIAL_LOAD_VOLUME) {
                loadActualImageForFoodEntry(foodEntryElement)
            }
            else if (i < INITIAL_LOAD_VOLUME + NUM_SCROLL_LISTENERS) {
                listenForScrollDepthToLoad(foodEntryElement);
            }
        }
        return listOfFoodEntryLI;
    }

    // return public points to private variables and functions
    return {
        "getNextFoodItem": getNextFoodItem,
        "getPreviousFoodItem": getPreviousFoodItem,
        bindAllFoodEntriesWithClickEvent: bindAllFoodEntriesWithClickEvent
    };

})();