$(document).ready(function($) {
    $('.art_count_title').counterUp({
        delay: 50,
        time: 1500
    });


    // $('.art_products_container').slick({
    //     centerMode: !true,
    //     infinite: false,
    //     centerPadding: '60px',
    //     initialSlide: 2,
    //     slidesToShow: 3,
    //     slidesPerRow: 3,
    //     prevArrow: '<button type="button" class="art_slick_btn prev slick-prev"><em class="material-icons">chevron_left</em></button>',
    //     nextArrow: '<button type="button" class="art_slick_btn next slick-next"><em class="material-icons">chevron_right</em></button>',
    //     // infinite: false,
    //     responsive: [{
    //         breakpoint: 480,
    //         settings: {
    //             arrows: false,
    //             centerMode: !true,
    //             centerPadding: '40px',
    //             slidesToShow: 1
    //         }
    //     }, {
    //         breakpoint: 768,
    //         settings: {
    //             arrows: false,
    //             centerMode: false,
    //             centerPadding: '100px',
    //             slidesToShow: 1
    //         }
    //     }, {
    //         breakpoint: 1204,
    //         settings: {
    //             arrows: true,
    //             centerMode: !true,
    //             centerPadding: '40px',
    //             slidesToShow: 3
    //         }
    //     }]
    // });

    $('.art_our_news_cards').slick({
        centerMode: true,
        centerPadding: '60px',
        initialSlide: 0,
        slidesToShow: 3,
        slidesPerRow: 3,
        slidesToScroll: 1,
        // variableWidth: true,
        prevArrow: '<button type="button" class="art_slick_btn prev slick-prev"><em class="material-icons">chevron_left</em></button>',
        nextArrow: '<button type="button" class="art_slick_btn next slick-prev"><em class="material-icons">chevron_right</em></button>',
        // infinite: false,
        responsive: [{
            breakpoint: 480,
            settings: {
                arrows: false,
                centerPadding: '40px',
                // slidesToShow: 1
            }
        }, {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerPadding: '100px',
                // slidesToShow: 1
            }
        }, {
            breakpoint: 1204,
            settings: {
                arrows: true,
                centerPadding: '40px',
                // slidesToShow: 3
            }
        }]
    });
    initializeAOSAnimations();

    fetchTopProducts();
    fetchServices();

    function fetchServices() {
        let servTemp = (data, index) => { /* /${data.slogan} */
            return ` <a href="${path}services/main/${index}" class="art_our_services_card waves-effect" style="background-image: url('${path}${data.preview_image}');">
            <div class="art_our_services_card_content">
                <div class="art_our_services_card_header">
                    <img src="${path}${data.icon}" alt="GPS Trackers" srcset="" class="art_our_services_card_header_icon_image">
                    <h4 class="art_our_services_card_header_title">${data.name}</h4>
                </div>
                <div class="art_our_services_card_footer">
                    <button class="art_icon_btn art_btn art_gree_btn filled waves-effect">
                        <em class="material-icons">chevron_right</em>
                    </button>
                </div>
            </div>
        </a>`
        };
        axios.get(path + 'services/@get-services').then(res => {
            let data = res.data;
            let art_top_services = document.querySelector("#art_top_services");
            if (art_top_services) {
                art_top_services.innerHTML = '';
                let index = 0;
                data.map(service => {
                    lang_(service.name).then(title => {
                        service.name = title;
                        art_top_services.innerHTML += servTemp(service, index++);

                    })
                })
            }

        })
    }

    function fetchTopProducts() {
        let _i = 0;
        let _id = 0;
        let __i = 0;
        let prodTemp = (data) => {
            let renderShortDesc = () => {
                let d = '';
                let i = 0;
                for (i; i < 3; i++) {
                    lang_(data.short_description.split(",")[i]).then(name => {
                        d += name + ',';

                    })

                }
                setTimeout(() => {
                    let art_prod_desc_text = document.querySelector('#art_prod_desc_text_' + __i++)
                    d = d.substr(0, d.length - 1)
                    if (art_prod_desc_text) {
                        art_prod_desc_text.innerHTML = d;
                    }
                    return d
                }, 500, d, __i);
                return d

            }
            return `<a class="art_product_card_co" href="${path+'products/'+data.category.split(' ').join('_').toLowerCase()+'/'+_id++}">
            <span class="art_product_card_price_tag">${data.currency+ ' ' +data.price}</span>
                        <!-- Product card -->
                        <div class="art_product_card">
                            <img src="${path+data.path}" alt="${data.name}" class="art_product_img">
                        </div>
                        <!-- Product description -->
                        <div class="art_product_desc_co">
                            <span class="art_prod_title"><h5>${data.name}</h5></span>
                            ${renderShortDesc()}
                            <div class="art_prod_desc_text" id="art_prod_desc_text_${_i++}"> </div>
                        </div>
                    </a>`;
        };
        axios.get(path + 'api/@top-products').then(res => {
            if (res.data.length) {
                let top_products = document.querySelector("#top_products");
                if (top_products) {
                    top_products.innerHTML = '';
                    let index = 0;
                    res.data.map(data => {
                        if (index++ < 9) {
                            top_products.innerHTML += prodTemp(data);
                        }
                    })
                }
            }
        })
    }
});