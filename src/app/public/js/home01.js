//array of first Reader names
var firstReaderNames=["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"]

//array of last Reader names
var lastReaderNames=["Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler" ]

//array of booksname
var booksname=[
    [
        'The Good Guy',
        'My Book Cover',
        'Think OutSide',
        'Catcher In Rye',
        'YourBook Cover',
        'Booth'
    ],
    [
        'Only Words',
        'The Pen Sword',
        'Jack the thieves',
        'The Pen Sword',
        'Fortress Blood',
        'Blood Water'
    ],
    [
        'Lightness Fall',
        'From Ash',
        'Born In Blames',
        'Red Right',
        'Edit Book',
        'Design Book'
    ],
    [
        'The Pen Sword',
        'Fortress Blood',
        'Blood Water',
        'Red Right',
        'Edit Book',
        'Design Book',
    ],
    [
        'The Pen Sword',
        'Jack Thieves',
        'The Pen Sword',
        'From Ash',
        'Born Plames',
        'Red Right'
    ],
    [
        'YourBook Cover',
        'Booth',
        'Fortress Blood',
        'Blood Water',
        'Edit Book',
        'Catcher In Rye',
    ]
]

//array of title
var title=['MARK <br> TWAIN','FYODOR TYUTCHEV','ALEKSANDR PUSKIN','MIKHAIL LERMON','KAROLINA PAVLOVA','KHOMY AVTOPOR']

//array of born 
var born=['30 NOV 1835','18 DEC 1784','21 JAN 1896','23 FEB 1789','26 APR 1789','11 JUN 1789']

//array of died
var died=['21 APR 1910','18 DEB 1884','25 APR 1990','30 JAN 1989','20 DEC 1810','30 OCT 1883']

//Query of Selector
const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)



//Scroll book
function ScrollBook(left,right,listBook){
    right.onclick=function(){
        listBook.scrollLeft+=50
    }
    left.onclick=function(){
        listBook.scrollLeft-=50
    }
}
const left=$('.bi-arrow-left')
const right=$('.bi-arrow-right')
const listBook=$('.book')
//Thuc hien ham
ScrollBook(left,right,listBook)


$('.back').style.backgroundImage=`url('/img/home01/png/1.png')`;


//Hien ten tac gia
const authors=$$('.author-item')
const authorSpan=$$('.author-item span')
const books=$$('.book-item img')
const booksTitle=$$('.book-item .book-name ')
authors.forEach((item,index)=>{
    item.onclick=function(){

        //Speech 
        speechSynthesis.cancel();
        
       
        var voices = speechSynthesis.getVoices();
        let utterance = new SpeechSynthesisUtterance(`${title[index]} was born in ${born[index]} and died in ${died[index]}`);
        speechSynthesis.speak(utterance);

        // function speakVoice() {
        //     voices = this.getVoices();
        //     utterance = new SpeechSynthesisUtterance(`${title[index]} was born in ${born[index]} and died in ${died[index]}`);
        //     utterance.voice = voices[13];
        //     speechSynthesis.speak(utterance);
        // };

        // speechSynthesis.addEventListener('voiceschanged', speakVoice);


        $('.active-img').classList.remove('active-img')
        $('.active-span').classList.remove('active-span')
        $$('.author-item img')[index].classList.add('active-img')
        authorSpan[index].classList.add('active-span')
        $('.back').style.backgroundImage=`url('/img/home01/png/${index+1}.png')`

        //Upadte image book
        books.forEach((book,bookIndex)=>{
            book.src=`/img/home01/book_img/${index+1}/${bookIndex+1}.jpg`
        })

        //Update book name
        booksTitle.forEach((bookName,bookIndex)=>{
            bookName.innerHTML=booksname[index][bookIndex]
        })

        //Update title of page
        $$('.title-author h1').forEach((bookTitle)=>{
            bookTitle.innerHTML=title[index]
        })

        //Update born 
        $$('.born h2').forEach((authorBorn)=>{
            authorBorn.innerHTML=born[index]
        })
        //Update died
        $$('.died h2').forEach((authorDied)=>{
            authorDied.innerHTML=died[index]
        })

        //Update reader
        $$('.title-img img').forEach((Reader,indexOfImg)=>{
            Reader.src=`/img/home01/reader/${index+1}/${indexOfImg+1}.jpg`
        })

        $$('.title-img span').forEach((readerName,indexOfReader)=>{
            readerName.innerHTML=firstReaderNames[indexOfReader+index*4]+' '+lastReaderNames[indexOfReader+index*4]
        })


    }
})








