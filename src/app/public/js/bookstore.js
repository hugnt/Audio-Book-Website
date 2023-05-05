const closeCart = document.querySelector('#close-cart');
const openCart = document.querySelector('.title-product');
const cart = document.querySelector('.cart');
//open and close cart
closeCart.onclick = function () {
    cart.classList.remove('active')
}
openCart.onclick = function () {
    cart.classList.add('active')

}
$(function () {
    var authorName = $(".title2"),
        bookName = $(".title1"),
        rateStar = $(".desc"),
        rateQuantity = $(".rate-desc"),
        bookCategory = $(".tag"),
        summary = $(".column2 p"),
        cartContent = $(".cart-content"),
        total = 0

    //get Id of Popup
    function getPopUp(bookId) {
        $.ajax({
            url: '/bookstore/' + bookId,
            type: 'GET',
            dataType: 'json',
            success: function (item) {
                // Data is returned with array of objects -> to access item[0].<row_name>
                console.log(item);
                Tentg = item[0];
                authorName.text(item[0].ten_tac_gia);
                bookName.text(item[0].ten_sach);
                rateStar.text(item[0].ty_le_sao);
                rateQuantity.text(item[0].sl_danh_gia + "k đánh giá");
                bookCategory.text(item[0].the_loai);
                summary.text(item[0].mo_ta);
                var imgHTML = `<img src="/img/covers/${item[0].bia_sach}" id="_${item[0].id}" alt="cover" class="cover">`;
                $(".img-before").before(imgHTML)
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });

    }

    //show pop up
    $('.book-card').click(function () {
        const bookId = $(this).data('id');
        console.log("selectedBook123: ", $(this).data('id'));
        getPopUp(bookId);
    });

    //get Id of cart
    function addCart(bookId) {
        $.ajax({
            url: '/bookstore/' + bookId,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var cartItem = $(".cart-" + data[0].id);
                if (cartItem.length) {
                    // Increase the quantity of the existing item in the cart
                    var quantity = parseInt(cartItem.find(".cart-quantity").val()) + 1;
                    cartItem.find(".cart-quantity").val(quantity);
                } else {
                    // Add the new item to the cart
                    var cartItemHTML = "<div class='cart-box cart-" + data[0].id + "'>";
                    cartItemHTML += "<img class='cart-img' src='/img/covers/" + data[0].bia_sach + "' alt=''>";
                    cartItemHTML += "<div class='detail-box'>";
                    cartItemHTML += "<div class='cart-product-title'>" + data[0].ten_sach + "</div>";
                    cartItemHTML += "<div class='cart-price'>" + data[0].gia_sach + "đ</div>";
                    cartItemHTML += "<input type='number' value='1' class='cart-quantity' min='1'>";
                    cartItemHTML += "</div>";
                    cartItemHTML += "<a class='cart-remove'><i class='bi bi-trash-fill ' ></i></a>"
                    cartItemHTML += "</div>";
                    cartContent.append(cartItemHTML);
                }
                // Update the total price
                var price = parseFloat(data[0].gia_sach);
                total += price;
                $('.total-price').text(total + "đ");
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }

    //add book to cart
    $('.addcart').click(function (event) {
        event.preventDefault();
        const bookId = $(this).data('id');
        console.log("selectedBookToBUY: ", $(this).data('id'));
        addCart(bookId);
    });

    //remove book
    $('.cart-content').on('click', '.cart-remove', function () {
        var quantity = parseInt($(this).closest('.cart-box').find('.cart-quantity').val());
        var price = parseFloat($(this).closest('.cart-box').find('.cart-price').text());
        var subtotal = quantity * price;
        total -= subtotal;
        $('.total-price').text(total + "đ");
        $(this).closest('.cart-box').remove();
    });

    //set number book
    function updateTotal() {
        var subtotal = 0;
        $('.cart-quantity').each(function () {
            var quantity = parseInt($(this).val());
            var price = parseFloat($(this).closest('.cart-box').find('.cart-price').text());
            subtotal += quantity * price;
        });
        $('.total-price').text(subtotal + "đ");
    }
    $('.cart-content').on('input', '.cart-quantity', function () {
        updateTotal();
    });

    // find book by author name
    function findBookByAuthor(authorName) {
        $('.listProduct li.product-card').each(function () {
            var productAuthor = $(this).data('author');
            if (productAuthor == authorName) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    // find book by book name
    function findBooksByName(searchName) {
        $('.listProduct li.product-card').each(function () {
            var bookTitle = $(this).find('.book-title').text().toLowerCase();
            if (bookTitle.includes(searchName.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $('.button').click(function () {
        var searchNameBook = $('.byName input').val();
        var searchNameAuthor = $('select').val();
        if (searchNameBook == '' && searchNameAuthor == "All") {
            $('.listProduct li.product-card').show();
        } else if (searchNameBook == '' && searchNameAuthor != "All") {
            findBookByAuthor(searchNameAuthor);
        }
        else if (searchNameBook != '' && searchNameAuthor == "All") {
            findBooksByName(searchNameBook);
        }
        else if (searchNameBook != '' && searchNameAuthor != "All") {
            findBookByAuthor(searchNameAuthor);
            findBooksByName(searchNameBook);
        }
    });
});