/**
 * Created by devinm on 6/9/16.
 */

//---------Toggle the More Options drop down menu--------
var moreOptions = (function(){

    /*----------cache DOM----------*/

    // Visible category filter bar options
    var headerBar = document.querySelector("div.header");
    var filterBar = document.querySelector("div.filter-and-search-section");
    var visibleOptionsUL = document.querySelector("ul.filter-options-list");
    var allVisibleOptionLI = visibleOptionsUL.querySelectorAll("li.filter-option");
    var slidingUnderBar = visibleOptionsUL.querySelector("hr.sliding-underbar");

    // More options menu
    var moreOptionsLI = visibleOptionsUL.querySelector("li.filter-option.more-options-options");
    if (moreOptionsLI) {
        var moreOptionsUL = moreOptionsLI.querySelector("ul.more-filter-options-list");
        var dropDownIcon = moreOptionsLI.querySelector("i.more-options-drop-down-icon");
    }

    // Get dictionary of category strings to category element objects
    var categoryHeaderObjects = document.querySelectorAll("h3.food-type-section-header");
    var categoryNamesToObject = {};
    for (var i = 0; i < categoryHeaderObjects.length; i++) {
        var categoryObj = categoryHeaderObjects[i];
        categoryNamesToObject[categoryObj.textContent] = categoryObj;
    }

    window.onscroll = onScrollFunctions;

    /*----------initial loading actions----------*/

    // Start off the page with the underbar taking up the full width of the first category item
    adjustSlidingUnderBar(null, allVisibleOptionLI[0])

    /* bind events */

    // drop down more options menu
    if (moreOptionsLI) {
        moreOptionsLI.addEventListener('click', toggleDropDownMenu);
    }

    // filter bar event listeners
    for (var i = 0; i < allVisibleOptionLI.length; i++) {
        allVisibleOptionLI[i].addEventListener('click', adjustSlidingUnderBar);
        allVisibleOptionLI[i].addEventListener('click', scrollToCategory);
    }

    /*----------variables----------*/

    var dropDownIsVisible = false;
    var dropDownMenuStates = {true: "block", false: "none"};
    var dropDownIconStates = {true: "rotate(180deg)", false: "rotate(0deg)"};
    var hideDropDownCorrectly = documentModule.addOnClickFunction(toggleDropDownMenu);

    // filter bar variables
    var filterSearchBarPos = getPosition(filterBar);
    var filterBarHeight = parseFloat(window.getComputedStyle(filterBar).getPropertyValue("height"), 10);
    var filterBarFixed = false;

    // header height
    var headerHeight = parseFloat(window.getComputedStyle(headerBar).getPropertyValue("height"), 10);


    /*----------functions----------*/
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

    function getPaddingTop() {
        style = window.getComputedStyle(document.body);
        paddingTop = style.getPropertyValue("padding-top");
        paddingTop = parseFloat(paddingTop, 10);
        return paddingTop;
    }

    function getPosition(element) {
        elementRect = element.getBoundingClientRect();
        bodyRect = document.body.getBoundingClientRect();
        offset = elementRect.top - bodyRect.top;
        return offset;
    }

    // Top here is defined as from the top of the visible document
    function getPositionFromTop(element) {
        elementPositionFromTopViewport = element.getBoundingClientRect().top;
        offset = window.scrollY + elementPositionFromTopViewport;
        return offset;
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

    function scrollToCategory(event) {
        var srcElement = event.srcElement;
        var className = srcElement.className;
        var category = srcElement.textContent;
        if (className == "filter-option") {
            category = srcElement.firstElementChild.textContent;
        }

        elementToScrollTo = categoryNamesToObject[category];
        position = getPosition(elementToScrollTo) - getPaddingTop();
        smoothScroll(position, 300);
    }

    function onScrollFunctions(event) {
        var paddingTop = getPaddingTop();
        var newPaddingTop;
        var topHeaderViewPos = window.scrollY + headerHeight;

        if (topHeaderViewPos >= filterSearchBarPos && !filterBarFixed) {
//            newPaddingTop = String(paddingTop + filterBarHeight) + "px";
            newPaddingTop = String(paddingTop + 45) + "px";
            document.body.style.paddingTop = newPaddingTop;
            filterBarFixed = true;
            filterBar.style.top = String(headerHeight) + "px";
            filterBar.style.position = "fixed";
            console.log("filter bar make fixed");
        } else if (topHeaderViewPos < filterSearchBarPos && filterBarFixed) {
            newPaddingTop = String(headerHeight) + "px"
            document.body.style.paddingTop = newPaddingTop;
            filterBarFixed = false;
            filterBar.style.top = "";
            filterBar.style.position = "";
            console.log("filter bar make not fixed");
        }

    }




    // reveal public pointers to private functions & properties
    return {
    };


})();