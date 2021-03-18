// window.products = {};
document.addEventListener("DOMContentLoaded", e => {
    // Load promo data
    axios.get(path + 'api/products/get_promos').then(data => {
        data = data.data;
        if (data.length) {
            let promo_silders = document.querySelector('#promo_silders');
            if (promo_silders) {
                let temp = (slider) => `
                <a class="art_slides_co">
                    <div class="content">
                        <h4>${slider.description}</h4>
                    </div>
                    <img src="${path}${slider.imgage}" alt="">
                </a>`;
                data.map(slider => {

                    promo_silders.insertAdjacentHTML('afterbegin', temp(slider));

                });
                initializeSliders();
            }
        }
    });
    // Load recommended
    axios.get(path + 'api/@top-products').then(data => {
        data = data.data;

        let recommended_products = document.querySelector('#recommended_products');
        if (data.length) {
            if (recommended_products) {
                // let temp = `<div class="art_produc"></div>`;
                data.map(product => {
                    lang_('add_to_cart').then(action_title => {
                        lang_('per_piece').then(per_piece => {
                            lang_('Continue_to_Checkout').then(checkout_title => {
                                recommended_products.insertAdjacentHTML('afterbegin', Prodtemp(product, { action_title, per_piece, checkout_title }))
                            })
                        })
                    })

                });

                recommended_products.querySelectorAll('.art_prod_card').forEach((card, index) => {

                    if (card.innerHTML.trim() === '') {
                        card.remove();
                    }

                });
            }
        }
    });


    axios.get(path + 'api/products/top_category').then(data => {
        data = data.data;

        let top_category = document.querySelector('#top_category');
        if (data.length) {
            if (top_category) {

                data.map(product => {
                    lang_('add_to_cart').then(action_title => {
                        lang_('per_piece').then(per_piece => {
                            lang_('Continue_to_Checkout').then(checkout_title => {
                                for (let i = 0; i < 5; i++) {
                                    top_category.insertAdjacentHTML('afterbegin', Prodtemp(product, { action_title, per_piece, checkout_title }))
                                }
                            })
                        })
                    });
                });

                top_category.querySelectorAll('.art_prod_card').forEach((card, index) => {

                    if (card.innerHTML.trim() === '') {
                        card.remove();
                    }

                });
            }
        }
    });
    axios.get(path + 'api/products/get_all').then(data => {
        data = data.data;

        let other_products = document.querySelector('#other_products');
        if (data.length) {
            if (other_products) {

                data.map(product => {
                    lang_('add_to_cart').then(action_title => {
                        lang_('per_piece').then(per_piece => {
                            lang_('Continue_to_Checkout').then(checkout_title => {
                                for (let i = 0; i < 10; i++) {
                                    other_products.insertAdjacentHTML('afterbegin', Prodtemp(product, { action_title, per_piece, checkout_title }))
                                }
                            })
                        })
                    });
                });

                other_products.querySelectorAll('.art_prod_card').forEach((card, index) => {

                    if (card.innerHTML.trim() === '') {
                        card.remove();
                    }

                });
            }
        }
    });
});
const Prodtemp = (data, others) => {
    let apllyProductRates = function() {
        let stars = '';

        for (let i = 1; i < 6; i++) {
            if (i <= (+data.product_rate)) {
                stars += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" class="art_rate filled">
                <g id="Group_1" data-name="Group 1" transform="translate(-582 -313)">
                <rect  data-name="Rectangle 7" class="cls-1" width="21" height="21" transform="translate(582 313)" fill="none"/>
                <path class="cls-2" fill="currentColor" d="M19.4,9.657a1.422,1.422,0,0,0-.789-2.426l-4.8-.7a.627.627,0,0,1-.473-.343L11.191,1.84a1.422,1.422,0,0,0-2.551,0L6.493,6.191a.628.628,0,0,1-.473.343l-4.8.7A1.422,1.422,0,0,0,.43,9.658L3.9,13.044a.629.629,0,0,1,.181.556l-.82,4.782a1.392,1.392,0,0,0,.31,1.153,1.437,1.437,0,0,0,1.753.346l4.294-2.258a.643.643,0,0,1,.585,0l4.3,2.258a1.407,1.407,0,0,0,.662.166,1.426,1.426,0,0,0,1.091-.511,1.392,1.392,0,0,0,.31-1.153l-.82-4.782a.628.628,0,0,1,.181-.556Z" transform="translate(582.598 312.953)"/>
                </g>
                </svg>`;
            } else {
                if ((+data.product_rate) > 0)
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
            return `<div class="art_cart_options">
            <div class="art_cart_actions" id="art_qty_${data.product_id}">
                        <button class="art_btn art_gree_btn filled waves-effect waves-light" onclick="decreaseProductToCart(event, '${data.product_id}')"><em class="material-icons">remove</em></button>
                        <input type="number" min="1" class="art_qty_display" id="art_qty_display_${data.product_id}" contenteditable="true" value="${cartItems[data.product_id].quantity}" onchange="updateProductToCart(event, '${data.product_id}')">
                        <button class="art_btn art_gree_btn filled waves-effect waves-light" onclick="increaseProductToCart(event, '${data.product_id}')"><em class="material-icons">add</em></button>
                    </div>
                    <div class="art_checkout_co">
                        <button class="art_btn art_gree_btn filled waves-effect waves-light" onclick="continueToCheckout(event, '${data.product_id}')">${others.checkout_title}</button>
                        </div> 
                </div> 
                    <button class="art_btn art_gree_btn filled waves-effect waves-light" id="add_to_cat_${data.product_id}" style="display:none" onclick="addProductToCart(event, '${data.product_id}')">${others.action_title}</button>`
        } else {
            return `<button class="art_btn art_gree_btn filled waves-effect waves-light" id="add_to_cat_${data.product_id}" onclick="addProductToCart(event, '${data.product_id}')">${others.action_title}</button>`
        }
    }

    return `<div class="art_prod_card">
    <div class="shop__products__productcontainer">
                    <a  href="${path+'products/main/'+data.product_id}" title="${data.name} ${data.product_model}" class="waves-effect">
                        <div class="shop__products__productcontainer__img">
                            <img src="${path+data.product_img}" alt="${data.name} ${data.product_model}" class="shop__products__productcontainer__pic">
                        </div>
                        <div class="product_details">
                            <span class="title" >${data.name} ${data.product_model}</span>
                            <span class="art_product_price">
                                ${globalCurrency.name} ${formatMoney(globalCurrency.rate*data.price)} ${others.per_piece}
                            </span>
                    <div class="product_more_details">
                        ${apllyProductRates()}
                    </div>
                    <div class="product_desc_details">
                    <p>
                        ${data.short_description}</p>
                    </div>
                            
                        </div>
                    </a>
                    
                    </div>
                </div>`;
}; {
    /* <div class="product_footer">
                            ${ applyCartActions()}
                        </div> */
}


// let carHeaderScrolly = new artScrollSpy('.art_others', 'fixed');
// console.log(carHeaderScrolly);

function initializeSliders() {
    // if ($('#promo_silders').hasClass('slick-initialized')) {

    //     $('#promo_silders').slick('unslick');
    //     // $('#promo_silders').unslick();

    // }
    $('#promo_silders').slick({
        dots: !false,
        centerMode: false,
        arrows: !true,
        centerPadding: '0px',
        initialSlide: 1,
        slidesToShow: 1,
        // fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="art_slick_btn prev slick-prev"><em class="material-icons">chevron_left</em></button>',
        nextArrow: '<button type="button" class="art_slick_btn next slick-prev"><em class="material-icons">chevron_right</em></button>',
        infinite: false,
    });
}