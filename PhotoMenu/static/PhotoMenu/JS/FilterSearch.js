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
    var allVisibleOptionsLI = visibleOptionsUL.querySelectorAll("li.filter-option");
    var slidingUnderBar = visibleOptionsUL.querySelector("hr.sliding-underbar");

    // More options menu
    var moreBox = visibleOptionsUL.querySelector("li.more-options-options");
    var moreOptionsUL;
    var dropDownIcon;
    var hiddenOptions;
    if (moreBox) {
        moreOptionsUL = moreBox.querySelector("ul.more-filter-options-list");
        dropDownIcon = moreBox.querySelector("i.more-options-drop-down-icon");
        hiddenOptions = moreBox.querySelectorAll("li.hidden-filter-option");
    }

    /*----------Initial loading actions----------*/

    // Start off the page with the underbar taking up the full width of the first category item
    adjustSlidingUnderBar(null, allVisibleOptionsLI[0])

    /*----------Bind events----------*/

    // drop down more options menu
    if (moreBox) {
        moreBox.addEventListener('click', toggleDropDownMenu);
    }

    // category bar event listeners
    for (var i = 0; i < allVisibleOptionsLI.length; i++) {
        allVisibleOptionsLI[i].addEventListener('click', adjustSlidingUnderBar);
        allVisibleOptionsLI[i].addEventListener('click', scrollToCategory);
    }
    for (var i = 0; i < hiddenOptions.length; i++) {
        hiddenOptions[i].addEventListener('click', scrollToCategory);
        hiddenOptions[i].addEventListener('click', slideUnderBarToMoreBox);
    }

    // perform actions whenever the window is scrolled
    window.onscroll = onScrollFunctions;

    /*----------Variables----------*/

    var dropDownIsVisible = false;
    var dropDownMenuStates = {true: "block", false: "none"};
    var dropDownIconStates = {true: "rotate(180deg)", false: "rotate(0deg)"};
    var hideDropDownCorrectly = documentModule.addOnClickFunction(toggleDropDownMenu);
    var categoryBarFixed = false;
    var defaultCategoryBarPosition = getVerticalPosition(categoryBar);
    var currentCategoryName = getHeaderCategoryNamesToHeaderElements()[0];

    /*----------Functions----------*/

    // get dictionaries and lists

    // Get dictionary of category names to element header categories
    function getHeaderCategoryNamesToHeaderElements() {
        var categoryHeaderObjects = document.querySelectorAll("h3.food-type-section-header");
        var categoryNamesToHeaderElements = {};
        for (var i = 0; i < Object.keys(categoryHeaderObjects).length; i++) {
            categoryNamesToHeaderElements[categoryHeaderObjects[i].textContent] = categoryHeaderObjects[i];
        }
        return categoryNamesToHeaderElements;
    }

    // Get dictionary of visible bar category names to visible bar category elements
    function getBarCategoryNamesToBarElements() {
        var visibleBarCategoryNames = [];
        var visibleCategoryName;
        var visibleBarCategoryNameToVisibleBarCategoryElement = {}
        for (var i = 0; i < Object.keys(allVisibleOptionsLI).length; i++) {
            visibleCategoryName = allVisibleOptionsLI[i].firstElementChild.textContent;
            visibleBarCategoryNameToVisibleBarCategoryElement[visibleCategoryName] = allVisibleOptionsLI[i];
        }
        return visibleBarCategoryNameToVisibleBarCategoryElement;
    }

    // Get dictionary of hidden more box category names to hidden more box category elements
    function getHiddenCategoryNamesToHiddenCategoryElements() {
        var moreBoxCategoryNames = [];
        var hiddenOptionName;
        var hiddenCategoryNamesToHiddenCategoryElements = {}
        for (var i = 0; i < Object.keys(hiddenOptions).length; i++) {
            hiddenOptionName = hiddenOptions[i].firstElementChild.textContent;
            hiddenCategoryNamesToHiddenCategoryElements[hiddenOptionName] = hiddenOptions[i];
        }
        return hiddenCategoryNamesToHiddenCategoryElements;
    }

    // Get dictionary of category positions to menu category elements
    function getHeaderCategoryPositionsToHeaderElements() {
        var categoryPositionsToObjects = {};
        var headerCategoryNamesToHeaderElements = getHeaderCategoryNamesToHeaderElements();
        var categoryObj;
        var position;
        for (var i = 0; i < Object.keys(getHeaderCategoryNamesToHeaderElements()).length; i++) {
            categoryObj = headerCategoryNamesToHeaderElements[i];
            position = getVerticalPosition(categoryObj);
            categoryPositionsToObjects[position] = categoryObj;
        }
        return categoryPositionsToObjects;
    }

    // Get a list of sorted category positions
    function getSortedHeaderCategoryPositions() {
        var categoryPositions = Object.keys(getHeaderCategoryPositionsToHeaderElements());
        categoryPositions = categoryPositions.sort(function(a, b) {
            return a - b;
        });
        return categoryPositions;
    }

    // getters

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

    // helpers

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

    // main functions

    function toggleDropDownMenu(event) {
        event.stopPropagation();
        var srcElement = event.srcElement || event.target;
        while (srcElement) {
            if (srcElement == moreBox) {
                dropDownIsVisible = !dropDownIsVisible;
                moreOptionsUL.style.display = dropDownMenuStates[ dropDownIsVisible ];
                dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
                dropDownIcon.style.webkitTransform = dropDownIconStates[ dropDownIsVisible ];
                return;
            }
            srcElement = srcElement.parentNode;
        }
        dropDownIsVisible = false;
        moreOptionsUL.style.display = dropDownMenuStates[ dropDownIsVisible ];
        dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
        dropDownIcon.style.webkitTransform = dropDownIconStates[ dropDownIsVisible ];
        return;
    }

    // move the underbar on the category bar to the specified (li) element on the bar
    function adjustSlidingUnderBar(event, element) {
        var referenceX = visibleOptionsUL.getBoundingClientRect().left;
        var optionRect = (element || this).getBoundingClientRect();
        var deltaX = optionRect.left - referenceX;
        var width = optionRect.width;

        slidingUnderBar.style.width = width + "px";
        slidingUnderBar.style.marginLeft = deltaX + "px";
    }

    // move category bar underbar to more box element
    function slideUnderBarToMoreBox(event) {
        adjustSlidingUnderBar(null, moreBox);
    }

    // scroll to a specific header category
    function scrollToCategory(event) {
        var headerCategoryNamesToHeaderElements = getHeaderCategoryNamesToHeaderElements();
        var srcElement = event.srcElement;
        var className = srcElement.className;
        var categoryName = srcElement.textContent;
        var categoryPosition;
        var endPosition;

        // in case the li container was clicked instead of the span element
        if (className == "filter-option") {
            categoryName = srcElement.firstElementChild.textContent;
        }
        elementToScrollTo = headerCategoryNamesToHeaderElements[categoryName];
        endPosition = getVerticalPosition(elementToScrollTo) - getHeaderHeight() - getCategoryBarHeight();
        categoryPosition = getVerticalPosition(elementToScrollTo);
        currentCategory = categoryName;

        smoothScroll(endPosition, 300);
    }

    // Set the category bar to a fixed position
    function fixCategoryBar() {
        var newPaddingTop;
        var topHeaderViewPos = window.scrollY + getHeaderHeight();

        if (topHeaderViewPos >= defaultCategoryBarPosition && !categoryBarFixed) {
            newPaddingTop = String(getHeaderHeight() + getCategoryBarHeight()) + "px";
            document.body.style.paddingTop = newPaddingTop;
            categoryBar.style.top = String(getHeaderHeight()) + "px";
            categoryBar.style.position = "fixed";
            categoryBarFixed = true;
        } else if (topHeaderViewPos <= defaultCategoryBarPosition && categoryBarFixed) {
            newPaddingTop = String(getHeaderHeight()) + "px"
            document.body.style.paddingTop = newPaddingTop;
            categoryBar.style.top = "";
            categoryBar.style.position = "";
            categoryBarFixed = false;
        }
    }

    // Move the orange underbar in the category bar to the correct location depending on
    // what category area the user is currently in
    function detectCategoryScroll() {
        var categoryHeaderPositions = getCategoryHeaderPositions();
        var currentTopViewPosition = window.scrollY + getHeaderHeight() + getCategoryBarHeight();
        var newCategory = currentCategoryName;
        var categoryObject;
        var barCategoryObject;
        var catName;
        var catPosition;
        var newCategoryName;

        for (var i = 0; i < Object.keys(categoryHeaderPositions).length; i++) {
            catPosition = categoryHeaderPositions[i] - 10;
            if (currentTopViewPosition >= catPosition) {
                newCategory = catPosition;
            }
        }
        newCategoryName = categoryHeaderPositions

        if (newCategory != currentCategoryName) {
            console.log("new: " + newCategory);
            console.log("current: " + currentCategoryName);
            currentCategoryName = newCategory;
            categoryObject = getHeaderCategoryPositionsToObjects()[currentCategory];
            catName = categoryObject.textContent;

            if (barCategoryNames.indexOf(catName) > -1) {
                barCategoryObject = namesToBarCategories[catName];
                adjustSlidingUnderBar(null, barCategoryObject);
            } else {
                adjustSlidingUnderBar(null, moreBox);
            }
            console.log(currentCategory);
        }
    }

    function onScrollFunctions(event) {
        fixCategoryBar();
        detectCategoryScroll();
    }

    // reveal public pointers to private functions & properties
    return {
    };

})();