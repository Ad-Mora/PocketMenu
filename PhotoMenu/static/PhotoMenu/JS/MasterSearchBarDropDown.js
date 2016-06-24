var searchDropDown = (function(){

    // cache DOM objects
    var searchBarForm = document.querySelector("form.search-bar-form");
    var searchBar = searchBarForm.querySelector("input.search-bar");
    var searchSuggestions = searchBarForm.querySelector("ul.search-suggestions-list");
    var csrfmiddlewaretoken = searchBarForm.querySelector("input[name='csrfmiddlewaretoken']");

    // bind events
    searchBar.addEventListener("input", toggleSearchDropDown);
    searchBar.addEventListener("blur", toggleSearchDropDown);
    searchBar.addEventListener("keyup", querySuggestions);

    function toggleSearchDropDown(event) {
        searchSuggestions.style.display = "block";
        if (searchBar.value === "" || event.type == "blur") {
            searchSuggestions.style.display = "none";
        }
    }

    function querySuggestions(event) {
        var destination_file = "../drop-down-suggestions/";
        
        var json_data = {
            "search-bar": searchBar.value
        }

        var postAjaxFunction = function(result){
            console.log(result);
        }

        ajax.send_ajax_request(destination_file, json_data, csrfmiddlewaretoken.value, postAjaxFunction);
    }

})();