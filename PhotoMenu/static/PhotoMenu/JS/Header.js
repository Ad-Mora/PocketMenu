/**
 * Created by devinm on 6/15/16.
 */
var websiteHeader = (function () {
    // cache DOM
    var headerElement = document.querySelector("div.header");
    var hamburgerIcon = headerElement.querySelector("div.hamburger-icon-wrapper");
    var desktopSearchBar = headerElement.querySelector("form.header-search-bar-with-icon");
    var searchIcon = headerElement.querySelector("img.search-icon");

    // bind events

    // private variables

    // public variables

    // private functions

    // public functions

    // return public pointers to private variables
    return {
        headerContainer: headerElement,
        categoriesIcon: hamburgerIcon,
        headerSearchBar: desktopSearchBar,
        mobileSearchIcon: searchIcon
    };

})();