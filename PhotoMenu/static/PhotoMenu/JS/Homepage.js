var searchDropDown = (function(){

    // cache DOM objects
    var darkOverlay = document.querySelector(".dark-overlay");
    var searchBar = darkOverlay.querySelector(".search-bar");
    var searchSuggestions = darkOverlay.querySelector(".search-suggestions-wrapper");

    // bind events
    searchBar.addEventListener("click", toggleSearchDropDown);

})();