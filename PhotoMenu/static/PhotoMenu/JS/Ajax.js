/**
 * Created by devinm on 6/23/16.
 */
var ajax = (function (){
    // cache DOM

    // bind events

    // private variables
    var CSRF_COOKIE_NAME = "csrftoken";

    // public variables

    // private functions

    // public functions
    function getCSRFToken() {
        var documentCookies = "; " + document.cookie;
        var csrfTokenValue = documentCookies.split("; " + CSRF_COOKIE_NAME + "=")
            .pop() // only take the substring that contains value of csrf token
            .split(";") // the string has a trailing ';' and is of the form {cookieValue} + ';'
            .shift(); // remove the ';' so that you are only left with {cookieValue}
        return csrfTokenValue
    }
    
    function send_ajax_request(destination_file, json_data, csrftoken, postAjaxFunction) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //uncomment this to debug
                    // alert("AJAX->" + functionName + " says:\n" + xmlhttp.responseText);
                // return any data sent back here
                    postAjaxFunction(xmlhttp.responseText);
            }

        };

        xmlhttp.open("POST",destination_file,true);
        xmlhttp.setRequestHeader("X-CSRFToken", csrftoken);
        xmlhttp.send(JSON.stringify(json_data));
    }

    // return public pointers to private variables & functions
    return {
        send_ajax_request: send_ajax_request,
        getCSRFToken: getCSRFToken
    };

})();
