//Query of Selector
const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
//Array of information bookstore
var bookstore=[
    {
        author:'Mark Twain',
        Poem:[
            'Anna Karenina',
            'To Kill a Mockingbird',
            'Where the Sidewalk Ends',
            'Valley of the Dolls',
            'The Shining',
            'The Little Prince',
            'The Fellowship of the Ring',
            'The Handmaid’s Tale',
            'A Wrinkle in Time',
            'Pride and Prejudice',
            'All the President’s Men'
        ]
    },
    {
        author:'Fyodor Tyutchev',
        Poem:[
            'Man’s Search for Meaning',
            'Beloved',
            'In Cold Blood',
            'A Long Way Gone: Memoirs of a Boy Soldier',
            'Dune',
            'Great Expectations',
            'Daring Greatly',
            '1984',
            'Angela’s Ashes: A Memoir',
            'A Brief History of Time',
            'Fahrenheit 451'
        ]
    },
    {
        author:'Alexander Puskin',
        Poem:[
            'A Heartbreaking Work of Staggering Genius',
            'Harry Potter and the Sorcerer’s Stone',
            'Selected Stories',
            'The Fault in Our Stars',
            'Alice’s Adventures in Wonderland',
            'Through the Looking-Glass',
            'Invisible Man',
            'Are You There, God? It’s Me, Margaret',
            'One Hundred Years of Solitude',
            'Catch-22',
            'Persepolis: The Story of a Childhood'
        ]
    },
    {
        author:'Mikhail Lermontov',
        Poem:[
            'Charlotte’s Web',
            'Slaughterhouse-Five',
            'Cutting for Stone',
            'The Autobiography of Malcolm X',
            'Fear and Loathing in Las Vegas',
            'Interpreter of Maladies',
            'The Diary of a Young Girl',
            'Lolita',
            'Love Medicine',
            'Me Talk Pretty One Day',
            'Middlesex'
        ]
    },
    {
        author:'Karolina Pavlova',
        Poem:[
            'Midnight’s Children',
            'East of Eden',
            'Moneyball',
            'Of Human Bondage',
            'On the Road',
            'Out of Africa',
            'And Then There Were None',
            'Portnoy’s Complaint',
            'Silent Spring',
            'Team of Rivals',
            'Team of Rivals'
        ]
    },
    {
        author:'Khomyakov Avtoportret',
        Poem:[
            'Homegoing',
            'The Age of Innocence',
            'The Amazing Adventures',
            'The Book Thief',
            'Rubyfruit Jungle',
            'The Brief Wondrous Life of Oscar Wao',
            'The Catcher in the Rye',
            'The Color of Water',
            'The Joy Luck Club',
            'The Corrections',
            'The Devil in the White City'
        ]
    }
]

//Price
var price=[[],[],[],[],[],[]]
for(var i=0;i<6;i++){
    for(var j=0;j<11;j++){
        var number=(Math.random()*200)+100
        price[i][j]=Math.round(number*100)/100
    }
    console.log('\n')
}

//Like 
var like=[[],[],[],[],[],[]]
for(var i=0;i<6;i++){
    for(var j=0;j<11;j++){
        var number=(Math.random()*100)+100
        like[i][j]=Math.round(number*100)/100
    }
    console.log('\n')
}

console.log(price)
//Add book in store
function addAllBook(){
    $('.listProduct').innerHTML=''
    for(var i=1;i<=6;i++){
        for(var j=1;j<=11;j++){
            $('.listProduct').innerHTML+=`                        
            <li class="product-card product-${i}${j}" data-tilt>
            <div class="badge">Hot</div>
            <div class="product-tumb">
              <img src="/img/${i}/${j}.jpg" alt="">
            </div>
            <div class="product-details">
              <span class="product-catagory">${bookstore[i-1].author}</span>
              <h4><a href="#">${bookstore[i-1].Poem[j-1]}</a></h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
              <div class="product-bottom-details">
                <div class="product-price"><small>$96.00</small>$${price[i-1][j-1]}</div>
                <div class="product-links">
                  <a href="#movie-card" onclick="popup(${i},${j})"><i class="bi bi-balloon-heart"></i></a>
                  <a href="#" onclick="addCart(${i},${j})"><i class="bi bi-cart"></i></a>
                </div>
              </div>
            </div>
        </li>`
        }
    }
    
}
addAllBook()
// $('.product-card').parentNode.removeChild($('.product-card'));


