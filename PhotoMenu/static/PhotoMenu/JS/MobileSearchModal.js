/**
 * Created by devinm on 6/15/16.
 */
var mobileSearchModal = (function(){
    // cached DOM
    var container = document.querySelector("div.mobile-modal-search-container");
    var backgroundOverlay = container.querySelector("div.mobile-search-background-overlay");
    var mainForm = container.querySelector("form.mobile-search-modal-form");
    var selectSearchType = container.querySelector("select.mobile-select-search-type");
    var searchBar = container.querySelector("input.mobile-modal-search-bar");
    var submitButton = container.querySelector("input.submit-mobile-search-modal");
    var cancelButton = container.querySelector("span.close-mobile-search-modal");

    // bind events
    cancelButton.addEventListener('click', closeSearchModal);
    backgroundOverlay.addEventListener('click', closeSearchModal);

    // private variables

    // public variables

    // private functions
    function closeSearchModal(event) {
         container.style.display = "none";
    }

    // public functions
    function openSearchModal(event) {
        // open search modal
            container.style.display = "block";

        // populate select options according to page

        // focus searchbar
    }

    // return public pointers to private variables & functions
    return {
        openSearchModal: openSearchModal
    };

})();