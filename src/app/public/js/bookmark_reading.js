

var $ = jQuery.noConflict();
$(document).ready(function(){
   
    $('.goHome').click(function(){
        window.location.href = 'bookmark'
    });
    var DEFAULT_URL =  "../../pdf/Chi Pheo - Nam Cao.pdf";
    console.log(DEFAULT_URL);
    $('.flip-book-container').FlipBook({pdf: DEFAULT_URL})
    
    

});


