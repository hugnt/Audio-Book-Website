import {booksData as books} from '/js/layout.js'

var $ = jQuery.noConflict();
$(document).ready(function(){


//Search box
var category = $('.category .list-options .option');
var century = $('.century .list-options .option');
category.click({param: category},ChangeOption);
century.click({param: century},ChangeOption);
function ChangeOption(event){
    let tmp=$(this).text();
    console.log(tmp);
    let main_title=$(this).parent().parent().find('.main-title').text();
    if(main_title=='All')
    {
        $(this).text(event.data.param.last().text())
        event.data.param.last().text('All');
    }
    else
    {
        $(this).text(main_title)
    } 
    $(this).parent().parent().find('.main-title').text(tmp);
    CloseFlow($(this))
    // console.log();
};
function CloseFlow(option)
{
    option.parent().parent().toggleClass('show2');
}
var btn_down1=$('.category .btn-select .btn-down');
var btn_down2=$('.centuty .btn-select .btn-down');
var btn_down=$('.btn-select .btn-down');
btn_down.click(function(){
    $(this).parent().parent().toggleClass('show2');
});


    // const $=document.querySelector.bind(document)
    // const $$=document.querySelectorAll.bind(document)

const allAuthor = books.length;
const allBooks = books[0].Poem.length;
var strHtml2 = ''
function Show_Books(n,m)
{
    $('.section-main .book-lists').html('');
    let no = 0;
    for(let i = 1; i<=n ;i++)
    {
        for(let j=1;j<=m;j++)
        {
            no+=1;
            strHtml2 += `
            <div class="book-item" data-book="${i}_${j}">
            <div class="img-box">
                <img src="/img/${i}/${j}.jpg" alt="" class="book-img">
            </div>
                <span class="author desc">${books[i-1].author}</span>
                <span class="name main-title">${books[i-1].Poem[j-1]}</span>
                <span class="icon-star fa-regular fa-star-half-stroke"><span class="rate desc">${books[i-1].rate[j-1]} ${books[i-1].reviewer[j-1]}
                        reviewers</span></span>
            </div>
            `
            $('.section-main .book-lists').html(strHtml2);
        }
    }
}   
Show_Books(allAuthor,allBooks );
var strHtml1 = ''
function Show_PopularBooks(n,m)
{
    $('.section-banner .list-books').html('');
    let no = 0;
    for(let i = 1; i<=n ;i++)
    {
        for(let j=1;j<=m;j++)
        {
            no+=1;
           strHtml1 += `
           <li class="book-item swiper-slide " data-book="${i}_${j}">
               <div class="img-box"><img src="/img/${i}/${j}.jpg" alt="" class="w-100"></div>
           </li>
           `
            $('.section-banner .list-books').html(strHtml1)
        }
    }
}   
Show_PopularBooks(3,1);

//slide
var swiper = new Swiper(".slide-books", {
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
$('.btn-move').click(function(){
    console.log(swiper.activeIndex);
    var slideIndex = swiper.activeIndex;
    // console.log(swiper.slides[avaIndex]);
    var src = $(swiper.slides[slideIndex]).find('img').attr("src");
    var avaIndex = src.substring(src.length-7,src.length-6);
    var poemIndex = src.substring(src.length-5,src.length-4);
    console.log(src);
    console.log(avaIndex);
    $('.author-ava img').attr("src","/img/home01/png/"+avaIndex+".png");
    $('.board-infor .book-name').text(books[avaIndex].Poem[poemIndex]);
    $('.about_author .main-title').text(books[avaIndex].author)
});

$('.btn-read').click(function(){
    $(swiper.slides[swiper.activeIndex]).click();
});
$('.book-item').click(function(){ 
    var selectedBook  = $(this).attr("data-book");
    localStorage.setItem("selectedBook",selectedBook);
    console.log(selectedBook);

    window.location.href = 'bookmark_reading'
});



});

 

