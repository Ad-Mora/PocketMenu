/**
 * Created by devinm on 6/9/16.
 */
var foodEntry = (function () {

    // cache DOM
    var listOfFoodEntryLI;

    // bind events
    var intializeFoodEntries = bindAllFoodEntriesWithClickEvent();

    // private variables

    // public variables

    // private functions
    function _displayInspectorViewForFood(event) {
        allInspectorView.showInspectorView(this);
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
            listOfFoodEntryLI[i].addEventListener('click', _displayInspectorViewForFood);
            listOfFoodEntryLI[i].setAttribute("data-list-item-number", i);
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