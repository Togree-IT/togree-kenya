// window.products = {};
document.addEventListener('DOMContentLoaded', function() {
    // shop products fectch Logic
    const fetchShopProducts = () => {

        const shopProdtemp = (data, others) => {
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

            let cartItems = read_cookie('cartItems');

            function applyCartActions() {

                if (cartItems && cartItems[data.product_id]) {
                    return `<div class="art_cart_actions" id="art_qty_${data.product_id}">
                                <button class="art_btn art_gree_btn filled waves-effect waves-light" onclick="decreaseProductToCart(event, '${data.product_id}')"><em class="material-icons">remove</em></button>
                                <input type="number" min="1" class="art_qty_display" id="art_qty_display_${data.product_id}" contenteditable="true" value="${cartItems[data.product_id].quantity}" onchange="updateProductToCart(event, '${data.product_id}')">
                                <button class="art_btn art_gree_btn filled waves-effect waves-light" onclick="increaseProductToCart(event, '${data.product_id}')"><em class="material-icons">add</em></button>
                            </div> 
                            <button class="art_btn art_gree_btn filled waves-effect waves-light" id="add_to_cat_${data.product_id}" style="display:none" onclick="addProductToCart(event, '${data.product_id}')">${others.action_title}</button>`
                } else {
                    return `<button class="art_btn art_gree_btn filled waves-effect waves-light" id="add_to_cat_${data.product_id}" onclick="addProductToCart(event, '${data.product_id}')">${others.action_title}</button>`
                }
            }

            return `<div class="shop__products__productcontainer">
                            <a  href="${path+'products/main/'+data.product_id}" title="${data.name} ${data.product_model}" class="waves-effect">
                                <div class="shop__products__productcontainer__img">
                                    <img src="${data.product_img}" alt="${data.name} ${data.product_model}" class="shop__products__productcontainer__pic">
                                </div>
                                <div class="product_details">
                                    <span class="title" >${data.name} ${data.product_model}</span>
                                    <span class="art_product_price">
                                        ${globalCurrency.name} ${data.price} ${others.per_piece}
                                    </span>
                                    
                                </div>
                            </a>
                            <div class="product_footer">
                                ${ applyCartActions()}
                            </div>
                            <div class="product_more_details">
                                ${apllyProductRates()}
                            </div>
                        </div>`;
        };

        /* getting products */
        axios.get(path + 'api/products/get_all', {
                params: { selector: 'products.price,products.name,products.product_model,products.recommended,products.product_img,products.product_id' }
            })
            .then(data => {
                data = data.data;

                const shopProductsWrapper = document.querySelector("#shop_product_wrapper");
                if (shopProductsWrapper) {
                    if (data.length) {
                        shopProductsWrapper.innerHTML = '';
                        lang_('Add_to_cart').then(action_title => {
                            lang_('per_piece').then(per_piece => {
                                for (let shopproduct of data) {
                                    products[shopproduct.product_id] = shopproduct;
                                    shopProductsWrapper.insertAdjacentHTML("afterbegin", shopProdtemp(shopproduct, { action_title, per_piece }))
                                }
                            })
                        })

                    }
                }
            })
            .catch(err => console.log(err));
    };

    fetchShopProducts();



    // Shop Page noUislider functionalities
    var slider = document.getElementById("test-slider");
    var input1 = document.getElementById("mininput");
    var input2 = document.getElementById("maxinput");
    var sliderInputs = [input1, input2];

    noUiSlider.create(slider, {
        start: [1500, 20000],
        connect: true,
        step: 100,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: { 'min': 1500, 'max': 20000 },
        tooltips: [!true, wNumb({ decimals: 0 })]
    });


    function updateSliderUI(_) {

        let index = 0;
        sliderInputs.map(input => {
            input.value = slider.noUiSlider.get()[index++];

        });
    }

    slider.onmousemove = updateSliderUI;
    slider.ondragexit = updateSliderUI;


    updateSliderUI();


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
            shop.classList.add('productlist');
        }
        if (className === 'shop__products') {
            shop.classList.remove('productlist');
        }

        ActiveIcon(className);
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

    function ActiveIcon(className) {

        const gridView = document.querySelector("#griditem");
        const listView = document.querySelector("#listitem");
        if (className === 'productlist') {
            listView.classList.add('active');
            gridView.classList.remove('active');
        }
        if (className === 'shop__products') {
            gridView.classList.add('active');
            listView.classList.remove('active');


        }
    }

}