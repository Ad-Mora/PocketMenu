/**
 * Created by devinm on 6/9/16.
 */

//---------Toggle the More Options drop down menu--------
var moreOptions = (function(){

    // cache DOM
    var moreOptionsButton = document.querySelector("li.filter-option.more-options-options span");
    var moreOptionsList = moreOptionsButton.parentNode.querySelector("ul.more-filter-options-list");

    // bind events
    moreOptionsButton.addEventListener('click', toggleDropDownMenu);

    // private variables
    var dropDownIsVisible = false;
    var displayOptions = {true: "block", false: "none"};

    // private methods

    // public variables

    // public methods
    function toggleDropDownMenu(event) {
        console.log(event);
        dropDownIsVisible = !dropDownIsVisible;
        moreOptionsList.style.display = displayOptions[ dropDownIsVisible ];
    }

    // reveal public pointers to private functions & properties
    return {
        toggleDropDownMenu: toggleDropDownMenu
    };

})();