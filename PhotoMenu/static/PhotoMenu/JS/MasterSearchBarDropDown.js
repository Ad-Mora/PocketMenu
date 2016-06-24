var searchDropDown = (function(){

    // cache DOM objects
    var searchBarForm = document.querySelector("form.search-bar-form");
    var searchBar = searchBarForm.querySelector("input.search-bar");
    var searchSuggestions = searchBarForm.querySelector("ul.search-suggestions-list");
    var csrfmiddlewaretoken = searchBarForm.querySelector("input[name='csrfmiddlewaretoken']");

    // bind events
    searchBar.addEventListener("input", onSearchBarFocus);
    documentModule.addOnClickFunction(selectSuggestionsOrBlurEvent);
    searchBar.addEventListener("keyup", querySuggestions);
    // searchSuggestions.addEventListener("click", autocompleteWithSuggestion);

    // public variables

    // private variables

    // var visible_states = {true:"block", false:"none"}

    // public functions

    // private functions
    // function toggleSearchDropDown(event) {
    //     searchSuggestions.style.display = "block";
    //     if (searchBar.value === "" || event.type == "blur") {
    //         searchSuggestions.style.display = "none";
    //         console.log(event);
    //     }
    // }
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

        var json_data = {
            "search-bar": searchBar.value
        }

        var postAjaxFunction = function(result){
            searchSuggestions.innerHTML = result;
        }

        ajax.send_ajax_request(destination_file, json_data, csrfmiddlewaretoken.value, postAjaxFunction);
    }

    function autocompleteWithSuggestion(event) {
        var chossenOption = event.target;
        console.log(chossenOption);
    }

    // return public pointers to private variables & functions
    return {

    };

})();