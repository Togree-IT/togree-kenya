// import M from '../lib/materialize/js/materialize.js';
document.addEventListener('DOMContentLoaded', function() {
    var collapsibles = document.querySelectorAll('.collapsible');
    if (collapsibles.length) {
        M.Collapsible.init(collapsibles);
    }

    initializeTabs();

});


function initializeTabs() {
    if (typeof M !== "undefined") {
        const update_tabs = document.querySelectorAll('.tabs');

        if (update_tabs.length) {
            M.Tabs.init(update_tabs);
        }
    }
}


// product page tab function
function openTab(evt, tabName) {

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";

    }


    tablinks = document.getElementsByClassName("tab__wrapper__container__tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", " ");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    // localStorage.
}