// function find book by author
function findBookByAuthor(index){
    if(index!=0){
        for(var i=1;i<=6;i++){
            if(index != i ){
                for(var j=1;j<=11;j++){
                    if($('.listProduct').contains($(`.product-${i}${j}`))){
                        $(`.product-${i}${j}`).parentNode.removeChild($(`.product-${i}${j}`));
                    }
                }
            }
            
        }
    }  
}
// console.log( $(`.product-11`).innerHTML)
//find by name
function findByName(searchName){
    bookstore.forEach((bookObject,i)=>{
        (bookObject.Poem).forEach((poem,j)=>{
            var poemLowerCase=poem.toLowerCase()
            if(!poemLowerCase.includes(searchName) && $('.listProduct').contains($(`.product-${i+1}${j+1}`))){
                $(`.product-${i+1}${j+1}`).parentNode.removeChild($(`.product-${i+1}${j+1}`));
            }
        })      
    })
}

$('.button').onclick = function() {
    var searchName=$('.byName input').value
    if(searchName==''){
        addAllBook()
        findBookByAuthor($('select').value)

    }
    else{
        addAllBook()
        findByName(searchName);
        findBookByAuthor($('select').value);

    } 
}

var total=0
//Valiadate the cart 
function addCart(i,j){
    // const shopIcons=$$('.bi-cart')

    const cart=$('.cart-content')
    // const cart=document.createElement('.cart-content')
    var string=`<div class="cart-${i}${j} cart-box">
        <img src="/img/${i}/${j}.jpg" alt="" class="cart-img">
        <div class="detail-box">
        <div class="cart-product-title">${bookstore[i-1].Poem[j-1]}</div>
        <div class="cart-price">$${price[i-1][j-1]}</div>
        <input type="number" value="1" class="cart-quantity number-${i}${j}" onclick="setNumber(${i},${j})">
        </div>
        <i onclick="removeCart(${i},${j})" class="bi bi-trash-fill cart-remove" ></i>
        </div>`
    // if(!cart.contains($(`.cart-${i}${j}`))){
        cart.innerHTML+=(string)
        console.log(1)
    // }
    // else{
    //     $(`.number-${i}${j}`).value++;
    //     console.log(2)
    // }
            
    total+=price[i-1][j-1];
    total=Math.round(total*100)/100
    $('.total-price').innerHTML=`$${total}`
}
$('#close-cart').onclick = function() {
    $('.cart').classList.remove('active')
}
$('.title-product').onclick= function() {
    $('.cart').classList.add('active')
}
function removeCart(i,j){
    // if($(`.number-${i}${j}`).value>1){
    //     $(`.number-${i}${j}`).value--;
    // }
    // else{
        $(`.cart-${i}${j}`).parentNode.removeChild($(`.cart-${i}${j}`))
    // }
    total-=price[i-1][j-1];
    console.log(total)
    total=Math.round(total*100)/100
        $('.total-price').innerHTML=`$${total}`
}

function setNumber(i,j){
    // if($(`.number-${i}${j}`).value==0){
    //     $(`.cart-${i}${j}`).parentNode.removeChild($(`.cart-${i}${j}`))
    //     total-=price[i-1][j-1]
    // }
    // else{
        total=0;
        $$('.cart-box').forEach((item,index)=>{
            const i_index=Number(i)
            const j_index=Number(j)
            console.log(j)
            total+=price[i_index-1][j_index-1]*$(`.number-${i}${j}`).value
        })
// }

        // console.log($(`.number-${i}${j}`).value)
        // temp+=price[i-1][j-1]*$(`.number-${i}${j}`).value;
        // total+=temp
    // console.log(total)
    $('.total-price').innerHTML=`$${total}`   
}


