/**
 * Created by devinm on 6/9/16.
 */

//---------Toggle the More Options drop down menu--------
var moreOptions = (function(){

    /*----------Cache DOM----------*/

    // Visible category filter bar options
    var headerBar = document.querySelector("div.header");
    var categoryBar = document.querySelector("div.filter-and-search-section");
    var visibleOptionsUL = document.querySelector("ul.filter-options-list");
    var allVisibleOptionLI = visibleOptionsUL.querySelectorAll("li.filter-option");
    var slidingUnderBar = visibleOptionsUL.querySelector("hr.sliding-underbar");

    // More options menu
    var moreOptionsLI = visibleOptionsUL.querySelector("li.filter-option.more-options-options");
    if (moreOptionsLI) {
        var moreOptionsUL = moreOptionsLI.querySelector("ul.more-filter-options-list");
        var dropDownIcon = moreOptionsLI.querySelector("i.more-options-drop-down-icon");
    }

    // Get dictionary of category strings to category bar element objects
    var namesToBarCategories = {};
    var catName;
    for (var i = 0; i < Object.keys(allVisibleOptionLI).length; i++) {
        catName = allVisibleOptionLI[i].firstElementChild.textContent;
        allVisibleOptionLI[i];
        namesToBarCategories[catName] = allVisibleOptionLI[i];
    }

    // Get dictionary of category strings to category header element objects
    var categoryHeaderObjects = document.querySelectorAll("h3.food-type-section-header");
    var categoryNamesToObject = {};
    for (var i = 0; i < Object.keys(categoryHeaderObjects).length; i++) {
        var categoryObj = categoryHeaderObjects[i];
        categoryNamesToObject[categoryObj.textContent] = categoryObj;
    }

    // perform actions whenever the window is scrolled
    window.onscroll = onScrollFunctions;

    /*----------Initial loading actions----------*/

    // Start off the page with the underbar taking up the full width of the first category item
    adjustSlidingUnderBar(null, allVisibleOptionLI[0])

    /*----------Bind events----------*/

    // drop down more options menu
    if (moreOptionsLI) {
        moreOptionsLI.addEventListener('click', toggleDropDownMenu);
    }

    // filter bar event listeners
    for (var i = 0; i < allVisibleOptionLI.length; i++) {
        allVisibleOptionLI[i].addEventListener('click', adjustSlidingUnderBar);
        allVisibleOptionLI[i].addEventListener('click', scrollToCategory);
    }

    /*----------Variables----------*/

    var dropDownIsVisible = false;
    var dropDownMenuStates = {true: "block", false: "none"};
    var dropDownIconStates = {true: "rotate(180deg)", false: "rotate(0deg)"};
    var hideDropDownCorrectly = documentModule.addOnClickFunction(toggleDropDownMenu);

    var categoryBarFixed = false;
    var defaultCategoryBarPosition = getVerticalPosition(categoryBar);

    /*----------Functions----------*/

    // Getters

    // Get dictionary of category positions to menu category elements
    function getHeaderCategoryPositionsToObjects() {
        var categoryPositionsToObjects = {};
        var position;
        for (var i = 0; i < Object.keys(categoryHeaderObjects).length; i++) {
            categoryObj = categoryHeaderObjects[i];
            position = getVerticalPosition(categoryObj);
            categoryPositionsToObjects[position] = categoryObj;
        }
        return categoryPositionsToObjects;
    }

    // Get a list of sorted category positions
    function getCategoryHeaderPositions() {
        var categoryPositions = Object.keys(getHeaderCategoryPositionsToObjects());
        categoryPositions = categoryPositions.sort(function(a, b) {
            return a - b;
        });
        return categoryPositions;
    }

    function getHeaderHeight() {
        var headerHeight = window.getComputedStyle(headerBar).getPropertyValue("height");
        return parseFloat(headerHeight, 10);
    }

    function getCategoryBarHeight() {
        var categoryBarHeight = window.getComputedStyle(categoryBar).getPropertyValue("height");
        return parseFloat(categoryBarHeight, 10);
    }

    function getBodyPaddingTop() {
        style = window.getComputedStyle(document.body);
        paddingTop = style.getPropertyValue("padding-top");
        paddingTop = parseFloat(paddingTop, 10);
        return paddingTop;
    }

    // Vertical position is defined as from the top of the visible document (top is position 0)
    function getVerticalPosition(element) {
        elementRect = element.getBoundingClientRect();
        bodyRect = document.body.getBoundingClientRect();
        offset = elementRect.top - bodyRect.top;
        return offset;
    }

    // Other functions

    function toggleDropDownMenu(event) {
//        event.stopPropagation();
//        console.log(event);
//        var srcElement = event.srcElement || event.target;
//        while (srcElement) {
//            if (srcElement == moreOptionsLI) {
//                dropDownIsVisible = !dropDownIsVisible;
//                moreOptionsUL.style.display = dropDownMenuStates[ dropDownIsVisible ];
//                dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
//                dropDownIcon.style.webkitTransform = dropDownIconStates[ dropDownIsVisible ];
//                return;
//            }
//            srcElement = srcElement.parentNode;
//        }
//
//        dropDownIsVisible = false;
//        moreOptionsUL.style.display = dropDownMenuStates[ dropDownIsVisible ];
//        dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
//        dropDownIcon.style.webkitTransform = dropDownIconStates[ dropDownIsVisible ];
        return;
    }

    function adjustSlidingUnderBar(event, element) {
        var referenceX = visibleOptionsUL.getBoundingClientRect().left;
        var optionRect = (element || this).getBoundingClientRect();
        var deltaX = optionRect.left - referenceX;
        var width = optionRect.width;

        slidingUnderBar.style.width = width + "px";
        slidingUnderBar.style.marginLeft = deltaX + "px";
    }

    // duration is in milliseconds
    function smoothScroll(endPosition, duration) {
        var startPosition = window.scrollY;
        var distance = endPosition - startPosition;
        var increment = distance/(duration/3);
        var stopAnimation;

        var animateScroll = function () {
            window.scrollBy(0, increment);
            stopAnimation();
        };

        stopAnimation = function() {
            var currentPosition = window.scrollY;

            if (increment >= 0) {
                if ( (currentPosition >= (endPosition - increment)) ||
                ((window.innerHeight + currentPosition) >= document.body.getBoundingClientRect().height) ) {
                    clearInterval(runAnimation);
                }
            } else {
                if (currentPosition <= endPosition || currentPosition <= 0) {
                    clearInterval(runAnimation);
                }
            }
        }
        var runAnimation = setInterval(animateScroll, 3);
    }

    // Scroll to a specific header category
    function scrollToCategory(event) {
        var srcElement = event.srcElement;
        var className = srcElement.className;
        var category = srcElement.textContent;
        var paddingTop = getBodyPaddingTop();
        var endPosition;

        if (className == "filter-option") {
            category = srcElement.firstElementChild.textContent;
        }
        elementToScrollTo = categoryNamesToObject[category];
        endPosition = getVerticalPosition(elementToScrollTo) - getHeaderHeight() - getCategoryBarHeight();
        smoothScroll(endPosition, 300);
    }

    // Set the category bar to a fixed position
    function fixCategoryBar() {
        var newPaddingTop;
        var paddingTop = getBodyPaddingTop();
        var topHeaderViewPos = window.scrollY + getHeaderHeight();

        if (topHeaderViewPos >= defaultCategoryBarPosition && !categoryBarFixed) {
            newPaddingTop = String(paddingTop + getCategoryBarHeight()) + "px";
            document.body.style.paddingTop = newPaddingTop;
            categoryBarFixed = true;
            categoryBar.style.top = String(getHeaderHeight()) + "px";
            categoryBar.style.position = "fixed";
        } else if (topHeaderViewPos < defaultCategoryBarPosition && categoryBarFixed) {
            newPaddingTop = String(getHeaderHeight()) + "px"
            document.body.style.paddingTop = newPaddingTop;
            categoryBarFixed = false;
            categoryBar.style.top = "";
            categoryBar.style.position = "";
        }
    }

    // Move the orange underbar in the category bar to the correct location depending on
    // what category area the user is currently in
    function detectCategoryScroll() {
        var categoryHeaderPositions = getCategoryHeaderPositions();
        var currentTopViewPosition = window.scrollY + getHeaderHeight() + getCategoryBarHeight();
        var currentCategory = categoryHeaderPositions[0];
        var categoryObject;
        var barCategoryObject;
        var catName;
        var catPosition;

        for (var i = 0; i < Object.keys(categoryHeaderPositions).length; i++) {
            catPosition = categoryHeaderPositions[i];
            if (currentTopViewPosition >= catPosition) {
                currentCategory = catPosition;
            }
        }
        categoryObject = getHeaderCategoryPositionsToObjects()[currentCategory];
        catName = categoryObject.textContent;
        barCategoryObject = namesToBarCategories[catName];
        adjustSlidingUnderBar(null, barCategoryObject);
    }

    function onScrollFunctions(event) {
        fixCategoryBar();
        detectCategoryScroll();
    }

    // reveal public pointers to private functions & properties
    return {
    };

})();