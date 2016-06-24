/**
 * Created by devinm on 6/9/16.
 */

//---------Toggle the More Options drop down menu--------
var moreOptions = (function(){

    // cache DOM
    var visibleOptionsUL = document.querySelector("ul.filter-options-list");
    var allVisibleOptionLI = visibleOptionsUL.querySelectorAll("li.filter-option");
    var slidingUnderBar = visibleOptionsUL.querySelector("hr.sliding-underbar");

    var moreOptionsLI = visibleOptionsUL.querySelector("li.filter-option.more-options-options");
    if (moreOptionsLI) {
        var moreOptionsUL = moreOptionsLI.querySelector("ul.more-filter-options-list");
        var dropDownIcon = moreOptionsLI.querySelector("i.more-options-drop-down-icon");
    }

    // Start off the page with the underbar taking up the full width of the first category item
    adjustSlidingUnderBar(null, allVisibleOptionLI[0])

    // bind events
    if (moreOptionsLI) {
        moreOptionsLI.addEventListener('click', toggleDropDownMenu);
    }

    for (var i = 0; i < allVisibleOptionLI.length; i++) {
        allVisibleOptionLI[i].addEventListener('click', adjustSlidingUnderBar);
        allVisibleOptionLI[i].addEventListener('click', scrollToCategory);
    }

    // private variables
    var dropDownIsVisible = false;
    var dropDownMenuStates = {true: "block", false: "none"};
    var dropDownIconStates = {true: "rotate(180deg)", false: "rotate(0deg)"};
    var hideDropDownCorrectly = documentModule.addOnClickFunction(toggleDropDownMenu);

    // private methods
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

    function scrollToCategory(event) {
        var srcElement = event.srcElement;
        var className = srcElement.className;
        var category = srcElement.innerHTML;
        if (className == "filter-option") {
            category = srcElement.firstElementChild.innerHTML;
        }
        alert(category)
    }


    // reveal public pointers to private functions & properties
    return {
    };
})();