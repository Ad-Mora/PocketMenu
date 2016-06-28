/**
 * Created by devinm on 6/16/16.
 */
var mobileCategoriesMenu = (function () {
    // cache DOM
    var menuWrapper = document.querySelector("div.mobile-categories-menu-wrapper");
    var hamburgerIcon = websiteHeader.categoriesIcon;
    var middleBar = hamburgerIcon.querySelector("span.hamburger-bar-middle");
    var backgroundOverlay = menuWrapper.querySelector("div.categories-menu-background-overlay");
    var categoriesList = menuWrapper.querySelector("div.mobile-category-list–wrapper");

    // bind events
    hamburgerIcon.addEventListener('click', toggleMobileCategoriesMenu);
    // backgroundOverlay.addEventListener('click', hideMobileCategoriesMenu);

    // private variables
    var menuIsVisible = false;

    // public variables

    // private functions
    function hideMobileCategoriesMenu() {
        // translate the headbar right
        // websiteHeader.headerContainer.classList.remove("visible-state");
        // websiteHeader.headerContainer.classList.add("hidden-state");

        // translate the categories menu right
        // categoriesList.classList.remove("visible-state");
        // categoriesList.classList.add("hidden-state");

        // reveal hamburger Icon
        // middleBar.style.display = "block";

        // hide the backgroundOverlay
        // backgroundOverlay.style.display = "none";

        document.body.style.left = "0px";
    }

    function showMobileCategoriesMenu() {
        // show the backgroundOverlay
        // backgroundOverlay.style.display = "block";

        // translate the headbar left
        // websiteHeader.headerContainer.classList.remove("hidden-state");
        // websiteHeader.headerContainer.classList.add("visible-state");

        // translate the categories menu left
        // categoriesList.classList.remove("hidden-state");
        // categoriesList.classList.add("visible-state");

        // hide the hamburger Icon
        // middleBar.style.display = "none";
        document.body.style.left = "280px";
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