/**
 * Created by devinm on 6/9/16.
 */

//---------Toggle the More Options drop down menu--------
var moreOptions = (function(){

    /*--------------------------------------------------*/
    /*----------Global Variables and DOM Cache----------*/
    /*--------------------------------------------------*/

    var moreBoxPresent = document.querySelector("li.more-options-options") != null

    // DOM objects

    // Category bar objects
    var headerBar = document.querySelector("div.header");
    var categoryBar = document.querySelector("div.filter-and-search-section");
    var categoryHeaderElements = document.querySelectorAll("h3.food-type-section-header");
    var visibleOptionsUL = document.querySelector("ul.filter-options-list");
    var allVisibleOptionsLI = visibleOptionsUL.querySelectorAll("li.filter-option");
    var slidingUnderBar = visibleOptionsUL.querySelector("hr.sliding-underbar");

    // More options box objects
    var moreBox;
    var moreOptionsUL;
    var dropDownIcon;
    var hiddenOptions;
    if (moreBoxPresent) {
        moreBox = visibleOptionsUL.querySelector("li.more-options-options");
        moreOptionsUL = moreBox.querySelector("ul.more-filter-options-list");
        dropDownIcon = moreBox.querySelector("i.more-options-drop-down-icon");
        hiddenOptions = moreBox.querySelectorAll("li.hidden-filter-option");
    }

    // Global variables
    var dropDownIsVisible = false;
    var dropDownMenuStates = {true: "block", false: "none"};
    var dropDownIconStates = {true: "rotate(180deg)", false: "rotate(0deg)"};

    var defaultCategoryBarPosition = getVerticalPosition(categoryBar);
    var currentCategoryName = categoryHeaderElements[0].textContent;
    var categoryBarFixed = false;

    // headerCategoryExtraScrollDetectHeight must be larger than headerCategoryScrollToPadding
    var headerCategoryExtraScrollDetectHeight = 24;
    var headerCategoryScrollToPadding = 8;

    /*--------------------------------------------------*/
    /*----------Initial loading actions----------*/
    /*--------------------------------------------------*/

    // Start off the page with the underbar taking up the full width of the first category item
    adjustSlidingUnderBar(null, allVisibleOptionsLI[0])

    /*--------------------------------------------------*/
    /*----------Bind events----------*/
    /*--------------------------------------------------*/

    // drop down more options menu
    if (moreBoxPresent) {
        moreBox.addEventListener('click', toggleDropDownMenu);
    }

    // category bar event listeners
    for (var i = 0; i < allVisibleOptionsLI.length; i++) {
        allVisibleOptionsLI[i].addEventListener('click', adjustSlidingUnderBar);
        allVisibleOptionsLI[i].addEventListener('click', scrollToCategory);
    }
    if (moreBoxPresent) {
        for (var i = 0; i < hiddenOptions.length; i++) {
            hiddenOptions[i].addEventListener('click', scrollToCategory);
            hiddenOptions[i].addEventListener('click', slideUnderBarToMoreBox);
        }
        // click anywhere to get rid of drop down menu
        var hideDropDownCorrectly = documentModule.addOnClickFunction(toggleDropDownMenu);
    }

    // perform actions whenever the window is scrolled
    document.addEventListener("scroll", onScrollFunctions);

    /*--------------------------------------------------*/
    /*----------Functions----------*/
    /*--------------------------------------------------*/

    /*-----Get dictionaries and lists-----*/

    // Get dictionary of category names to element header categories
    function getHeaderCategoryNamesToHeaderElements() {
        var categoryNamesToHeaderElements = {};
        for (var i = 0; i < Object.keys(categoryHeaderElements).length; i++) {
            categoryNamesToHeaderElements[categoryHeaderElements[i].textContent] = categoryHeaderElements[i];
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

    // Get a dictionary of category header positions to category names
    function getCategoryHeaderPositionsToCategoryNames() {
        var headerCategoryNamesToHeaderElements = getHeaderCategoryNamesToHeaderElements();
        var categoryHeaderPositionsToCategoryNames = {};
        var element;
        var position;
        for (var categoryName in headerCategoryNamesToHeaderElements) {
            if (headerCategoryNamesToHeaderElements.hasOwnProperty(categoryName)) {
                element = headerCategoryNamesToHeaderElements[categoryName];
                position = getVerticalPosition(element);
                categoryHeaderPositionsToCategoryNames[position] = element.textContent;
            }
        }
        return categoryHeaderPositionsToCategoryNames;
    }

    // Get a list of sorted category positions
    function getSortedHeaderCategoryPositions() {
        var categoryPositions = Object.keys(getCategoryHeaderPositionsToCategoryNames());
        categoryPositions = categoryPositions.sort(function(a, b) {
            return a - b;
        });
        return categoryPositions;
    }

    /*-----Getters-----*/

    function getHeaderHeight() {
        var headerHeight = window.getComputedStyle(headerBar).getPropertyValue("height");
        return parseFloat(headerHeight, 10);
    }

    function getCategoryBarHeight() {
        var categoryBarHeight = window.getComputedStyle(categoryBar).getPropertyValue("height");
        return parseFloat(categoryBarHeight, 10);
    }

    // Vertical position is defined as from the top of the visible document (top is position 0)
    function getVerticalPosition(element) {
        var elementRect = element.getBoundingClientRect();
        var bodyRect = document.body.getBoundingClientRect();
        var offset = elementRect.top - bodyRect.top;
        return offset;
    }

    /*-----Helpers-----*/

    function getCategoryNameFromPosition(position) {
        var categoryHeaderPositionsToCategoryNames = getCategoryHeaderPositionsToCategoryNames();
        var sortedPositionsList = getSortedHeaderCategoryPositions();
        var currentPosition = sortedPositionsList[0];
        var categoryName;
        var currentPosition;
        for (var i = 0; i < sortedPositionsList.length; i++) {
            if (position >= sortedPositionsList[i]) {
                currentPosition = sortedPositionsList[i];
            }
        }
        categoryName = categoryHeaderPositionsToCategoryNames[currentPosition];
        return categoryName;
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

    /*-----Main Functions-----*/

    function toggleDropDownMenu(event) {
        event.stopPropagation();
        var srcElement = event.srcElement || event.target;
        while (srcElement) {
            if (srcElement == moreBox) {
                dropDownIsVisible = !dropDownIsVisible;
                moreOptionsUL.style.display = dropDownMenuStates[ dropDownIsVisible ];
                dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
                dropDownIcon.style.webkitTransform = dropDownIconStates[ dropDownIsVisible ];
                dropDownIcon.style.mozTransform = dropDownIconStates[ dropDownIsVisible ];
                return;
            }
            target = target.parentNode;
        }
        dropDownIsVisible = false;
        moreOptionsUL.style.display = dropDownMenuStates[ dropDownIsVisible ];
        dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
        dropDownIcon.style.webkitTransform = dropDownIconStates[ dropDownIsVisible ];
        dropDownIcon.style.mozTransform = dropDownIconStates[ dropDownIsVisible ];
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

    // Set the category bar to a fixed position
    function fixCategoryBar() {
        // we only care if we are in desktop view
        if (window.innerWidth >= 800) {
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
        if (className == "filter-option" || className == "hidden-filter-option") {
            categoryName = srcElement.firstElementChild.textContent;
        }
        elementToScrollTo = headerCategoryNamesToHeaderElements[categoryName];
        endPosition = getVerticalPosition(elementToScrollTo) - getHeaderHeight() - getCategoryBarHeight();
        categoryPosition = getVerticalPosition(elementToScrollTo);
        currentCategoryName = categoryName;

        smoothScroll(endPosition - headerCategoryScrollToPadding, 300);
    }

    // Move the orange underbar in the category bar to the correct location depending on
    // what category area the user is currently in

    // TODO: look out for expensive function calls here; this is called every time the page scrolls
    function detectCategoryScroll() {
        var currentTopViewPosition = window.scrollY + getHeaderHeight() + getCategoryBarHeight();
        var barCategoryNamesToBarElements = getBarCategoryNamesToBarElements();
        var barCategoryNames = Object.keys(barCategoryNamesToBarElements);
        var newCategoryName = currentCategoryName;
        var barCategoryElement;

        newCategoryName = getCategoryNameFromPosition(currentTopViewPosition + headerCategoryExtraScrollDetectHeight);

        if (newCategoryName != currentCategoryName) {
            currentCategoryName = newCategoryName;

            if (barCategoryNames.indexOf(newCategoryName) > -1) {
                barCategoryElement = barCategoryNamesToBarElements[newCategoryName];
                adjustSlidingUnderBar(null, barCategoryElement);
            } else {
                adjustSlidingUnderBar(null, moreBox);
            }
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