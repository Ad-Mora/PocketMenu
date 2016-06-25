/**
 * Created by devinm on 6/16/16.
 */
var mobileSearchModal = (function(){
    // cached DOM
    var searchIcon = websiteHeader.mobileSearchIcon;
    var mobileSearchContainer = document.querySelector("div.mobile-modal-search-container");
    var cancelSearchButton = mobileSearchContainer.querySelector("span.close-mobile-search-modal");

    // bind events
    searchIcon.addEventListener('click', openSearchModal);
    cancelSearchButton.addEventListener('click', closeSearchModal);

    // private variables

    // public variables

    // private functions
    function openSearchModal(event) {
        mobileSearchContainer.style.display = "block";
    }

    function closeSearchModal(event) {
        mobileSearchContainer.style.display = "none";
    }

    // public functions

    // return public pointers to private variables & functions
    return {

    };

})();

var desktopHeaderSearch = (function () {
    // cache DOM
    var searchBarContainer = websiteHeader.headerSearchBar;
    var searchInput = searchBarContainer.querySelector("input.header-search-bar");
    var suggestionsList = searchBarContainer.querySelector("ul.header-search-suggestions-list");

    // bind events
    searchInput.addEventListener('focus', displaySearchSuggestionsList);
    documentModule.addOnClickFunction(selectSuggestionsOrBlurEvent);
    searchInput.addEventListener('keyup', queryForSuggestions);

    // public variables

    // private variables

    // public functions

    // private functions
    function selectSuggestionsOrBlurEvent(event) {
        var targetElement = event.target;
        if (targetElement.parentNode === suggestionsList) {
            var suggestion_text = targetElement.innerHTML;
            searchInput.value = suggestion_text;
            searchBarContainer.submit();
        }
        else if (targetElement !== searchInput) {
            suggestionsList.style.display = "none";
        }
    }
    
    function displaySearchSuggestionsList(event) {
        suggestionsList.style.display = "block";
    }

    function hideSearchSuggestionsList(event) {
        suggestionsList.style.display = "none";
    }

    function queryForSuggestions(event) {
        var destination_file = "../drop-down-suggestions/";
        var csrfMiddlewareToken = ajax.getCSRFToken();
        var json_data = {
            "search-bar": searchInput.value,
            "search-type": 'restaurant'         // by default, the desktop search bar always searches restaurant
        }
        var postAjaxFunction = function(result){
            suggestionsList.innerHTML = result;
        }

        ajax.send_ajax_request(destination_file, json_data, csrfMiddlewareToken, postAjaxFunction);
    }

    // return public pointers to private variables & functions
    return {

    };

})();
