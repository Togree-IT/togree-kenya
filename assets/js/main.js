// const { promiseImpl } = require("ejs");

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    // return value.split(`; ${name}=`);
}

function getProductByID(products, ID) {
    let data = '';
    products.map(prod => {
        if (prod.productID === ID) {
            return data = prod
        }
        return false
    })
    return data
}

function getPackegeByID(package, ID) {
    let data = '';
    package.map(pck => {
        if (pck.packageID === ID) {

            return data = pck
        }
        return false
    })
    return data
}



document.addEventListener('DOMContentLoaded', function() {


    const fetchBlogContent = new Promise((resolve, reject) => {

        resolve((_ => {

            const blogSidebartemp = (data) => {

                return `<div class="blog__sidebar__cards">
                            <div class="blog__sidebar__cards__img">
                            <img class="blog__sidebar__cards__pic" src="${data.imagepath}" alt="relatedcontent">
                                </div>
                            <div class="blog__sidebar__cards__links">
                                <a class="blog__sidebar__cards__link" href="#"><span>${data.blogTitle}</span></a>
                            </div>
                        </div> `;

            };

            fetch(window.location.origin + '/bloglist.json')
                .then(data => data.json())
                .then(data => {
                    // data = data[0];
                    console.log(data);
                    const blogWrapper = document.querySelector("#blogwrapper");
                    if (data.length) {
                        blogWrapper.innerHTML = '';

                        for (let label of data) {

                            blogWrapper.insertAdjacentHTML("afterbegin", blogSidebartemp(label))
                        }

                    }

                })
                .catch(err => console.log(err))



        })());



    })

    fetchBlogContent.then(() => {

    }).catch(err => console.log(err))





    // shop products fectch Logic
    const fetchShopProducts = new Promise((resolve, reject) => {

        resolve((_ => {

            const shopProdtemp = (data) => {

                return `<div class="shop__products__productcontainer">
                        <div class="shop__products__productcontainer__img">
                            <img src="${data.path}" alt="Togree Products" class="shop__products__productcontainer__pic">
                        </div>
                        <h6 class="shop__products__productcontainer__producttitle">${data.productTitle}</h6>
                        <div class="shop__products__productcontainer__productdetails">
                            <h6 class="shop__products__productcontainer__productdetails__productprice">${data.productPrice}</h6>
                            <a href="./products/checkout/${data.productID}" class="shop__products__productcontainer__productdetails__CTA">BUY NOW</a>
                        </div>
                        </div>`;

            };

            fetch(window.location.origin + '/productData.json')
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

    }).catch(err => console.log(err))


    // active btn script 
    // const iconHeader = document.querySelector("#iconheader");
    // const Icons = iconHeader.querySelectorAll(".iconwrapper");

    // for (let i = 0; i < Icons.length; i++) {
    //     Icons[i].addEventListener("click", ActiveIcon)

    //     function ActiveIcon() {
    //         let current = document.getElementsByClassName("active");
    //         current[0].className = current[0].className.replace("active", " ");
    //         this.className += " active";
    //     }
    // }
    // ActiveIcon()






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

        index = 0;
        sliderInputs.map(input => {

            input.value = this.noUiSlider.get()[index++];

        });
    }

    slider.onmousemove = updateSliderUI;
    slider.ondragexit = updateSliderUI;



    // navBar collapsible
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

    function showLoading() {
        const loader = document.querySelector('#loader');
        if

        (loader) {
            loader.classList.add("display");
            setTimeout(() => {
                loader.classList.remove("display");
            }, 5000);
        }
    }

    // product page 1 fecth product Logic
    const fetchProducts = new Promise((resolve, reject) => {

        resolve((_ => {
            const prodTemp = (data) => {

                return `   <div class="products__container">
                                <a class="products__container__icon addtocart_btn" href="#"><i class="lni lni-cart "></i></a>
    
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
        
                                    <a href="./products/checkout/${data.productID}" class="products__container__btn  products__container__link buynow_btn"'>BUY NOW</a>
        
        
                                </div>
                            </div>`;
            };

            showLoading();
            fetch(window.location.origin + '/productData.json')
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

    }).catch(err => console.log(err))




    // reseller content fecthing 
    const fetchContent = new Promise((resolve, rejct) => {
        resolve((_ => {

            const asideTabTemp = (data, def) => {
                // id="defaultOpen"

                let defTb = () => {
                    if (def === null && (typeof def === "string" && def.trim() !== '')) {
                        return ''
                    }
                    return "id='defaultOpen'";
                };

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
                                            <video id="my-video" class="vjs-teaching video-js" src="${data.firstPath}" controls preload="auto" poster="${data.firstVideoPoster}" data-setup="{}">
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

                    if (data.length && asiideTabContainer) {

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

    });

    // checkout Page logic

    if (typeof productsContainer !== 'undefined') {
        productsContainer.addEventListener("click", purchaseProduct)
    }
    // // close popup 
    let close = document.getElementById("popup_close");
    if (close) {
        close.addEventListener("click", closePop);
    }

    function closePop() {
        let popup = document.querySelector("#popup");
        if (popup.classList.contains('active'))
            popup.classList.remove('active')
    }
    initializeNavMenu();
    initializeTabs();

    fetchContent.then(() => {

        // Do othe tings
    }).catch(err => console.log(err))




    const gridView = document.querySelector("#griditem");
    const listView = document.querySelector("#listitem");


    gridView.addEventListener("click", changeView);
    listView.addEventListener("click", changeView);
    changeView()

    const categoryView = document.querySelector('#category');
    const closeBtn = document.querySelector("#exiticon");


    categoryView.addEventListener("click", viewCategory);
    closeBtn.addEventListener("click", viewCategory);
    viewCategory()
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

function initializeTabs() {
    if (typeof M !== "undefined") {
        const update_tabs = document.querySelectorAll('.tabs');

        if (update_tabs.length) {
            M.Tabs.init(update_tabs);
        }
    }
}

function initializeAOSAnimations() {
    if (typeof AOS !== "undefined")
        AOS.init();
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


// Billing form checkbox check event
function checkbilling() {

    let checkBox = document.getElementById('checkbox');

    let billingForm = document.querySelector('#billing_form');

    if (checkBox.checked === true) {
        billingForm.classList.add('real_billing');
        billingForm.classList.remove('formheight');
    } else {
        billingForm.classList.remove('real_billing');
        billingForm.classList.add('formheight');

    }
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

        localStorage.setItem('viewType', className)
            // }
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

// CVV Card hover effect 

let image = document.getElementById('cvvImage');


function showCard(x) {
    image.style.display = 'block';
}

function hideCard(x) {
    image.style.display = 'none';
}


// checkout page payment tab slider 

function openPayment(evt, PaymentLogo, PaymentTab) {

    var i, paymentCard, paymentPane;

    paymentCard = document.getElementsByClassName("paymentcard");
    for (i = 0; i < paymentCard.length; i++) {
        paymentCard[i].classList.remove('active')
    }


    paymentPane = document.getElementsByClassName("paymentpane");
    for (i = 0; i < paymentPane.length; i++) {
        paymentPane[i].classList.remove('active')
    }


    document.getElementById(PaymentLogo).classList.add('active');
    document.getElementById(PaymentTab).classList.add('active');

    let prent = evt.currentTarget.parentElement;

    prent.querySelector('.active').classList.remove('active')
    evt.currentTarget.classList.add("active");
}

// cart item variables

let cartItems = [

    {
        "itemID": "0",
        "packageID": "",
        "itemsQTY": "1",
    },
    {
        "itemID": "3",
        "packageID": '2',

        "itemsQTY": "",
    },
    {
        "itemID": "2",
        "packageID": "",
        "itemsQTY": "6",
    }

];


document.cookie = `cartItems= ${JSON.stringify(cartItems)}`;


let cartCookieItems = JSON.parse(`${getCookie('cartItems')}`);
let products = [];
let productOffers = [];

function productTemp(product) {
    function renderMin(prod) {
        return typeof prod.min !== 'undefined' ? 'min="' + prod.min + '"' : ''
    }

    function renderMax(prod) {
        return typeof prod.max !== 'undefined' ? 'max="' + prod.max + '"' : ''
    }

    function renderOffer(prod) {
        return typeof prod.cartOffer !== 'undefined' ? '-' + prod.cartOffer + '%' : ''
    }
    return `<div class="checkout__content__cart__productwrapper cart" id="product_wrapper_${product.productID}">
    <div class="checkout__content__cart__productimg">
        <img class="checkout__content__cart__productpic" src="${product.path}" alt=" ">
    </div>

    <div class="checkout__content__cart__productcontent ">
         <h6 class="checkout__content__cart__productcontent__percentageoff"><span id="percentageoff">${renderOffer(product)}</span></h6>
        <h4 class="checkout__content__cart__productcontent__producttitle ">${product.productTitle}</h4>
        <h6 class="checkout__content__cart__productcontent__currentprice ">${product.currency} ${product.productPrice}</h6>
        <div class="checkout__content__cart__productcontent__counter ">
            <h6 class="checkout__content__cart__productcontent__counter__quantity ">QTY: 
            
            </h6>

            <button type="button" onclick="productDecreament('${product.productID}')" class="art_btn waves-effect waves-light checkout__content__cart__productcontent__counter__minus">
                <i class="fas fa-minus "></i>
            </button>

            <div class="checkout__content__cart__productcontent__counter__quantity-number"><input type="number" ${renderMin(product)} ${renderMax(product)} value="${product.qty}" size="5" id="prod_qty_${product.productID}" readonly disabled></div>

            <button type="button" onclick="productIncream('${product.productID}')" class="art_btn  waves-effect waves-light  checkout__content__cart__productcontent__counter__plus">
                <i class="fas fa-plus "></i>
            </button>

            <div class="checkout__content__cart__productcontent__counter__delete" onclick="removeCart('${product.productID}')" >
                <i class="fas fa-trash "></i>
            </div>

        </div>

    </div>
</div> `
}
let summeryData = {}
let totalPrice = [];

function populateCartlist(prod) {
    let cartlist = document.querySelector("#cartlist");

    summeryData[prod.productID] = prod;
    cartlist.innerHTML += productTemp(prod);
}

function getPacentageOff(priceXQTY, pacentageOff) {
    return (priceXQTY) * (pacentageOff) / 100
}



function productIncream(prodID) {
    let element_prod_qty = document.querySelector('#prod_qty_' + prodID);

    if (element_prod_qty.getAttribute('max')) {
        if ((+element_prod_qty.value + 1) <= +element_prod_qty.getAttribute('max')) {
            element_prod_qty.value = (+element_prod_qty.value + 1);
        }
    } else {
        element_prod_qty.value = (+element_prod_qty.value + 1);
    }

    updateSummerCart(prodID, element_prod_qty.value)

    // console.log(summeryData[prodID])
}

function productDecreament(prodID) {
    let element_prod_qty = document.querySelector('#prod_qty_' + prodID);

    if (element_prod_qty.getAttribute('min')) {
        if ((+element_prod_qty.value - 1) >= (+element_prod_qty.getAttribute('min'))) {
            element_prod_qty.value = (+element_prod_qty.value - 1);
        }
    } else {
        if ((+element_prod_qty.value - 1) >= 1) {
            element_prod_qty.value = (+element_prod_qty.value - 1);
        }
    }
    updateSummerCart(prodID, element_prod_qty.value)

}

function removeCart(prodID) {
    let element_prod = document.querySelector('#product_wrapper_' + prodID);

    element_prod.remove();
    removed = {};
    Object.keys(summeryData).map(key => {
        if (key !== prodID) {
            removed[key] = summeryData[key]
        }
    });

    summeryData = removed;
    removed = {}
    populateTotalPrice()



}

function updateSummerCart(prodID, prod_qty_value) {

    summeryData[prodID].qty = prod_qty_value;

    if (typeof summeryData[prodID].cartOffer === 'undefined') {
        summeryData[prodID].cartPice = (+summeryData[prodID].productPrice) * (+summeryData[prodID].qty)
    } else {
        let cartPriceXQTY = ((+summeryData[prodID].productPrice) * (+summeryData[prodID].qty));
        let percentageOff = getPacentageOff(cartPriceXQTY, summeryData[prodID].cartOffer);

        summeryData[prodID].cartPice = cartPriceXQTY - percentageOff;

    }

    populateTotalPrice()

}

function populateTotalPrice() {
    totalPrice = []
    for (let key in summeryData) {

        totalPrice.push(summeryData[key].cartPice)
    }
    cartTotal(totalPrice)
}

function cartTotal(allCart_price) {
    let SubTotal = document.getElementById("cart-subtotal-value");
    let Total = document.getElementById("cart-total-value"); //
    let ShippingCost = Number(document.getElementById("cart-shipping-value").textContent); //

    let sumPrice = 0;

    allCart_price.map(price => sumPrice += price);

    SubTotal.innerHTML = 'Ksh ' + sumPrice;
    let totalCost = ShippingCost + sumPrice;
    Total.innerHTML = 'Ksh ' + totalCost;
    return sumPrice;


}


// function overalTotal(totalCost) {



//     ShippingCost + totalCost ;
//     Total.innerHTML = Total;
// }





fetch(window.location.origin + '/productData.json').then(e => e.json())
    .then(data => {
        products = [...data];
        fetch(window.location.origin + '/offers.json').then(e => e.json())
            .then(_data => {
                productOffers = [..._data]

                cartCookieItems.map(cartItem => {

                    if (cartItem.packageID === '') {
                        _product = getProductByID(products, cartItem.itemID)

                        if (typeof _product !== "undefined") {
                            totalPrice.push(+_product.productPrice * (+cartItem.itemsQTY));
                            _product.qty = cartItem.itemsQTY;
                            // _product.min = cartItem.itemsQTY;
                            _product.cartPice = (+_product.productPrice) * (+cartItem.itemsQTY);

                            populateCartlist(_product)
                        }

                    } else {

                        _package = {
                            package: getPackegeByID(productOffers, cartItem.packageID),
                            packageItem: getProductByID(products, cartItem.itemID),
                        };

                        if (typeof _package !== "undefined") {
                            let priceXQTY = (+_package.packageItem.productPrice * (+_package.package.from));
                            let percentageOff = getPacentageOff((priceXQTY), (+_package.package.packageOffer));


                            totalPrice.push(priceXQTY - (percentageOff));

                            _package.packageItem.qty = _package.package.from;
                            _package.packageItem.min = _package.package.from;
                            _package.packageItem.max = _package.package.to;
                            _package.packageItem.cartPice = priceXQTY - (percentageOff);
                            _package.packageItem.cartOffer = (+_package.package.packageOffer);

                            populateCartlist(_package.packageItem)

                        }

                    }
                })

                // TODO: Get total and subtotal based on the product price

                cartTotal(totalPrice)


            });

    })