var speech = true;
window.SpeechRecognition = window.SpeechRecognition
                || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
// const words = document.querySelector('.words');
// words.appendChild(p);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    // document.getElementById("p").innerHTML = transcript;
    console.log(transcript);
    var authorFind=['tất cả','thứ nhất','thứ hai','thứ ba','thứ tư','thứ năm','thứ sáu']
    authorFind.forEach((item,index)=>{
        if(transcript.toLowerCase().includes(authorFind[index].toLowerCase())){
            $('select').value=index
            addAllBook()
            findBookByAuthor(index);
        }
    })
    if(transcript.toLowerCase()=='đóng mua'.toLowerCase()){
        $('.cart').classList.remove('active')
    }
    else if(transcript.toLowerCase()=='mở mua'.toLowerCase()){
        $('.cart').classList.add('active')
    }
    else if(transcript.toLowerCase()=='mở cửa'.toLowerCase()){
        alert('hello')
    }
    for(var i=0;i<66;i++){
        if(transcript.toLowerCase().includes(`Mở sách số ${i+1}`.toLowerCase())){
            $$('.bi-balloon-heart')[i].click()
        }
        else if(transcript.toLowerCase().includes(`Mua sách số ${i+1}`.toLowerCase())){
            $$('.bi-cart')[i].click()
        }
    }
    if(transcript.toLowerCase().includes('đóng sách')){
        $('.bi-x-circle').click()
    }
});
if (speech == true) {
    recognition.start();
    recognition.addEventListener('end', recognition.start);
}

var typeofBook=['Adventure stories',
    'Classics',
    'Crime',
    'Fairy tales', 'fables', 'folk tales',
    'Fantasy',
    'Historical' ,'Fiction',
    'Horror',
    'Humour and satire',
    'Literary',
    'Mystery',
    'Poetry',
    'Plays',
    'Romance',
    'Science fiction',
    'Short stories',
    'Thrillers',
   'War',
    'Womens fiction',
    'Young adult'
]

// alert(Math.floor(Math.random()*18)+3)
//Xu li popup
function popup(i,j){
    let pos=Math.floor(Math.random()*18)+3;
    $('.movie-card').innerHTML=''
                $('.movie-card').innerHTML+=`  

        
<div class="container-popup">
    <a href="#section"><i class="bi bi-x-circle"></i></a>
  <a href="#"><img src="/img/${i}/${j}.jpg" alt="cover" class="cover" /></a>
  <div class="hero">
          
    <div class="details">
    
      <div class="title1">${bookstore[i-1].author}<span>PG-${i}${j}</span></div>

      <div class="title2">${bookstore[i-1].Poem[j-1]}</div>    
      
      <fieldset class="rating">
  <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
  <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
  <input type="radio" id="star4" name="rating" value="4" checked /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
  <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
  <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
  <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
  <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
  <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
  <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
  <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
</fieldset>
      
      <span class="likes">${like[i-1][j-1]}k likes</span>
      
    </div> <!-- end details -->
    
  </div> <!-- end hero -->
  
  <div class="description">
    
    <div class="column1">
      <span class="tag">${typeofBook[pos]}</span>
      <span class="tag">${typeofBook[pos-1]}</span>
      <span class="tag">${typeofBook[pos-2]}</span>
      <span class="tag">${typeofBook[pos-3]}</span>
    </div> <!-- end column1 -->
    
    <div class="column2">
      
      <p>Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug. Approached out of the blue by the wizard Gandalf the Grey, Bilbo finds himself joining a company of thirteen dwarves led by the legendary warrior, Thorin Oakenshield. Their journey will take them into the Wild; through... <a href="#">read more</a></p>
      
      
      
      
    </div> <!-- end column2 -->
  </div> <!-- end description -->
  
 
</div> <!-- end container -->
`

$('.hero').style.setProperty('--beforeBack',`url('../images/author/${i}.jpg')`)

}




