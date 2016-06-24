var searchDropDown = (function(){

    // cache DOM objects
    var searchBarForm = document.querySelector("form.search-bar-form");
    var searchBar = searchBarForm.querySelector("input.search-bar");
    var searchSuggestions = searchBarForm.querySelector("ul.search-suggestions-list");

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
        var queryString = searchBar.value;
        console.log(queryString);
    }

})();