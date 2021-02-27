document.addEventListener('DOMContentLoaded', function() {

    // active btn script 
    const iconHeader = document.querySelector("#iconheader");
    const Icons = iconHeader.querySelectorAll(".shop__products__header__iconwrapper");

    for (let i = 0; i < Icons.length; i++) {
        Icons[i].addEventListener("click", ActiveIcon)

        function ActiveIcon() {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace("active", "");
            this.className += " active";
        }
    }

    ActiveIcon();

    // shop products fectch Logic
    const fetchShopProducts = new Promise((resolve, reject) => {

        resolve((_ => {

            const shopProdtemp = (data) => {
                let apllyProductRates = function() {
                    let stars = '';

                    for (let i = 1; i < 6; i++) {
                        if (i <= (+data.productRate)) {
                            stars += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" class="art_rate filled">
                            <g id="Group_1" data-name="Group 1" transform="translate(-582 -313)">
                            <rect  data-name="Rectangle 7" class="cls-1" width="21" height="21" transform="translate(582 313)" fill="none"/>
                            <path class="cls-2" fill="currentColor" d="M19.4,9.657a1.422,1.422,0,0,0-.789-2.426l-4.8-.7a.627.627,0,0,1-.473-.343L11.191,1.84a1.422,1.422,0,0,0-2.551,0L6.493,6.191a.628.628,0,0,1-.473.343l-4.8.7A1.422,1.422,0,0,0,.43,9.658L3.9,13.044a.629.629,0,0,1,.181.556l-.82,4.782a1.392,1.392,0,0,0,.31,1.153,1.437,1.437,0,0,0,1.753.346l4.294-2.258a.643.643,0,0,1,.585,0l4.3,2.258a1.407,1.407,0,0,0,.662.166,1.426,1.426,0,0,0,1.091-.511,1.392,1.392,0,0,0,.31-1.153l-.82-4.782a.628.628,0,0,1,.181-.556Z" transform="translate(582.598 312.953)"/>
                            </g>
                            </svg>`;
                        } else {
                            if ((+data.productRate) > 0)
                                stars += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" class="art_rate no-filled">
                            <g id="Group_1" data-name="Group 1" transform="translate(-582 -313)">
                            <rect  data-name="Rectangle 7" class="cls-1" width="21" height="21" transform="translate(582 313)" fill="none"/>
                            <path class="cls-2" fill="currentColor" d="M19.4,9.657a1.422,1.422,0,0,0-.789-2.426l-4.8-.7a.627.627,0,0,1-.473-.343L11.191,1.84a1.422,1.422,0,0,0-2.551,0L6.493,6.191a.628.628,0,0,1-.473.343l-4.8.7A1.422,1.422,0,0,0,.43,9.658L3.9,13.044a.629.629,0,0,1,.181.556l-.82,4.782a1.392,1.392,0,0,0,.31,1.153,1.437,1.437,0,0,0,1.753.346l4.294-2.258a.643.643,0,0,1,.585,0l4.3,2.258a1.407,1.407,0,0,0,.662.166,1.426,1.426,0,0,0,1.091-.511,1.392,1.392,0,0,0,.31-1.153l-.82-4.782a.628.628,0,0,1,.181-.556Z" transform="translate(582.598 312.953)"/>
                            </g>
                          </svg>`;

                        }
                    }

                    return stars
                }

                return `<div class="shop__products__productcontainer">
                            <div class="shop__products__productcontainer__img">
                                <img src="${data.path}" alt="Togree Products" class="shop__products__productcontainer__pic">
                            </div>
                            <div class="product_details">
                                <span class="title" >${data.productTitle} ${data.category}</span>
                                <span class="art_product_price">
                                    ${data.currency} ${data.productPrice} per piece
                                </span>
                                <div class="product_more_details">
                                    ${apllyProductRates()}
                                </div>
                            </div>
                            
                            <div class="product_footer">
                                <button class="art_btn art_gree_btn filled waves-effect waves-light">Add to cart</button>
                            </div>
                        </div>`;
            };

            fetch(path + 'assets/data/productData.json')
                .then(data => data.json())
                .then(data => {
                    // getting products 
                    const shopProductsWrapper = document.querySelector("#shop_product_wrapper");
                    if (data.length) {
                        shopProductsWrapper.innerHTML = '';

                        for (let shopproduct of data) {
                            shopProductsWrapper.insertAdjacentHTML("afterbegin", shopProdtemp(shopproduct))
                        }
                    }
                })
                .catch(err => console.log(err))

        })());

    })

    fetchShopProducts.then(() => {
        console.log("shopcontent loaded");
    }).catch(err => console.log(err))


    // Shop Page noUislider functionalities
    var slider = document.getElementById("test-slider");
    var input1 = document.getElementById("mininput");
    var input2 = document.getElementById("maxinput");
    var sliderInputs = [input1, input2];

    noUiSlider.create(slider, {
        start: [2500, 15000],
        connect: true,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: { 'min': 1500, 'max': 20000 },
        tooltips: [true, wNumb({ decimals: 1 })]
    });


    function updateSliderUI(_) {

        let index = 0;
        sliderInputs.map(input => {
            input.value = this.noUiSlider.get()[index++];

        });
    }

    slider.onmousemove = updateSliderUI;
    slider.ondragexit = updateSliderUI;





    const gridView = document.querySelector("#griditem");
    const listView = document.querySelector("#listitem");

    if (gridView) { gridView.addEventListener("click", changeView); }
    if (listView) { listView.addEventListener("click", changeView); }
    changeView();

    const categoryView = document.querySelector('#category');
    const closeBtn = document.querySelector("#exiticon");

    if (categoryView) { categoryView.addEventListener("click", viewCategory); }
    if (closeBtn) { closeBtn.addEventListener("click", viewCategory); }
    viewCategory();
});

// mobile category view
function viewCategory(event) {
    const sideWrapper = document.querySelector("#sidewrapper");

    if (typeof event !== "undefined" && typeof event.currentTarget !== "undefined") {
        if (event.currentTarget.id === "category") {
            sideWrapper.style.visibility = 'visible';
        }
        if (event.currentTarget.id === "exiticon") {
            sideWrapper.style.visibility = 'hidden';
        }
    }
}

// active Icon function 
function initializeNavMenu() {
    if (typeof M !== "undefined") {
        const navMenu = document.querySelector('#menu-nav');
        if (navMenu)
            M.Sidenav.init(navMenu);
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

}

// changing view in shop page with localstorage to make view persist
function changeView(event) {

    const shop = document.querySelector("#shopproduct");

    if (localStorage.getItem('viewType') == null) {
        localStorage.setItem('viewType', 'shop__products');
    }

    function applyListView(className) {
        if (className === 'productlist') {
            shop.classList.remove('shop__products');
            shop.classList.add('productlist');
        }
        if (className === 'shop__products') {
            shop.classList.remove('productlist');
            shop.classList.add('shop__products');

        }

        localStorage.setItem('viewType', className);
    }

    if (typeof event !== "undefined" && typeof event.currentTarget !== "undefined") {
        if (event.currentTarget.id === "listitem") {
            applyListView('productlist')
        }
        if (event.currentTarget.id === "griditem") {
            applyListView('shop__products');
        }
    } else {
        applyListView(localStorage.getItem('viewType'))
    }

}