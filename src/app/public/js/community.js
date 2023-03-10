
var change = 0;
var switchLight=0;
var myChart;


function AddTagItem(n,m){
    var setHtml = '';
    var messageUser ='';
    $('.slide-bar .list-items').html('');
    for(var i = 1;i <= n;i++)
    {
        for(var k=1;k<=4;k++)
        {
            messageUser +=`
            <div class="cmt-item swiper-slide">
            <div class="cmt-user"><img src="/img/community/users/${k}.jpg" alt=""></div>
            <div class="ms-box">
                <div class="cmt-content">
                    <p>His books are so great, I love the book Mysterious</p>
                </div>
                <div class="time"><span>12pm</span></div>
            </div>
        </div>
            `
        }
        for(var j = 1;j <= m;j++)
        {
            setHtml += `
            <div class="item" data-index="${i}">
            <span class="main-title d-block">${books[i-1].author}</span>
            <span class="desc">Read everything for a year</span>
            <div class="img-item">
                <div id="author">
                    <img src="${books[i-1].ava}" alt="" class="">
                </div>
                <div class="icon1-spin">
                    <div class="icon1 icon-img">
                        <img src="/img/community/${i}_${j}.png" alt="">
                    </div>
                </div>
                <div class="icon2-spin">
                    <div class="icon2 icon-img">
                        <img src="/img/community/${i}_${j+1}.png" alt="">
                    </div>
                </div>
                <div class="icon3-spin ">
                    <div class="icon3 icon-img">
                        <img src="/img/community/${i}_${j+2}.png" alt="">
                    </div>
                </div>
                <div class="icon4-spin">
                    <div class="icon4">
                        <img src="/img/community/${i}_${j+3}.png" alt="">
                    </div>
                </div>
                <div class="icon5-spin">
                    <div class="icon5">
                        <img src="/img/community/${i}_${j+4}.png" alt="">
                    </div>
                </div>

            </div>
            <div class="common_book">
                <div class="img-book imb1" data-book="${i}_${j}">
                    <img src="/img/${i}/${j}.jpg" alt=""
                        class="w-100">
                </div>
                <div class="info-book">
                    <span class="desc d-block">Now it's your turn</span>
                    <span class="main-title">${books[i-1].Poem[j-1]}</span>
                    <div class="btn-read">
                        <span>READ</span>
                    </div>
                </div>
                <div class="list-recommand_book d-flex">
                    <div class="img-book" data-book="${i}_${j}">
                        <img src="/img/${i}/${j}.jpg" alt=""
                            class="w-100">
                    </div>
                    <div class="img-book" data-book="${i}_${j+1}">
                        <img src="/img/${i}/${j+1}.jpg" alt=""
                            class="w-100">
                    </div>
                    <div class="img-book" data-book="${i}_${j+1}">
                        <img src="/img/${i}/${j+2}.jpg" alt=""
                            class="w-100">
                    </div>
                    <div class="img-book" data-book="${i}_${j+1}">
                        <img src="/img/${i}/${j+3}.jpg" alt=""
                            class="w-100">
                    </div>
                </div>

            </div>
            <div class="comment-box swiper">
                <div class="swiper-wrapper">
                   ${messageUser}
                </div>
            </div>
            <div class="my_comment">
                <div class="my_ava"><img src="/img/ava.png" alt=""></div>
                <input type="text" name="" id="myCMT" placeholder="write your comment">
                <button class="btn-send">Send</button>
            </div>
            <canvas id="myChart${i}" class="chart"></canvas>
            <span class="btn-back"><i class="fa-regular fa-circle-left"></i></span>
        </div>
            `
            
        }
        
    }
    $('.slide-bar .list-items').html(setHtml);
}

AddTagItem(3,1);



const users =['Scott','Casemiro','Bruno','Fred','Eriksen','DeGea','Anthony','Ronaldo','Messi','Roben','Beckham','VanPersi','Cong Phuong','Quang Hai']
function ShowTopReaders(n){
    var setHtml = '';
    $('.top-readers .list-readers').html('');
    for(var i = 1;i <= n;i++)
    {
        setHtml += `
        <li class="reader-item d-flex"><span class="No">${i}<img src="/img/community/users/${i}.jpg"
                                alt="" class="ava"></span><span class="name">${users[i-1]}</span><span
                            class="desc rate">${i*10000+i*i+111*i*i}</span></li>  `
        
    }
    $('.top-readers .list-readers').html(setHtml);
}
ShowTopReaders(10);



