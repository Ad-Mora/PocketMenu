/**
 * Created by devinm on 6/9/16.
 */
var foodEntry = (function () {

    // cache DOM
    var listOfFoodEntryLI;

    // bind events

    // private variables
    var MAX_NUMBER_OF_SCROLL_LISTENERS = 1;
    var scrollListenersCount = 0;
    var bufferCutOffDepth = window.innerHeight + 300;
    var intializeFoodEntries = bindAllFoodEntriesWithClickEvent();


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
        var foodEntryIndex = parseInt( foodEntry.getAttribute("data-list-item-number") );
        document.addEventListener('scroll', function test(event) {
            if (foodEntry.getBoundingClientRect().top <= bufferCutOffDepth) {
                console.log(foodEntryIndex);

                // okay, the user wants to see these photos so load them
                loadActualImageForFoodEntry(foodEntry);

                // now that we have loaded the photo, we don't need to the
                // eventListener anymore so remove it
                this.removeEventListener('scroll', test);

                // pass the event listener on to the next unloaded photo (that doesn't
                // already have an event listner so that it will load when necessary too
                var nextFoodEntryIndex = foodEntryIndex + MAX_NUMBER_OF_SCROLL_LISTENERS
                if (nextFoodEntryIndex < listOfFoodEntryLI.length) {
                    listenForScrollDepthToLoad(listOfFoodEntryLI[ nextFoodEntryIndex ]);
                }
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

            if (foodEntryElement.getBoundingClientRect().top <= bufferCutOffDepth) {
                loadActualImageForFoodEntry(foodEntryElement)
            }
            else if (scrollListenersCount < MAX_NUMBER_OF_SCROLL_LISTENERS) {
                listenForScrollDepthToLoad(foodEntryElement);
                scrollListenersCount++;
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