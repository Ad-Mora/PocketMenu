/**
 * Created by devinm on 6/25/16.
 */
var foodFavoriting = (function () {
    // cache DOM

    // bind events

    // public variables
    var dictOfFavoriteFoods = fetchOrInitializeFavoriteFoodsDict();

    // private variables
    var setFoodInterestForLoadedFoods = setInterestDataForFoodList();

    // public functions
    function saveNewFoodInterest(foodElement, newFoodInterest) {
        var foodIdentifier = foodElement.getAttribute("data-food-unique-id");
        dictOfFavoriteFoods[ foodIdentifier ] = newFoodInterest;
        localStorage.setItem("dictOfFavoriteFoods", JSON.stringify(dictOfFavoriteFoods) );
    }

    // private functions
    function fetchOrInitializeFavoriteFoodsDict() {
        // if dictOfFavoriteFoods exists locally
        if (localStorage.getItem("dictOfFavoriteFoods") !== null) {
            return JSON.parse( localStorage.getItem("dictOfFavoriteFoods") );
        }
        // otherwise just create a new dict and store it locally
        localStorage.setItem("dictOfFavoriteFoods", JSON.stringify({}) );
        return {};
    }

    function setInterestDataForFoodList() {
        // cant cache listOfAllFoodEntries because some pages load
        // FoodEntries dynamically
        var listOfAllFoodEntries = document.querySelectorAll("li.food-entry-li");

        for (var i = 0; i < listOfAllFoodEntries.length; i++) {
            var foodElement = listOfAllFoodEntries[ i ];
            var foodID = foodElement.getAttribute("data-food-unique-id");

            if (dictOfFavoriteFoods[ foodID ] !== undefined) {
                foodElement.setAttribute("data-food-is-liked", dictOfFavoriteFoods[ foodID ] );
            }
        }
    }

    // return public pointers to private variables & functions
    return {
        saveNewFoodInterest: saveNewFoodInterest,
        setInterestDataForFoodList: setInterestDataForFoodList
    };

})();