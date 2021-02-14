function lang_(_) {
    return axios.get("<%= path%>language/translate/<%= language%>", {
            params: {
                name: _
            }

        })
        .then(language => {
            language = language.data;
            return language

        }).catch(err => console.error(err))
}

function ScollNavDetector() {

    let didScroll,
        lastScrollTop = 0,
        delta = 5,
        nav = document.querySelector('nav'),
        navbarHeight = nav.offsetHeight;

    document.onscroll = () => {
        didScroll = true;
    };

    setInterval(() => {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 20);

    function hasScrolled() {
        let st = this.scrollY;

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.

        if (((st + window.innerHeight)) === (window.innerHeight)) {
            nav.classList.remove('fixed');
            // document.body.style.marginTop = 0 + 'px';
            return
        }
        if (st > lastScrollTop /* && st > navbarHeight */ ) {
            // Scroll Down
            nav.classList.remove('fixed');
            // document.body.style.marginTop = 0 + 'px';

        } else {
            // Scroll Up
            if ((st + window.innerHeight) < document.body.offsetHeight) {
                nav.classList.add('fixed');
                // document.body.style.marginTop = navbarHeight + 'px';

            }

        }

        lastScrollTop = st;
    }
}

function initializeNavMenu() {
    if (typeof M !== "undefined") {
        const navMenu = document.querySelector('#menu-nav');
        if (navMenu)
            M.Sidenav.init(navMenu);
    }
}