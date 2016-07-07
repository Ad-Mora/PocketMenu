/**
 * Created by devinm on 6/16/16.
 */
var mobileCategoriesMenu = (function () {
    // cache DOM
    var backgroundOverlay = document.querySelector("div.mobile-category-menu-background-overlay");
    var categoriesMenuUL = backgroundOverlay.nextElementSibling;
    var listOfCategoryOptions = categoriesMenuUL.querySelectorAll("li.categories-menu-category-option");
    var hamburgerIcon = websiteHeader.categoriesIcon;

    // bind events
    hamburgerIcon.addEventListener('click', toggleMobileCategoryOptions);
    backgroundOverlay.addEventListener('click', toggleMobileCategoryOptions);
    for (var i = 0; i < listOfCategoryOptions.length; i++) {
        listOfCategoryOptions[i].addEventListener('click', goToMenuCategory);
    }

    // private variables
    var displayIsVisible = false;
    var categoriesMenuDisplayStates = {true:"show-mobile-category-menu", false:"hide-mobile-category-menu"}

    // public variables
    function changeHighlightedMenuCategory(categoryName) {
        // unhighlight the current currently highlighted category option
        var currentCategoryLI = categoriesMenuUL.querySelector("li.current-category");
        currentCategoryLI.classList.remove("current-category");

         // highlight the new category option
        if (categoryName != undefined) {
            categoriesMenuUL.
                querySelector("li.categories-menu-category-option[data-category-name='" + categoryName + "']").
                classList.add("current-category");
        }
        else { // undefined means you are at the top of the page
            listOfCategoryOptions[0].classList.add("current-category");
        }
    }

    // private functions
    function goToMenuCategory(event) {
        toggleMobileCategoryOptions(event);
        moreOptions.scrollToCategory(event);
        var target = event.target;
        while (target.tagName != "LI") {
            target = target.parentNode;
        }
        var categoryName = target.getAttribute("data-category-name");
        changeHighlightedMenuCategory(categoryName);
    }

    function toggleMobileCategoryOptions(event) {
        categoriesMenuUL.classList.remove(categoriesMenuDisplayStates[displayIsVisible]);
        backgroundOverlay.classList.remove(categoriesMenuDisplayStates[displayIsVisible]);
        displayIsVisible = !displayIsVisible;
        backgroundOverlay.classList.add(categoriesMenuDisplayStates[displayIsVisible]);
        categoriesMenuUL.classList.add(categoriesMenuDisplayStates[displayIsVisible]);
    }

    // public functions

    // return public pointers to private variables
    return {
        changeHighlightedMenuCategory: changeHighlightedMenuCategory
    };

})();