document.addEventListener("DOMContentLoaded", () => {


    // Slick settings
    if (document.querySelector('#art_desc_product_img_sildes') && document.querySelector('#art_desc_product_img_sildes').querySelectorAll('.art_desc_product_img').length > 1) {
        $('#art_desc_product_img_sildes').slick({
            dots: !false,
            centerMode: false,
            arrows: true,
            centerPadding: '0px',
            initialSlide: 1,
            slidesToShow: 1,

            autoplay: true,
            autoplaySpeed: 2000,

            prevArrow: '<button type="button" class="art_slick_btn prev slick-prev"><em class="material-icons">chevron_left</em></button>',
            nextArrow: '<button type="button" class="art_slick_btn next slick-prev"><em class="material-icons">chevron_right</em></button>',
            infinite: false,

        });
    }
    $('#art_p_reviews').slick({
        dots: false,
        centerMode: false,
        arrows: true,
        // centerPadding: '0px',
        initialSlide: 0,
        slidesToShow: 1,

        autoplay: true,
        autoplaySpeed: 5000,

        prevArrow: '<button type="button" class="art_slick_btn prev slick-prev"><em class="material-icons">chevron_left</em></button>',
        nextArrow: '<button type="button" class="art_slick_btn next slick-prev"><em class="material-icons">chevron_right</em></button>',
        infinite: !false,
        // responsive: [{
        //     breakpoint: 480,
        //     settings: {
        //         arrows: false,
        //         // slidesToShow: 1,
        //         // autoplay: !true,
        //     }
        // }, {
        //     breakpoint: 768,
        //     settings: {
        //         arrows: false,
        //         // autoplay: !true,
        //     }
        // }, {
        //     breakpoint: 1204,
        //     settings: {
        //         arrows: true,
        //         // autoplay: !true,

        //     }
        // }]

    });

    function rateProductSector(e) {
        let art_desc_product_d2_co = document.querySelector('.art_desc_product_d2_co');
        let paddingTop = art_desc_product_d2_co.offsetHeight;

        let art_product_action = document.querySelector('.art_product_action');
        art_product_action.style.position = "absolute";
        art_product_action.style.left = '0';
        art_product_action.style.top = paddingTop + 100 + 'px';
        art_desc_product_d2_co.style.marginBottom = art_product_action.offsetHeight + 100 + 'px';


    }
    // rateProductSector();
    // window.addEventListener("resize", e => {
    //     rateProductSector(e)
    // })
});