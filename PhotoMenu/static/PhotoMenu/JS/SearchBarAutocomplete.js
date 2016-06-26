var masterSearch = (function(){

    // cache DOM objects
    var searchBarForm = document.querySelector("form.search-bar-form");
    var searchTypeRadioList = searchBarForm.querySelectorAll("input.search-option-radio-btn");
    var searchTypeSelect = searchBarForm.querySelector("select.select-search-type");
    var searchBar = searchBarForm.querySelector("input.search-bar");
    var searchSuggestions = searchBarForm.querySelector("ul.search-suggestions-list");

    // bind events
    searchBar.addEventListener("input", onSearchBarFocus);
    documentModule.addOnClickFunction(selectSuggestionsOrBlurEvent);
    searchBar.addEventListener("keyup", querySuggestions);
    searchTypeRadioList[0].addEventListener("change", updateSearchTypeSelect);
    searchTypeRadioList[1].addEventListener("change", updateSearchTypeSelect);
    searchTypeSelect.addEventListener("change", updateSearchTypeRadioButtons);

    // public variables

    // private variables

    // public functions

    // private functions
    function updateSearchTypeSelect(event) {
        searchTypeSelect.value = event.target.value;
        searchBar.placeholder = "Search for " + event.target.value + "s";
    }

    function updateSearchTypeRadioButtons(event) {
        searchBarForm.querySelector("input[name=radio-search-type][value="+ event.target.value +"]").checked = true;
        searchBar.placeholder = "Search for " + event.target.value + "s";
    }

    function onSearchBarFocus(event) {
        searchSuggestions.style.display = "block";
    }

    function selectSuggestionsOrBlurEvent(event) {
        var targetElement = event.target;
        if (targetElement.parentNode === searchSuggestions) {
            var suggestion_text = targetElement.innerHTML;
            searchBar.value = suggestion_text;
            searchBarForm.submit();
        }
        else if (targetElement !== searchBar) {
            // do nothing
        }
        searchSuggestions.style.display = "none";
    }

    function querySuggestions(event) {
        var destination_file = "../drop-down-suggestions/";
        var search_type  = searchBarForm.querySelector('input[name="radio-search-type"]:checked').value;
        var csrfMiddlewareToken = ajax.getCSRFToken();
        var json_data = {
            "search-bar": searchBar.value,
            "search-type": search_type
        }
        var postAjaxFunction = function(result){
            searchSuggestions.innerHTML = result;
        }

        ajax.send_ajax_request(destination_file, json_data, csrfMiddlewareToken, postAjaxFunction);
    }

    // return public pointers to private variables & functions
    return {

    };

})();