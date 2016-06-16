/**
 * Created by devinm on 6/15/16.
 */
var mobileSearchModal = (function(){
    // cached DOM
    var headerElement = document.querySelector("div.header");
    var hamburgerIcon = headerElement.querySelector("img.hamburger-icon");
    var desktopSearchBar = headerElement.querySelector("img.header-search-bar");
    var searchIcon = headerElement.querySelector("img.search-icon");

    // bind events
    if (searchIcon) {
        searchIcon.addEventListener('click', mobileSearchModal.openSearchModal);
    }
    if (desktopSearchBar) {desktopSearchBar.addEventListener('click', function(){});}
    if (hamburgerIcon) {hamburgerIcon.addEventListener('click', function(){});}

    // private variables

    // public variables

    // private functions

    // public functions

    // return public pointers to private variables & functions
    return {

    };

})();