/**
 * Created by devinm on 6/9/16.
 */

//---------Toggle the More Options drop down menu--------
var moreOptions = (function(){

    /*--------------------------------------------------*/
    /*----------Global Variables and DOM Cache----------*/
    /*--------------------------------------------------*/

    var moreBoxPresent = document.querySelector("li.more-options-options") != null;

    // DOM objects
    var backgroundImage = document.querySelector("div.header-background");

    // Category bar objects
    var headerBar = document.querySelector("div.header");
    var categoryHeaderElements = document.querySelectorAll("h3.food-type-section-header");
    var categoryBar = document.querySelector("div.filter-and-search-section");
    var visibleOptionsUL = categoryBar.querySelector("ul.filter-options-list");
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

    // category names to header elements
    var headerCategoryNamesToHeaderElements = getHeaderCategoryNamesToHeaderElements()

    // bar category names to bar elements
    var barCategoryNamesToBarElements = getBarCategoryNamesToBarElements()

    // headerCategoryExtraScrollDetectHeight must be larger than headerCategoryScrollToPadding
    var headerCategoryExtraScrollDetectHeight = 20;
    var headerCategoryScrollToPadding = 10;

    var desktopWidth = 800;

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
        var categoryNamesToHeaderElements;
        if (categoryNamesToHeaderElements == undefined) {
            categoryNamesToHeaderElements = {};
            for (var i = 0; i < categoryHeaderElements.length; i++) {
                categoryNamesToHeaderElements[categoryHeaderElements[i].textContent] = categoryHeaderElements[i];
            }
        }
        return categoryNamesToHeaderElements;
    }

    // Get dictionary of visible bar category names to visible bar category elements
    function getBarCategoryNamesToBarElements() {
        var visibleBarCategoryNameToVisibleBarCategoryElement;
        if (visibleBarCategoryNameToVisibleBarCategoryElement == undefined) {
            visibleBarCategoryNameToVisibleBarCategoryElement = {}
            var visibleCategoryName;
            for (var i = 0; i < allVisibleOptionsLI.length; i++) {
                visibleCategoryName = allVisibleOptionsLI[i].firstElementChild.textContent;
                visibleBarCategoryNameToVisibleBarCategoryElement[visibleCategoryName] = allVisibleOptionsLI[i];
            }
        }
        return visibleBarCategoryNameToVisibleBarCategoryElement;
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

    /*-----Helpers-----*/

    function getHeaderHeight() {
        var headerHeight = window.getComputedStyle(headerBar).getPropertyValue("height");
        return parseFloat(headerHeight, 10);
    }

    function getCategoryBarHeight() {
        var categoryBarHeight = window.getComputedStyle(categoryBar).getPropertyValue("height");
        var borderTopHeight = window.getComputedStyle(categoryBar).getPropertyValue("border-top-width");
        var borderBottomHeight = window.getComputedStyle(categoryBar).getPropertyValue("border-bottom-width");

        categoryBarHeight = parseFloat(categoryBarHeight, 10);
        borderBottomHeight = parseFloat(borderBottomHeight, 10);
        borderTopHeight = parseFloat(borderTopHeight, 10);
        return categoryBarHeight + borderBottomHeight + borderTopHeight;
    }

    // Vertical position is defined as from the top of the visible document (top is position 0)
    function getVerticalPosition(element) {
        var elementRect = element.getBoundingClientRect();
        var bodyRect = document.body.getBoundingClientRect();
        var offset = elementRect.top - bodyRect.top;
        return offset;
    }

    function getCategoryNameFromPosition(position) {
        var categoryHeaderPositionsToCategoryNames = getCategoryHeaderPositionsToCategoryNames();
        var sortedPositionsList = getSortedHeaderCategoryPositions();
        var categoryName;
        var currentPosition = sortedPositionsList[0];
        for (var i = 0; i < sortedPositionsList.length; i++) {
            if (position >= sortedPositionsList[i]) {
                currentPosition = sortedPositionsList[i];
            }
        }
        categoryName = categoryHeaderPositionsToCategoryNames[currentPosition];
        return categoryName;
    }

    /*-----Main Functions-----*/
    function toggleDropDownMenu(event) {
        event.stopPropagation();
        var target = event.currentTarget;

        if (target != moreBox) {
            dropDownIsVisible = false;
        } else {
            dropDownIsVisible = !dropDownIsVisible;
        }
        moreOptionsUL.style.display = dropDownMenuStates[ dropDownIsVisible ];
        dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
        dropDownIcon.style.webkitTransform = dropDownIconStates[ dropDownIsVisible ];
        dropDownIcon.style.mozTransform = dropDownIconStates[ dropDownIsVisible ];
    }

    // move the underbar on the category bar to the specified (li) element on the bar
    function adjustSlidingUnderBar(event, element) {
        categoryBar.style.display = "block";
        var referenceX = visibleOptionsUL.getBoundingClientRect().left;
        var optionRect = (element || this).getBoundingClientRect();
        categoryBar.style.display = "";
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
        if (backgroundImage.getBoundingClientRect().bottom <= getHeaderHeight() && !categoryBarFixed) {
            categoryBar.classList.add("fix-filter-search");
            document.body.classList.add("fix-filter-search");
            categoryBarFixed = true;
        } else if (backgroundImage.getBoundingClientRect().bottom >= getHeaderHeight() + getCategoryBarHeight()
                && categoryBarFixed) {
            categoryBar.classList.remove("fix-filter-search");
            document.body.classList.remove("fix-filter-search");
            categoryBarFixed = false;
        }
    }

    // duration is in milliseconds
    function smoothScroll(element, duration) {

        function getEndPosition() {
            var endPosition = getVerticalPosition(element) - getHeaderHeight() - headerCategoryScrollToPadding;
            if (window.innerWidth >= desktopWidth) {
                endPosition -= getCategoryBarHeight();
            }
            return endPosition;
        }
        var endPosition = getEndPosition();
        window.scrollTo(0, endPosition);

////      var startPosition = window.scrollY + getHeaderHeight() + getCategoryBarHeight();
//        var startPosition = window.scrollY;
//        var endPosition = getEndPosition();
//        var distance = endPosition - startPosition
//        var increment = distance/(duration/3);
//
//        var animateScroll = function () {
//            window.scrollBy(0, increment);
//
//            var currentPosition = window.scrollY;
//            if (increment >= 0) {
//                if ( (currentPosition >= (endPosition - increment)) ||
//                ((window.innerHeight + currentPosition) >= document.body.getBoundingClientRect().height) ) {
//                    clearInterval(runAnimation);
//                }
//            } else {
//                if (currentPosition <= endPosition || currentPosition <= 0) {
//                    clearInterval(runAnimation);
//                }
//            }
//        };
//        var runAnimation = setInterval(animateScroll, 3);


// TEST STUFF BELOW

//        var startPosition = window.scrollY;
//        var endPosition = getEndPosition();
//        var distance = endPosition - startPosition
//        var increment = distance/duration;
//
//        var animateScroll = function () {
//            window.scrollBy(0, increment);
//
//            var currentPosition = window.scrollY;
//            if (increment >= 0) {
//                if ( (currentPosition >= (endPosition - increment)) ||
//                ((window.innerHeight + currentPosition) >= document.body.getBoundingClientRect().height) ) {
//                    clearInterval(runAnimation);
//                }
//            } else {
//                if (currentPosition <= endPosition || currentPosition <= 0) {
//                    clearInterval(runAnimation);
//                }
//            }
//        };
//        var runAnimation = setInterval(animateScroll, 10);
    }

    // scroll to a specific header category
    function scrollToCategory(event) {
        var srcElement = event.currentTarget;
        var categoryName = srcElement.getAttribute("data-category-name");
        var elementToScrollTo = headerCategoryNamesToHeaderElements[categoryName];
        smoothScroll(elementToScrollTo, 300);
    }

    // Move the orange underbar in the category bar to the correct location depending on
    // what category area the user is currently in
    // TODO: look out for expensive function calls here; this is called every time the page scrolls
    function detectCategoryScroll() {
        var currentTopViewPosition = window.scrollY + getHeaderHeight() + getCategoryBarHeight();
        var barCategoryNamesToBarElements = getBarCategoryNamesToBarElements();
        var barCategoryNames = Object.keys(barCategoryNamesToBarElements);
        var barCategoryElement;

        var newCategoryName = getCategoryNameFromPosition(currentTopViewPosition + headerCategoryExtraScrollDetectHeight);

        if (newCategoryName != currentCategoryName) {
            currentCategoryName = newCategoryName;
            var categoryIndex = barCategoryNames.indexOf(newCategoryName);

            // for desktop filterSearchBar
            if (categoryIndex > -1) {
                barCategoryElement = barCategoryNamesToBarElements[newCategoryName];
                adjustSlidingUnderBar(null, barCategoryElement);
            }
            else if (moreBoxPresent) {
                adjustSlidingUnderBar(null, moreBox);
            }

            // for mobile categories menu
            mobileCategoriesMenu.changeHighlightedMenuCategory(newCategoryName);
        }
    }

    function onScrollFunctions(event) {
        fixCategoryBar();
        detectCategoryScroll();
    }

    /*--------Function for the SearchBar-------------*/
    var searchBarContainer = categoryBar.querySelector("form.current-page-search-wrapper");
    var searchInput = searchBarContainer.querySelector("input.current-page-search-bar");
    var selectSearchType = searchBarContainer.querySelector("select.select-search-type");
    var suggestionsList = searchBarContainer.querySelector("ul.filter-search-suggestions-list");

    searchInput.addEventListener('focus', function (event) {
        desktopHeaderSearch.displaySearchSuggestionsList(event, suggestionsList);
    });
    searchInput.addEventListener('keyup', function(event) {
        var destinationFile = event.target.getAttribute("data-autocomplete-suggestions-href");
        var searchType = selectSearchType.value;
        desktopHeaderSearch.queryForSuggestions(event, searchInput, suggestionsList, destinationFile, searchType);
    });
    documentModule.addOnClickFunction(function (event) {
        desktopHeaderSearch.selectSuggestionsOrBlurEvent(event, searchInput, searchBarContainer, suggestionsList);
    });

    // reveal public pointers to private functions & properties
    return {
        scrollToCategory: scrollToCategory
    };

})();