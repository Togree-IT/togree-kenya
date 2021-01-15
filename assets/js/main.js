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

    var update_tabs = document.querySelectorAll('.tabs');
    if (update_tabs.length) {
        M.Tabs.init(update_tabs);
    }

    const loader = document.querySelector('#loader');


    function showLoading() {
        loader.classList.add("display");
        setTimeout(() => {
            loader.classList.remove("display");
        }, 5000);
    }


    function hideLoading() {
        loader.classList.remove("display");
    }




    const fetchProducts = new Promise((resolve, reject) => {

        resolve((_ => {
            let index = 1;
            const prodTemp = (data) => {

                return `   <div class="products__container">
                        <a class="products__container__icon" href="#"><i class="lni lni-cart "></i></a>

                        <div class="products__container__img">
                            <img class="products__container__pic" src="${data.path}" alt="kt202">
                            
                        </div>

                        <a href="#">
                            <h3 class="products__container__producttitle">${data.productTitle}</h3>
                        </a>

                        <div class="products__container__productdetails">

                            <div class="products__container__textcontainer">
                                <p class="products__container__text"><span>${data.productPrice}&nbsp;${data.currency}</span></p>
                                <p class="products__container__latertext"><span> <strike> ${data.productOldPrice}&nbsp;${data.currency}</strike></span></p>
                            </div>

                            <button class="products__container__btn"><a class="products__container__link" href="../products/checkout/${index}">BUY NOW</a></button>


                        </div>
                    </div>`;
            };

            showLoading();
            fetch('http://127.0.0.1:5501/productData.json')

            .then(data => data.json())
                .then(data => {
                    //  Get the element
                    const productsContainer = document.querySelector('#products_container_wrp');
                    if (data.length) {
                        productsContainer.innerHTML = '';
                        for (let product of data) {
                            productsContainer.insertAdjacentHTML("afterbegin", prodTemp(product))
                        }
                    }
                })
                .catch(err => reject(err))
        })());
    })



    fetchProducts.then(() => {
        console.log('Data loaded');
        // Do othe tings
    }).catch(err => console.log(err))



    const fetchContent = new Promise((resolve, rejct) => {


        resolve((_ => {

            const asideTabTemp = (data, def) => {
                // id="defaultOpen"

                defTb = () => {
                    if (def === null && (typeof def === "string" && def.trim() !== '')) {
                        return ''
                    }
                    return "id='defaultOpen'";
                }

                return `<button class="tab__wrapper__container__tablinks tablinks " onclick="openTab(event, '${data.contentid}')"  ${defTb()} > ${data.title} </button>
                `;

                // <button class="tab__wrapper__container__tablinksnumber  tablinks" onclick="openTab(event, '${data.contentid}')"  ${defTb()} > ${data.titlenumber} </button>


            };

            const tabTemp = (data) => {

                if (typeof data.applyLink === "string" && data.applyLink.trim() === '') {
                    return `
                    
                    <div id="${data.contentid}" class="tab__wrapper__container__tabcontent tabcontent">

                                        <h3 class="tab__wrapper__container__title">${data.stepTitle}</h3>

                                        <p class="tab__wrapper__container__text">
                                            <span>${data.stepDescription}</span>
                                        </p>

                        <div class="tab__wrapper__container__gallery">

                            <h4 class="tab__wrapper__container__gallerytitle">Explore Our Tutorial</h4>

                            <div class="tab__wrapper__container__gallerycontainer">

                                <div class="tab__wrapper__container__galleryvideo">

                                    <div class="tab__wrapper__container__videowrapper">
                                        <video id="my-video" class="vjs-teaching video-js" controls preload="auto" poster="${data.firstVideoPoster}" data-setup="{}">
                                                                <source src="${data.firstPath}"/>
                                                                <p class="vjs-no-js">
                                                                To view this video please enable JavaScript, and consider upgrading to a
                                                                web browser that
                                                                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                                                                </p>
                                                            </video>
                                    </div>


                                    <a class="tab__wrapper__container__gallerylink" href="#"><span>${data.videoTitle1}</span> </a>

                                </div>

                                <div class="tab__wrapper__container__galleryvideo">

                                    <div class="tab__wrapper__container__videowrapper">
                                        <video id="my-video" class="vjs-teaching video-js" controls preload="auto" poster="${data.secondVideoPoster}" data-setup="{}">
                                                                <source src="${data.secondPath}" />
                                                                <p class="vjs-no-js">
                                                                To view this video please enable JavaScript, and consider upgrading to a
                                                                web browser that
                                                                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                                                                </p>
                                                            </video>
                                    </div>


                                    <a class="tab__wrapper__container__gallerylink" href="#"><span>${data.videoTitle2}</span> </a>

                                </div>

                            </div>

                        </div>

                    </div> `;

                }
                return ` <div id="${data.contentid}" class="tab__wrapper__container__tabcontent tabcontent">
                    <div class="tab__wrapper__container__tabheader">
                        <h3 class="tab__wrapper__container__tabheadertitle">Join us to build great things</h3>
                        <p class="tab__wrapper__container__tabsubheader"> <span>Become  a Togree Reseller</span></p>
                    </div>

                    <div class="tab__wrapper__container__tabcta">
                        <p class="tab__wrapper__container__tabtext">
                            <span>Our Reseller programme is designed to help improve and grow fellow entrepreneurs who help enhance safety by driving marketing and building a longterm relationship with the end-users. Our offers for resellers comes with a custom build tracking platform, and 24/7 hrs customer support centre is open for both resellers and end-users anything our support is needed.</span>
                        </p>

                    <div class="tab__wrapper__container__tabbtns">
                        <a class="tab__wrapper__container__tabbtn" href="#">APPLY NOW </a>
                        <a class="tab__wrapper__container__tabbtn" href="#">CHECK APPLICATION</a>
                    </div>


                </div>


                </div>`;
            };

            fetch('http://127.0.0.1:5501/steps.json')
                .then(data => data.json())
                .then(data => {
                    //  Get the element
                    const asiideTabContainer = document.querySelector('#asideTabs');
                    const tabContainer = document.querySelector('#tabcontainer');

                    if (data.length) {

                        if (tabContainer) tabContainer.innerHTML = '';
                        for (let tabcontent of data) {
                            // data.status  = tabcontent.status;
                            for (let [index, _data] of tabcontent.data.entries()) {
                                let defTabOpen = null;
                                if (index < 1) {

                                    defTabOpen = 'defaultOpen';
                                }

                                _data.status = tabcontent.status;
                                asiideTabContainer.insertAdjacentHTML("afterbegin", asideTabTemp(_data, defTabOpen));
                                tabContainer.insertAdjacentHTML("afterbegin", tabTemp(_data))
                                    // Display thedefault TAB
                                if (document.getElementById("defaultOpen")) {
                                    document.getElementById("defaultOpen").click();
                                }
                            }

                        }


                    }
                })
                .catch(err => console.error(err))


        })());

    })

    fetchContent.then(() => {
        console.log('Data loaded');
        // Do othe tings
    }).catch(err => console.log(err))




});



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

}