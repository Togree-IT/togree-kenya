// import M from '../lib/materialize/js/materialize.js';
document.addEventListener('DOMContentLoaded', function() {
    var collapsibles = document.querySelectorAll('.collapsible');
    if (collapsibles.length) {
        M.Collapsible.init(collapsibles);
    }

    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    if (dropdowns.length) {
        M.Dropdown.init(dropdowns, {
            onOpenStart: e => {
                var target = e;
                // Find the caret
                var caret = target.querySelector('i.material-icons');
                // change caret of the target
                if (caret) {
                    if (caret.innerText === 'expand_more') caret.innerText = 'expand_less';
                }
            },
            onCloseStart: e => {
                var target = e;
                // Find the caret
                var caret = target.querySelector('i.material-icons');
                // change caret of the target
                if (caret) {
                    if (caret.innerText === 'expand_less') caret.innerText = 'expand_more';
                }

            }
        });
    }
    var top_nav_menu_trigger = document.querySelectorAll('.top_nav_menu_trigger');
    if (top_nav_menu_trigger.length) {
        M.Dropdown.init(top_nav_menu_trigger, {
            hover: true,
            // outDuration: 4000,
            container: document.querySelector('.art-nav'),
            coverTrigger: false,
            onOpenStart: e => {
                var target = e;
                // Find the caret
                var caret = target.querySelector('i.material-icons');
                // change caret of the target
                if (caret) {
                    if (caret.innerText === 'expand_more') caret.innerText = 'expand_less';
                }
            },
            onCloseStart: e => {
                var target = e;
                // Find the caret
                var caret = target.querySelector('i.material-icons');
                // change caret of the target
                if (caret) {
                    if (caret.innerText === 'expand_less') caret.innerText = 'expand_more';
                }

            }
        });
    }


    // var carousels = document.querySelectorAll('.carousel');
    // var carouselInstance = M.Carousel.init(carousels, {
    //     duration: 100,
    //     dist: -100,
    //     noWrap: !0,
    //     // numVisible: 1,
    //     padding: 10,
    //     // fullWidth: !0,
    //     // indicators: !0,
    // });


});