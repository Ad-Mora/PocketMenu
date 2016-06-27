/**
 * Created by devinm on 6/27/16.
 */
var searchResultsPage = (function () {
    // cache DOM
    var body = document.body;
    var html = document.documentElement;

    // bind events
    documentModule.addOnScrollFunction(checkIfScrolledToBottom)

    // public variables

    // private variables

    // public functions

    // private functions
    function loadMoreSearchResults() {
        var destination_file = "../load-favorite-foods/";
        var csrfMiddlewareToken = ajax.getCSRFToken();
        var json_data = {
            "food-ids-list": favoriteFoods
        }
        var postAjaxFunction = function(result) {
            listOfFoodSections.innerHTML = result;
            foodFavoriting.setInterestDataForFoodList();
            foodEntry.bindAllFoodEntriesWithClickEvent();
        }

        ajax.send_ajax_request(destination_file, json_data, csrfMiddlewareToken, postAjaxFunction);
    }

    function checkIfScrolledToBottom(event) {


        var documentHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
        if (body.scrollTop == documentHeight - window.innerHeight) {
            loadMoreSearchResults();
        }
    }


    // return public pointers to private variables & functions
    return {

    };

})();