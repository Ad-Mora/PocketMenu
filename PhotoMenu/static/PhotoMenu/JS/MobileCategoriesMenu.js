/**
 * Created by devinm on 6/16/16.
 */
var mobileCategoriesMenu = (function () {
    // cache DOM
    var categoriesMenuUL = document.querySelector("ul.mobile-categories-menu-list");
    var listOfCategoryOptions = categoriesMenuUL.querySelectorAll("li.categories-menu-category-option");
    var hamburgerIcon = websiteHeader.categoriesIcon;

    // bind events
    hamburgerIcon.addEventListener('click', toggleMobileCategoryOptions);
    for (var i = 0; i < listOfCategoryOptions.length; i++) {
        listOfCategoryOptions[i].addEventListener('click', toggleMobileCategoryOptions);
    }

    // private variables
    var displayIsVisible = false;
    var categoriesMenuDisplayStates = {true:"block", false:"none"}

    // public variables

    // private functions
    function toggleMobileCategoryOptions(event) {
        displayIsVisible = !displayIsVisible
        categoriesMenuUL.style.display = categoriesMenuDisplayStates[ displayIsVisible ];
    }

    // public functions

    // return public pointers to private variables
    return {
        
    };

})();