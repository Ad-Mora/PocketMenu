/**
 * Created by devinm on 6/9/16.
 */
var foodEntry = (function () {
    // cache DOM
    var listOfFoodEntryLI = document.querySelectorAll("li.food-entry-li");

    // bind events
    for (var i = 0; i < listOfFoodEntryLI.length; i++) {
        listOfFoodEntryLI[i].addEventListener('click', _displayInspectorViewForFood);
    }

    // private variables

    // public variables

    // private functions
    function _displayInspectorViewForFood(event) {
        var foodName = this.getAttribute("data-food-name");
        var foodDetails = this.getAttribute("data-food-details");
        var foodImageLocaction = this.getAttribute("data-food-image-location");
        var foodPrice = this.getAttribute("data-food-price");
        var foodIsLiked = this.getAttribute("data-food-is-liked");

        inspectorView.showInspectorView({
            "foodName": foodName,
            "foodDetails": foodDetails,
            "foodImageLocation": foodImageLocaction,
            "foodPrice": foodPrice,
            "foodIsLiked": foodIsLiked
        });
    }

    // public functions

    // return public points to private variables and functions
    return {

    };

})();