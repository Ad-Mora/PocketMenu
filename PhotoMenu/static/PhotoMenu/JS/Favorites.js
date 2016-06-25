/**
 * Created by devinm on 6/24/16.
 */
var favoritesModule = (function () {
    // cache DOM

    // bind events

    // public variables
    var dictOfFavoriteFoods = fetchOrInitializeFavoriteFoodsDict();

    // private variables

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

    function setInterestDataForFoodList(listOfFoods) {
        for (var i in listOfFoods) {
            var foodElement = listOfFoods[ i ];
            var foodID = foodElement.getAttribute("data-food-unique-id");

            if (dictOfFavoriteFoods[ foodID ] !== "undefined") {
                foodElement.setAttribute("data-food-unique-id", dictOfFavoriteFoods[ foodID ] );
            }
        }
    }

    // return public pointers to private variables & functions
    return {
        saveNewFoodInterest: saveNewFoodInterest,
        setInterestDataForFoodList: setInterestDataForFoodList
    };

})();