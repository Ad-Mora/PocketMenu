/**
 * Created by devinm on 6/16/16.
 */
var mobileSearchModal = (function(){
    // cached DOM
    var searchIcon = websiteHeader.mobileSearchIcon;
    var container = document.querySelector("div.mobile-modal-search-container");
    var backgroundOverlay = container.querySelector("div.mobile-search-background-overlay");
    var mainForm = container.querySelector("form.mobile-search-modal-form");
    var selectSearchType = container.querySelector("select.mobile-select-search-type");
    var searchBar = container.querySelector("input.mobile-modal-search-bar");
    var submitButton = container.querySelector("input.submit-mobile-search-modal");
    var cancelButton = container.querySelector("span.close-mobile-search-modal");
    var suggestionsList = container.querySelector("ul.mobile-search-suggestions-list");

    // bind events
    searchIcon.addEventListener('click', openSearchModal);
    cancelButton.addEventListener('click', closeSearchModal);
    searchBar.addEventListener('focus', displaySearchSuggestionsList);
    documentModule.addOnClickFunction(selectSuggestionsOrBlurEvent);
    searchBar.addEventListener('keyup', queryForSuggestions);
    selectSearchType.addEventListener('change', updateMainFormPOSTAddress);
    backgroundOverlay.addEventListener('click', closeSearchModal);

    // private variables

    // public variables

    // private functions
    function updateMainFormPOSTAddress(event) {
        if (this.value == "Food" || this.value == "Restaurant") {
            mainForm.action = event.currentTarget.getAttribute("data-regular-search-href");
        }
        else {
            mainForm.action = event.currentTarget.getAttribute("data-internal-search-href");
        }
    }

    function openSearchModal(event) {
        container.classList.add("show-mobile-category-menu");
        container.classList.remove("hide-mobile-search-modal");
        searchBar.focus();
    }

    function closeSearchModal(event) {
        container.classList.add("hide-mobile-search-modal");
        container.classList.remove("show-mobile-category-menu");
    }

    function displaySearchSuggestionsList() {
        suggestionsList.style.display = "block";
    }

    function selectSuggestionsOrBlurEvent() {
        var targetElement = event.target;
        if (targetElement.parentNode === suggestionsList) {
            var suggestion_text = targetElement.innerHTML;
            searchBar.value = suggestion_text;
            mainForm.submit();
        }
        else if (targetElement !== searchBar && targetElement !== searchIcon) {
            suggestionsList.style.display = "none";
        }
    }

    function queryForSuggestions(event) {
        var searchType = selectSearchType.value;
        var searchQuery = searchBar.value;
        var csrfMiddlewareToken = ajax.getCSRFToken();
        var postAjaxFunction = function(result){
            suggestionsList.innerHTML = result;
        };

        var destinationFile = event.target.getAttribute("data-autocomplete-suggestions-href");
        var jsonData = {
                "search-bar":   searchQuery,
                "search-type":  searchType
            };
            // destinationFile = "search/drop-down-suggestions";

        ajax.send_ajax_request(destinationFile, jsonData, csrfMiddlewareToken, postAjaxFunction);
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
    searchInput.addEventListener('focus', function (event) {
        displaySearchSuggestionsList(event, suggestionsList);
    });
    documentModule.addOnClickFunction(function (event) {
        selectSuggestionsOrBlurEvent(event, searchInput, searchBarContainer, suggestionsList);
    });
    searchInput.addEventListener('keyup', function(event) {
        var destinationFile = event.target.getAttribute("data-autocomplete-suggestions-href");
        queryForSuggestions(event, searchInput, suggestionsList, destinationFile, 'Restaurant');
    });

    // public variables

    // private variables

    // public functions

    // private functions
    function selectSuggestionsOrBlurEvent(event, searchInput, searchBarContainer, suggestionsList) {
        var targetElement = event.target;
        if (targetElement.parentNode === suggestionsList) {
            searchInput.value = targetElement.innerHTML;
            searchBarContainer.submit();
        }
        else if (targetElement !== searchInput) {
            suggestionsList.style.display = "none";
        }
    }

    function displaySearchSuggestionsList(event, suggestionsList) {
        suggestionsList.style.display = "block";
    }

    function queryForSuggestions(event, searchInput, suggestionsList, destinationFile, searchType) {
        // var destination_file = "../drop-down-suggestions/";
        var csrfMiddlewareToken = ajax.getCSRFToken();
        var json_data = {
            "search-bar": searchInput.value,
            "search-type": searchType         // by default, the desktop search bar always searches restaurant
        }
        var postAjaxFunction = function(result){
            suggestionsList.innerHTML = result;
        }

        ajax.send_ajax_request(destinationFile, json_data, csrfMiddlewareToken, postAjaxFunction);
    }

    // return public pointers to private variables & functions
    return {
        selectSuggestionsOrBlurEvent: selectSuggestionsOrBlurEvent,
        displaySearchSuggestionsList: displaySearchSuggestionsList,
        queryForSuggestions: queryForSuggestions

    };

})();

console.log("photomenu");