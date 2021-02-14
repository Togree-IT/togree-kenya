document.addEventListener("DOMContentLoaded", e => {
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
            // hover: true,
            closeOnClick: !true,
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
    getLanguages();



    function getLanguages() {
        axios.get("<%= path%>language/all")
            .then(languages => {
                languages = languages.data;
                if (typeof '<%=language%>' !== "undefined" && typeof languages !== "undefined") {
                    const top_nav_languages = document.querySelector('#top_nav_languages');
                    top_nav_languages.innerHTML = '';
                    for (const key in languages) {

                        if (languages[key].active && languages[key].slogan !== '<%=language%>') {
                            lang_('@' + languages[key].slogan).then(data => {
                                top_nav_languages.innerHTML += `
                            <li>
                                <a href="<%= path %>language/choose/${languages[key].slogan}?ref=${window.location.pathname}&protocol=${window.location.protocol.split(':').join('').split('/').join('') }">
                                    ${data}
                                </a>
                            </li>`
                            })


                        }
                    }
                }
            })
    }
    initializeNavMenu();
    ScollNavDetector();
});