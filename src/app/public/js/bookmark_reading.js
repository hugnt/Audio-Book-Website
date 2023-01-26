import {booksData as books} from './layout.js'

var $ = jQuery.noConflict();
$(document).ready(function(){
    const bookIndex = localStorage.getItem("selectedBook");
    const authorID = bookIndex.substring(0,1);
    const bookID = bookIndex.substring(2);
    console.log(authorID);
    console.log(bookID);

    $('.support-box .img-box img').attr("src","/img/"+authorID+"/"+bookID+".jpg");
    $('.support-box .book-name').text(books[authorID].Poem[bookID]);
    $('.support-box .author').text(books[authorID].author);
    $('.support-box .n_pages').text("Pages: "+localStorage.getItem("numPages"));

    $('.goHome').click(function(){
        window.location.href = 'bookmark'
    });
    console.log("props:",bookIndex);
    var DEFAULT_URL =  "../../source/pdf/"+bookIndex+".pdf";
    console.log(DEFAULT_URL);
    $('.flip-book-container').FlipBook({pdf: DEFAULT_URL})
    
    

});


