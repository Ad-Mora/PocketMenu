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
    moreOptionsLI.addEventListener('click', _toggleDropDownMenu);
    for (var i = 0; i < allVisibleOptionLI.length; i++) {
        allVisibleOptionLI[i].addEventListener('click', _adjustSlidingUnderBar);
    }

    // Start off the page with the underbar taking up the full width of the first category item
    _adjustSlidingUnderBar(null, allVisibleOptionLI[0])

    // private variables
    var dropDownIsVisible = false;
    var dropDownMenuStates = {true: "block", false: "none"};
    var dropDownIconStates = {true: "rotate(180deg)", false: "rotate(0deg)"};
    var hideDropDownCorrectly = documentModule.addOnClickFunction(_toggleDropDownMenu);

    // public variables

    // private methods
    function _toggleDropDownMenu(event) {
        event.stopPropagation();
        console.log(event);
        var srcElement = event.srcElement || event.target;
        while (srcElement) {
            if (srcElement == moreOptionsLI) {
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

    function _adjustSlidingUnderBar(event, element) {

        var referenceX = visibleOptionsUL.getBoundingClientRect().left;
        var optionRect = (element || this).getBoundingClientRect();
        var deltaX = optionRect.left - referenceX;
        var width = optionRect.width;

        slidingUnderBar.style.width = width + "px";
        slidingUnderBar.style.marginLeft = deltaX + "px";
    }

    // function _hideDropDownAfterOpened(event) {
    //     var srcElement = event.srcElement;
    //     while (srcElement) {
    //         if (srcElement == moreOptionsLI) {
    //             console.log("clicked inside");
    //             return;
    //         }
    //         srcElement = srcElement.parentNode;
    //     }
    //     console.log("clicked outside");
    //
    // }

    // public methods

    // reveal public pointers to private functions & properties
    return {

    };

})();