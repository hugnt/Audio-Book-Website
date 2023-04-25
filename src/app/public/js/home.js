
// var $ = jQuery.noConflict();
function JS()
{
const left=document.querySelector('.bi-arrow-left')
const right=document.querySelector('.bi-arrow-right')
const list_writer=document.querySelector('.list-writers')
right.onclick=function(){
    list_writer.scrollLeft+=100;
    clearInterval(myInterval);
}
left.onclick=function(){
    list_writer.scrollLeft-=100;
    clearInterval(myInterval);


}
const myInterval = setInterval(autoLoop, 1000);
clearInterval(myInterval);
// var maxScrollLeft = list_writer.scrollWidth - list_writer.clientWidth;
// console.log(list_writer.clientWidth);
var checkTimeOut = true;
var maxScrollLeft;
var n=100;


function autoLoop()
{
    
    maxScrollLeft = list_writer.scrollWidth - list_writer.clientWidth;
    // console.log(maxScrollLeft);
    list_writer.scrollLeft+=n;
    if(list_writer.scrollLeft>=maxScrollLeft)
    {
        // console.log("decrease: ",list_writer.scrollLeft+" & "+"0");
        n=-100;
        checkTimeOut = false;
        return;
        
    }
    if(list_writer.scrollLeft<=0)
    {
        // console.log("increase:",list_writer.scrollLeft +" & "+ maxScrollLeft);
        n=100;
        checkTimeOut = true;
        return;
    }

    
}


//Query of Selector
const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

var i=0;
var checkin = false;
var curSrc;
function autoToggle()
{
       
    var item = $$('.slide-items .item');

    var cntTime=0;
    setTimeout(function() {   
        // console.log('hello'); 
        if(i>0)
        {
            item[i-1].querySelector('img').classList.remove('scale-out-img'); 
            item[i-1].querySelector('.author-name').classList.remove('cl-change'); 
            item[i-1].querySelector('.author-name').style.display="none";
        }
        else if(i==0&&checkin==true)
        {
            item[item.length-1].querySelector('img').classList.remove('scale-out-img'); 
            item[item.length-1].querySelector('.author-name').classList.remove('cl-change'); 
            item[item.length-1].querySelector('.author-name').style.display="none";
        }
        item[i].querySelector('img').classList.add('scale-out-img'); 
        item[i].querySelector('.author-name').classList.add('cl-change'); 
        item[i].querySelector('.author-name').style.display="block";
        curSrc=item[i].querySelector('img').src;
        $('.slide-show').querySelector('img').src=curSrc;
        checkin=true; 
        i++;
        if(i==item.length)
        {
            i=0;
        }
        cntTime++;                    
        if (cntTime < 10) {              
            autoToggle();    
        }
      
    }, 2000);

}   
// clearInterval(mySlideLoop);
autoToggle()




}
JS();
//Search box

var category = $('.category .list-options .option');
var century = $('.century .list-options .option');
category.click({param: category},ChangeOption);
century.click({param: century},ChangeOption);
function ChangeOption(event){
    let tmp=$(this).text();
    // console.log(tmp);
    let main_title=$(this).parent().parent().find('.main-title').text();
    if(main_title=='Tất cả')
    {
        $(this).text(event.data.param.last().text())
        event.data.param.last().text('Tất cả');
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

$('.slide .slide-show').click(function(){
    window.location.href='/home01'
});



document.querySelectorAll('.writer-item .img-box').forEach((item,index)=>{
    item.onclick=function(){
        localStorage.indexOf=index;
        window.location.href='home02'
        // console.log(localStorage.indexOf)
    }
})

$('.bi-lightbulb-off-fill').click(function(){
    $('.search-box').toggleClass('bg-transparent-solid');
    $('.search-box .select-option').toggleClass('select-option-light-mode');
});



    
