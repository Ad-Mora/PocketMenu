/**
 * Created by devinm on 6/9/16.
 */

//---------Toggle the More Options drop down menu--------
var moreOptions = (function(){

    // cache DOM
    var moreOptionsButton = document.querySelector("li.filter-option.more-options-options");
    var moreOptionsList = moreOptionsButton.querySelector("ul.more-filter-options-list");
    var dropDownIcon = moreOptionsButton.querySelector("i.more-options-drop-down-icon");

    // bind events
    moreOptionsButton.addEventListener('click', toggleDropDownMenu);

    // private variables
    var dropDownIsVisible = false;
    var displayOptions = {true: "block", false: "none"};
    var dropDownIconStates = {true: "rotate(180deg)", false: "rotate(0deg)"};

    // private methods

    // public variables

    // public methods
    function toggleDropDownMenu(event) {
        dropDownIsVisible = !dropDownIsVisible;
        moreOptionsList.style.display = displayOptions[ dropDownIsVisible ];
        dropDownIcon.style.transform = dropDownIconStates[ dropDownIsVisible ];
    }

    // reveal public pointers to private functions & properties
    return {
        toggleDropDownMenu: toggleDropDownMenu
    };

})();