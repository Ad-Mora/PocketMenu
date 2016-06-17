/**
 * Created by devinm on 6/15/16.
 */
var mobileCategoriesMenu = (function () {
    // cache DOM
    var menuWrapper = document.querySelector("div.mobile-categories-menu-wrapper");
    var backgroundOverlay = menuWrapper.querySelector("div.categories-menu-background-overlay");
    var categoriesList = menuWrapper.querySelector("div.mobile-category-list–wrapper");
    var hamburgerIcon = document.querySelector("span.hamburger-bar-middle");

    // bind events
    if (backgroundOverlay) {
        backgroundOverlay.addEventListener('click', hideMobileCategoriesMenu);
    }

    // private variables
    var menuIsVisible = false;

    // public variables

    // private functions
    function hideMobileCategoriesMenu() {
        // translate the headbar right
        mobileSearchModal.orangeHeadBar.classList.remove("visible-state");
        mobileSearchModal.orangeHeadBar.classList.add("hidden-state");

        // translate the categories menu right
        categoriesList.classList.remove("visible-state");
        categoriesList.classList.add("hidden-state");

        // change the X back into bars
        hamburgerIcon.classList.remove("hamburger-x");

        // hide the backgroundOverlay
        backgroundOverlay.style.display = "none";
    }

    function showMobileCategoriesMenu() {
        // show the backgroundOverlay
        backgroundOverlay.style.display = "block";

        // translate the headbar left
        mobileSearchModal.orangeHeadBar.classList.remove("hidden-state");
        mobileSearchModal.orangeHeadBar.classList.add("visible-state");

        // translate the categories menu left
        categoriesList.classList.remove("hidden-state");
        categoriesList.classList.add("visible-state");

        // change the bars back into an X
        hamburgerIcon.classList.add("hamburger-x");
    }

    // public functions
    function toggleMobileCategoriesMenu() {
        menuIsVisible = !menuIsVisible;
        menuIsVisible ? showMobileCategoriesMenu(): hideMobileCategoriesMenu();
    }


    // return public pointers to private variables
    return {
        toggleMobileCategoriesMenu: toggleMobileCategoriesMenu
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
        hamburgerIcon.addEventListener('click', mobileCategoriesMenu.toggleMobileCategoriesMenu);
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