function ShowRecommendBooks(n,m){
    var setHtml = '';
    $('.hot-books .book-slides').html('');
    for(var i = 1;i <= n;i++)
    {
        for(var j = 1;j <= m;j++)
        {
            setHtml += `
            <div class="book-item swiper-slide "data-book="${i}_${j}">
            <img src="/img/${i}/${j}.jpg" alt="">
            <span class="desc d-block">${books[i-1].author}</span>
             </div>
            `
            
        }
        
    }
    $('.hot-books .book-slides').html(setHtml);
}
ShowRecommendBooks(3,2);


$(document).ready(function () {
    
    $('.slide-bar .img-item').hover(function () {
        // $(this).find('#author img').toggleClass('zoom-out');
        $(this).find('#author').toggleClass('bigger');
        $(this).find('.icon-img').toggleClass('bigger-icon');
    });
    $('.slide-bar .item').click(function () {
        
        $(".slide-bar  .item:not(:hover)").css({ "visibility": "hidden", "width": "0%","padding":"0" });
        $(".slide-bar  .item:not(:hover) span").css("display", "none");
        $(this).addClass('change-size');
        //add background
        var bgIndex = $(this).attr('data-index');
        $(this).addClass('bg-img'+bgIndex);
        console.log("class:",'bg-img'+bgIndex);

        //add chart
        let ID=$(this).find('.chart').attr('id');
        if(myChart!=null)
        {
            myChart.destroy();
        }
        createChart(ID);
        $(this).find(".chart").addClass('visibility-visible');

        //add message-box
        $(this).find(".comment-box").css('display','block');
        $(this).find(".my_comment").addClass('visibility-visible');

        //btn-back
        $(this).find('.btn-back').addClass('visibility-visible');


        // $(this).find('.main-title').css("font-size","3rem");
        $(this).find('.img-item').addClass('bg-transparent-no-line');

        $(this).find('.common_book').addClass('bg-transparent-dark');
        
        $(this).find('#author img').css('display','none');

       

        $(this).find(".common_book .imb1").css('display','none');
        $(this).find(".common_book .info-book").css('display','none');
        $(this).find(".common_book .list-recommand_book").css('display','flex');

        
    });
    $(document).on("click" , '.btn-back' , function(){
        $(".slide-bar .item:not(:hover)").css({ "visibility": "visible", "width": "27%","padding":"2rem" });
        $(".slide-bar .item:not(:hover) span").css("display", "block");
        $(this).parent('.item').removeClass("change-size");
        //remove background
        $(this).parent('.item').removeClass('bg-img1');
        $(this).parent('.item').removeClass('bg-img2');
        $(this).parent('.item').removeClass('bg-img3');

        //remove chart
        myChart.destroy();
        $(this).find('.chart').removeClass('visibility-visible');

        //remove message-box
        $(".comment-box").css('display','none');
        $(".my_comment").removeClass('visibility-visible');
        $('.reply-cmt').remove();
        $('.my_cmt').remove();

        //btn-back
        $('.btn-back').removeClass('visibility-visible');


        // $(this).parent('.item').find('.main-title').css("font-size","1.2rem");
        $(this).parent('.item').find('.img-item').removeClass('bg-transparent-no-line');

        $(this).parent('.item').find('.common_book').removeClass('bg-transparent-dark');
        
        $(this).parent('.item').find('#author img').css('display','block');

       

        $(this).parent('.item').find(".common_book .imb1").css('display','block');
        $(this).parent('.item').find(".common_book .info-book").css('display','block');
        $(this).parent('.item').find(".common_book .list-recommand_book").css('display','none');
        
        
    });
   

    $('.bi').click(function () {
        $('.slide-bar .item').toggleClass('bg-change-white');
        $('.slide-bar .item').toggleClass('box-shadow-light');
        $('.slide-bar .img-item').toggleClass('bg-transparent');
        $('.item .common_book').toggleClass('bg-transparent');
        $('.search-box').toggleClass('bg-transparent-solid');
        $('.recommend-zone').toggleClass('bg-transparent-solid');
        $('.hot-books .main-title').toggleClass('txt-shadow');
        $('.list-friends li:last-child').toggleClass('bg-white');
        $('.some-readers li:last-child').toggleClass('bg-white');
        $('.comment-box .cmt-content').toggleClass('bg-transparent-dark');
        // $('.my_comment').toggleClass('bg-transparent-solid');
        // $('.slide-bar').toggleClass('box-shadow-light');
 
        switchLight++;
        if(switchLight%2!=0)
        {
            $('.comment-box .add-content').addClass('bg-transparent-dark');
            $('.add-time span').css('color','#000');
          
        }
        else{
            $('.comment-box .add-content').removeClass('bg-transparent-dark');
            $('.add-time span').css('color','#fff');
            
        }
    
    });

    $('.btn-send').click(function () {
        let myCMT = $(this).parent().find('#myCMT').val();
        change++;
        var currentdate = new Date();
        var time = currentdate.getHours() + ":"
            + currentdate.getMinutes();
        console.log(myCMT);
        $('.comment-box .swiper-wrapper').append(
            `
            <div class="cmt-item swiper-slide my_cmt">
            <div class="ms-box">
                <div class="cmt-content">
                    <p>`
            + myCMT.toString() +
            `</p>   
                </div>
                <div class="time add-time"><span>`+ time + `</span></div>
                </div>  
                <div class="cmt-user"><img src="/img/ava.png" alt=""></div>
            </div>
            <div class="cmt-item swiper-slide reply-cmt">
                <div class="cmt-user"><img src="/img/community/1_5.png" alt=""></div>
                <div class="ms-box">
                    <div class="cmt-content add-content">
                        <p>Yes, you are right!</p>
                    </div>
                    <div class="time add-time"><span>`+ time + `</span></div>
                </div>
            </div>
            `
        );
        $(this).parent().find('#myCMT').val('');
        MessageShow();

        if(switchLight%2!=0)
        {
            $('.comment-box .add-content').addClass('bg-transparent-dark');
            $('.add-time span').css('color','#000');
        }
        else{
            $('.comment-box .add-content').removeClass('bg-transparent-dark');
            $('.add-time span').css('color','#fff');
           
        }
       
      
    });

    $('.common_book').hover(
        function () {
            $(this).find('.btn-read').css('display', 'block');
            $(this).find('.info-book .desc').css('display', 'none');
        },
        function () {
            $(this).find('.btn-read').css('display', 'none');
            $(this).find('.info-book .desc').css('display', 'block');
        },

    );
    $('.common_book').click(function(){
        $(this).find('.img-book').click();
    });
    
    $('.img-book').click(function(){
        var selectedBook  = $(this).attr("data-book");
        localStorage.setItem("selectedBook",selectedBook);
        console.log(selectedBook);
        window.open('bookmark_reading', '_blank');
    });
    

    //Push Data

});


//slide-show
function MessageShow() {
    var swiper = new Swiper(".comment-box", {
        direction: "vertical",
        loop: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
          stopOnLastSlide:true,
        },
        slidesPerView: "4",
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar"
        },
        mousewheel: true
    });
}
if (change == 0) {
    MessageShow();
  
}

var swiper = new Swiper(".hot-books", {
    loop: true,
    spaceBetween: 0,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

//pie-chart

var xValues = ["The Adventures of Tom Sawyer", "The Adventures of Huckleberry Finn", "Roughing It", "Autobiography of Mark Twain", "The Gilded Age: A Tale of Today"];
var yValues = [55, 49, 44, 24, 15];
var barColors = [
    "#1e71456b",
    "#2b56976e",
    "#00aba879",
    "#b91d476e",
    "#e8c3b991",
];
Chart.defaults.color="yellow";


function createChart(id)
{
    myChart=new Chart(id, {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues,
            borderColor: "transparent",
            
            
        }]
        
    },
    
    options: {
        plugins: {
            title: {
                display: true,
                text: 'HOTTEST BOOKS IN THIS MONTH',
                font:{weight:'bold',size:'18'},
                color:'yellow'
            }
        }
    }
});

}


