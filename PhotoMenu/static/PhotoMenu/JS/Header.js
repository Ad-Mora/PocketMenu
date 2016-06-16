/**
 * Created by devinm on 6/15/16.
 */
var mobileCategoriesMenu = (function () {
    // cache DOM
    var menuWrapper = document.querySelector("div.mobile-categories-menu-wrapper");
    var backgroundOverlay = menuWrapper.querySelector("div.categories-menu-background-overlay");
    var categoriesList = menuWrapper.querySelector("ul.mobile-categories-menu-list");

    // bind events
    if (backgroundOverlay) {
        backgroundOverlay.addEventListener('click', hideMobileCategoriesMenu);
    }

    // private variables

    // public variables

    // private functions
    function hideMobileCategoriesMenu() {
        backgroundOverlay.style.display = "none";

        // translate the headbar right
        mobileSearchModal.orangeHeadBar.classList.remove("visible-state");
        mobileSearchModal.orangeHeadBar.classList.add("hidden-state");
        // translate the categories menu right
        categoriesList.classList.remove("visible-state");
        categoriesList.classList.add("hidden-state");

    }

    // public functions
    function showMobileCategoriesMenu() {
        backgroundOverlay.style.display = "block";
        // translate the headbar left
        mobileSearchModal.orangeHeadBar.classList.remove("hidden-state");
        mobileSearchModal.orangeHeadBar.classList.add("visible-state");

        // translate the categories menu left
        categoriesList.classList.remove("hidden-state");
        categoriesList.classList.add("visible-state");
    }

    // return public pointers to private variables
    return {
        showMobileCategoriesMenu: showMobileCategoriesMenu
    };

})();


var mobileSearchModal = (function(){
    // cached DOM
    var headerElement = document.querySelector("div.header");
    var hamburgerIcon = headerElement.querySelector("div.hamburger-icon-wrapper");
    var desktopSearchBar = headerElement.querySelector("img.header-search-bar");
    var searchIcon = headerElement.querySelector("img.search-icon");

    // bind events
    if (searchIcon) {
        searchIcon.addEventListener('click', mobileSearchModal.openSearchModal);
    }
    if (desktopSearchBar) {desktopSearchBar.addEventListener('click', function(){});}
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', mobileCategoriesMenu.showMobileCategoriesMenu);
    }

    // private variables

    // public variables

    // private functions

    // public functions

    // return public pointers to private variables & functions
    return {
        orangeHeadBar: headerElement
    };

})();

