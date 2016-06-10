/**
 * Created by devinm on 6/9/16.
 */

//---------Toggle the More Options drop down menu--------
var moreOptions = (function(){

    // cache DOM
    var visibleOptionsUL = document.querySelector("ul.filter-options-list");
    var allVisibleOptionLI = visibleOptionsUL.querySelectorAll("li.filter-option");
    var moreOptionsLI = visibleOptionsUL.querySelector("li.filter-option.more-options-options");
    var moreOptionsUL = moreOptionsLI.querySelector("ul.more-filter-options-list");
    var dropDownIcon = moreOptionsLI.querySelector("i.more-options-drop-down-icon");
    var slidingUnderBar = visibleOptionsUL.querySelector("hr.sliding-underbar");

    // bind events
    moreOptionsLI.addEventListener('click', toggleDropDownMenu);
    for (var i = 0; i < allVisibleOptionLI.length; i++) {
        allVisibleOptionLI[i].addEventListener('click', adjustSlidingUnderBar);
    }

    // private variables
    var dropDownIsVisible = false;
    var dropDownMenuStates = {true: "block", false: "none"};
    var dropDownIconStates = {true: "rotate(180deg)", false: "rotate(0deg)"};
    var referenceX = visibleOptionsUL.getBoundingClientRect().left;

    // private methods
    function toggleDropDownMenu(event) {
        dropDownIsVisible = !dropDownIsVisible;
        moreOptionsUL.style.display = dropDownMenuStates[ dropDownIsVisible ];
        dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
    }

    function adjustSlidingUnderBar(event) {
        var optionRect = this.getBoundingClientRect();
        var deltaX = optionRect.left - referenceX;
        var width = optionRect.width;

        slidingUnderBar.style.width = width + "px";
        slidingUnderBar.style.marginLeft = deltaX + "px";
    }

    // public variables

    // public methods

    // reveal public pointers to private functions & properties
    return {

    };

})();