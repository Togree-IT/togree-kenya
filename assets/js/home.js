$(document).ready(function($) {
    $('.art_count_title').counterUp({
        delay: 50,
        time: 1500
    });

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
                slidesToShow: 1
            }
        }, {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerPadding: '100px',
                slidesToShow: 1
            }
        }, {
            breakpoint: 1204,
            settings: {
                arrows: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        }]
    });

    getRunningProgram();
    fetchTopProducts();
    initializeAOSAnimations();

});

function getRunningProgram() {
    let temp = data => `<div class="art_md_half_container">
    <span class="art_md_half art_half_img" style="background-image: url('${data.previewImage.file.url}');" ></span>
    <div class="art_md_half art_half_content">
        <h4 class="art_title">${data.title}</h4>
        <div class="art_desc">
             ${data.description}
        </div>
        <div class="art_action">
            <a href="${data.referenceLink.includes('http')?path+'url/external?url='+data.referenceLink.replace('https:',''):path+data.referenceLink}"><button class="art_gree_btn filled waves-effect waves-light">${data.actionTitle}<em class="material-icons">chevron_right</em></button></a>
        </div>
    </div>
</div>`;

    let running_program_co = document.querySelector('#running_program');
    if (running_program_co) {
        axios.get(path + 'api/@running_program').then(program => {

            program = program.data[0].fields;
            if (program) {
                if (program.active) {
                    program.previewImage = program.previewImage.fields;

                    lang_(program.title).then(title => {
                        program.title = title;
                        program.description = program.description.content.map(content => content.content[0].value).join('-newParagraph-');
                        lang_(program.description).then(content => {
                            content = '<p>' + content.split('-newParagraph-').join('</p><p>') + '</p>';
                            lang_(program.actionTitle).then(actionTitle => {
                                program.actionTitle = actionTitle;
                                program.description = content;
                                running_program_co.innerHTML = temp(program)
                            })
                        })

                    })
                }
            }
        })
    }
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
        return `<a class="art_product_card_co" href="${path+'products/main/'+data.product_id}">
        <span class="art_product_card_price_tag" hidden>${globalCurrency.name+ ' ' +data.price}</span>
                    <!-- Product card -->
                    <div class="art_product_card">
                        <img src="${path+data.product_img}" alt="${data.name}" class="art_product_img">
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