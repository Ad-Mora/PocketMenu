/**
 * Created by devinm on 6/4/16.
 */
var favoritesPage = (function () {
    // cache DOM
    var listOfFoodSections = document.querySelector("ul.list-of-food-lists");
    var foodEntriesList;

    // bind events

    // public variables

    // private variables
    var loadFavoriteFoods = populateFavoritesPageWithFavoriteFoods();

    // public functions

    // private functions
    function populateFavoritesPageWithFavoriteFoods() {
        var dictOfFavoriteFoods = JSON.parse( localStorage.getItem("dictOfFavoriteFoods") );
        var favoriteFoods = [];
        for (var food in dictOfFavoriteFoods) {
            if (dictOfFavoriteFoods[ food ] == true) {
                favoriteFoods.push(food);
            }
        }

        if (dictOfFavoriteFoods !== null) {
            var destination_file = "../load-favorite-foods/";
            var csrfMiddlewareToken = ajax.getCSRFToken();

            var json_data = {
                "food-ids-list": favoriteFoods
            }
            var postAjaxFunction = function(result) {
                listOfFoodSections.innerHTML = result;
                foodFavoriting.setInterestDataForFoodList();
                foodEntriesList = foodEntry.bindAllFoodEntriesWithClickEvent();
            }

            ajax.send_ajax_request(destination_file, json_data, csrfMiddlewareToken, postAjaxFunction);
        }
        else {
            // tell them that their favorites list is empty :( but that they
            // should go browse some foods :)
        }

    }

    // return public pointers to private variables & functions
    return {

    };

})();