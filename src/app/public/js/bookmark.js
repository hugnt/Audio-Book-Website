
var $ = jQuery.noConflict();
$(document).ready(function () {

    //Search box
    var category = $('.category .list-options .option');
    var century = $('.century .list-options .option');
    category.click({ param: category }, ChangeOption);
    century.click({ param: century }, ChangeOption);
    function ChangeOption(event) {
        let tmp = $(this).text();
        console.log(tmp);
        let main_title = $(this).parent().parent().find('.main-title').text();
        if (main_title == 'Tất cả') {
            $(this).text(event.data.param.last().text())
            event.data.param.last().text('Tất cả');
        }
        else {
            $(this).text(main_title)
        }
        $(this).parent().parent().find('.main-title').text(tmp);
        CloseFlow($(this))
        // console.log();
    };
    function CloseFlow(option) {
        option.parent().parent().toggleClass('show2');
    }
    var btn_down1 = $('.category .btn-select .btn-down');
    var btn_down2 = $('.centuty .btn-select .btn-down');
    var btn_down = $('.btn-select .btn-down');
    btn_down.click(function () {
        $(this).parent().parent().toggleClass('show2');
    });



    //slide
    var swiper1 = new Swiper(".slide-books", {
        slidesPerView: 1,
        // spaceBetween: 10,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    var swiper2 = new Swiper(".slide-infor-books", {
        spaceBetween: 100,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper1,
        },
    });

    $('.btn-read').click(function () {
        $(swiper1.slides[swiper1.activeIndex]).click();
    });
    $('.img-box').click(function () {
        var selectedBook = $(this).attr("data-book");
        localStorage.setItem("selectedBook", selectedBook);
        console.log(selectedBook);

        window.location.href = 'bookmark_reading'
    });
    
});



