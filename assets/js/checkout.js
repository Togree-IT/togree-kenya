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

function getPackegeByID(_package, ID) {
    let data = '';
    _package.map(pck => {
        if (pck.packageID === ID) {

            return data = pck
        }
        return false
    })
    return data
}

document.addEventListener('DOMContentLoaded', function() {

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


    fetch(window.location.origin + '/products/list/all').then(e => e.json())
        .then(data => {
            products = [...data];
            fetch(window.location.origin + '/offers.json').then(e => e.json())
                .then(_data => {
                    productOffers = [..._data]

                    cartCookieItems.map(cartItem => {

                        if (cartItem.packageID === '') {
                            let _product = getProductByID(products, cartItem.itemID)

                            if (typeof _product !== "undefined") {
                                totalPrice.push(+_product.productPrice * (+cartItem.itemsQTY));
                                _product.qty = cartItem.itemsQTY;
                                // _product.min = cartItem.itemsQTY;
                                _product.cartPice = (+_product.productPrice) * (+cartItem.itemsQTY);

                                populateCartlist(_product)
                            }

                        } else {

                            let _package = {
                                package: getPackegeByID(productOffers, cartItem.packageID),
                                packageItem: getProductByID(products, cartItem.itemID),
                            };

                            if (typeof _package !== "undefined") {
                                let priceXQTY = (+_package.packageItem.productPrice * (+_package.package.from));
                                let percentageOff = getPacentageOff((priceXQTY), (+_package.package.packageOffer));
                                console.log((+_package.package.packageOffer));
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
                    // console.log(totalPrice)
                    cartTotal(totalPrice)


                });
            console.log(summeryData)
        })

});

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





function productTemp(product) {
    function renderMin(prod) {
        return typeof prod.min !== 'undefined' ? 'min="' + prod.min + '"' : ''
    }
    // console.log(product);

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
    let removed = {};
    Object.keys(summeryData).map(key => {
        if (key !== prodID) {
            removed[key] = summeryData[key]
        }
    });

    summeryData = removed;
    removed = {}
    populateTotalPrice()
    console.log(summeryData);
    console.log(allCart_price);


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