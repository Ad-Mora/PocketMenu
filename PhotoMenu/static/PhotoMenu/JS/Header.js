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
        categoriesList.style.display = "none";
    }

    // public functions
    function showMobileCategoriesMenu() {
        backgroundOverlay.style.display = "block";
        categoriesList.style.display = "block";
        // translate the headbar left
            mobileSearchModal.orangeHeadBar.style.transform = "translateX("
        // translate the categories menu left
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

