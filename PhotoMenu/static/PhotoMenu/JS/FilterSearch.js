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
        var target = event.target;
        while (target) {
            if (target == moreOptionsLI) {
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
    }

    function _adjustSlidingUnderBar(event) {
        var referenceX = visibleOptionsUL.getBoundingClientRect().left;
        var optionRect = this.getBoundingClientRect();
        var deltaX = optionRect.left - referenceX;
        var width = optionRect.width;

        slidingUnderBar.style.width = width + "px";
        slidingUnderBar.style.marginLeft = deltaX + "px";
    }

    // function _hideDropDownAfterOpened(event) {
    //     var target = event.target;
    //     while (target) {
    //         if (target == moreOptionsLI) {
    //             console.log("clicked inside");
    //             return;
    //         }
    //         target = target.parentNode;
    //     }
    //     console.log("clicked outside");
    //
    // }

    // public methods

    // reveal public pointers to private functions & properties
    return {

    };

})();