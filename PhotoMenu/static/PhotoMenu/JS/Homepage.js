var searchDropDown = (function(){

    // cache DOM objects
    var darkOverlay = document.querySelector(".dark-overlay");
    var searchBar = darkOverlay.querySelector(".search-bar");
    var searchSuggestions = darkOverlay.querySelector(".search-suggestions-box");

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