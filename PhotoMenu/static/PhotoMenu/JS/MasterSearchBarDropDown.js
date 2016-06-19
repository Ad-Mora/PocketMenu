var searchDropDown = (function(){

    // cache DOM objects
    var searchBarForm = document.querySelector(".search-bar-form");
    var searchBar = searchBarForm.querySelector(".search-bar");
    var searchSuggestions = searchBarForm.querySelector(".search-suggestions-box");

    // bind events
    searchBar.addEventListener("input", toggleSearchDropDown);
    searchBar.addEventListener("blur", toggleSearchDropDown);

    function toggleSearchDropDown(event) {
        searchSuggestions.style.display = "block";
        if (searchBar.value === "" || event.type == "blur") {
            searchSuggestions.style.display = "none";
        }
    }

})();