var cnt = 0;
var $j = jQuery.noConflict();
$j(document).ready(function () {
    //var isValidUser = 
    if(localStorage.username==null&&localStorage.accessToken==null){
        window.location.href="/login"
    }
    $("#p-username").text(localStorage.username);
    $("#p-profile").click(()=>{
        window.location.href=`/profile/${localStorage.username}`
    })
    //move page
    var pathName = window.location.pathname;
    const Array_path = pathName.split("/");
    var mainpath = Array_path[Array_path.length - 1];
    var subName = mainpath;
    if (subName.includes("01")) {
        subName = subName.replace("01", "\0");
    }
    // if (subName.includes("_")) {
    //     subName = subName.replace("_", " ");
    // }

    $j(".menu-item").each(function () {
        // console.log($j(this).text());
        // console.log($j(this).find(">a").attr('href').slice(1));
        // console.log(subName);
        if ($j(this).find(">a").attr('href').slice(1).localeCompare(subName) == 0) {
            $j(this).toggleClass("load_menuItem");
        }
    });
    $j(".nav-bar .menu-item").click(function () {
        let itemName = $j(this).find(">a").attr('href').slice(1);
        if (itemName.includes(" ")) {
            itemName = itemName.replace(" ", "_");
        }
        let stringURL = "./" + itemName + "";
        window.location.href = stringURL;
    });
    $j('.bi-lightbulb-off-fill').toggle(
        function () {
            $j("*").addClass("light_mode_title");
        },
        function () {
            $j("*").removeClass("light_mode_title");
        }
    );
    //click-menu_item event
    $j('.bi-lightbulb-off-fill').click(
        function () {
            cnt++;
            $j('nav .menu-item').hover(function () {
                $j(this).toggleClass("changed");
                $j(this).find('a').toggleClass("bolder");
            });
            if (cnt % 2 != 0) {
                $j("nav .menu-item").each(function (index) {
                    if ($j(this).hasClass('active1') == true) {
                        // console.log("checkin_2");
                        $j(this).removeClass("active1");
                        $j(this).find('a').removeClass("active1_1");
                        $j(this).addClass("active2");
                        $j(this).find('a').addClass("active2_1");
                    }
                });
            }
            else {
                $j("nav .menu-item").each(function (index) {
                    if ($j(this).hasClass('active2') == true) {
                        // console.log("checkin_1");
                        $j(this).removeClass("active2");
                        $j(this).find('a').removeClass("active2_1");
                        $j(this).addClass("active1");
                        $j(this).find('a').addClass("active1_1");
                    }
                });
            }

        }
    );
    //click-menu_item event
    $j("nav .menu-item").click(function () {
        if (cnt % 2 != 0) {
            // console.log(cnt);
            $j("nav .menu-item").each(function (index) {
                if ($j(this).hasClass('active1') == true) {
                    // console.log("checkin_2");
                    $j(this).addClass("active2");
                    $j(this).find('a').addClass("active2_1");
                }
            });
            $j("nav .menu-item").removeClass("active2");
            $j("nav .menu-item").find('a').removeClass("active2_1");
            $j("nav .menu-item").removeClass("active1");
            $j("nav .menu-item").find('a').removeClass("active1_1");
            $j(this).addClass("active2");
            $j(this).find('a').addClass("active2_1");
        }
        else {
            // console.log(cnt);
            $j("nav .menu-item").each(function (index) {
                if ($j(this).hasClass('active2') == true) {
                    // console.log("checkin_1");
                    $j(this).addClass("active1");
                    $j(this).find('a').addClass("active1_1");
                }
            });
            $j("nav .menu-item").removeClass("active2");
            $j("nav .menu-item").find('a').removeClass("active2_1");
            $j("nav .menu-item").removeClass("active1");
            $j("nav .menu-item").find('a').removeClass("active1_1");
            $j(this).addClass("active1");
            $j(this).find('a').addClass("active1_1");
        }
    });

    $j(".user-infor").click(function(){
        $(".user-infor .user-method").toggle();
    });
    $j(".user-avatar").click(function(){
        $(".user-infor .user-method").toggle();
    });
    $j(".log-out").click(function(){
        window.location.href="/login";
    });


});

//Turn dark mode or light mode 

const darkMode = document.querySelector('.bi-lightbulb-off-fill')
darkMode.onclick = function () {

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    darkMode.classList.toggle('bi-lightbulb-fill');
    // darkMode.classList.toggle('light_mode_bar_item');
    darkMode.classList.toggle('bi-lightbulb-off-fill')
    darkMode.classList.toggle('light_mode_title');

    const logo = $('#logo');
    const url_defaultLogo = "../images/logo3_gold.png";
    const url_lightLogo = "../images/logo3_light.png";
    const brandName = $('.logo span');
    const nav_barTitle = $$('nav .menu-item a');



    //logo
    if (logo.src.indexOf('logo3_gold.png') != -1) {
        logo.src = url_lightLogo;

    }
    else {
        logo.src = url_defaultLogo;
    }
    //boder
    $('header').classList.toggle('light_mode_border_bar');
    $('footer').classList.toggle('light_mode_border_bar');

    //menu-item
    brandName.classList.toggle('light_mode_bar_item');
    nav_barTitle.forEach((item, index) => {
        item.classList.toggle('light_mode_bar_item');

    });



    //footer-item
    $$('footer span').forEach((item, index) => {
        item.classList.toggle('light_mode_bar_item');
    })
    $$('footer .item i').forEach((item, index) => {
        item.classList.toggle('light_mode_bar_item');
    })
    $('footer .email').classList.toggle('light_mode_border_bar');

    $('.logo span').classList.toggle('light_mode_title');
    $('body').classList.toggle('light_mode_body');




}



