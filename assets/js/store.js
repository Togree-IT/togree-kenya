// window.products = {};
document.addEventListener("DOMContentLoaded", e => {
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
});

function initializeSliders() {
    // if ($('#promo_silders').hasClass('slick-initialized')) {
    //     // console.log($('#promo_silders').slick);
    //     $('#promo_silders').slick('unslick');
    //     // $('#promo_silders').unslick();
    //     console.log(typeof $('#promo_silders').unslick);
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