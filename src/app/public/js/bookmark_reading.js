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
// <<<<<<< HEAD
});


// =======
// });
// >>>>>>> f339dcb42f1f51b7336dad64a3430a29a71cd0a0
