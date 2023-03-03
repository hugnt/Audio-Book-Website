var cnt = 0;
var $j = jQuery.noConflict();
$j(document).ready(function () {

    //move page
    var pathName = window.location.pathname;
    const Array_path = pathName.split("/");
    var mainpath = Array_path[Array_path.length - 1];
    var subName = mainpath;
    if (subName.includes("01")) {
        subName = subName.replace("01", "\0");
    }
    if (subName.includes("_")) {
        subName = subName.replace("_", " ");
    }

    $j(".menu-item").each(function () {
        // console.log($j(this).text());
        if ($j(this).find(">a").text().localeCompare(subName) == 0) {
            $j(this).toggleClass("load_menuItem");
        }
    });


    // console.log(window.location.origin);
    $j(".nav-bar .menu-item").click(function () {

        let itemName = $j(this).find(">a").text();
        if (itemName.includes(" ")) {
            itemName = itemName.replace(" ", "_");
        }
        let stringURL = "./" + itemName + "";
        window.location.href = stringURL;
        // window.open(stringURL, "_blank");
        // console.log(stringURL);

    });
    //
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

    $j('.book-item').click(function () {
        var selectedBook = $j(this).attr("data-book");
        localStorage.setItem("selectedBook", selectedBook);
        // console.log(selectedBook);
        window.open('./bookmark_reading', '_blank');
        // window.location.href = './bookmark_reading'
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



//Data
// #region data 
const booksData = [
    {
        author: 'Mark Twain',
        ava: '/img/author_ava/Mark_Twain.png',
        Poem: [
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
        ],
        rate: [
            '4.2',
            '4.6',
            '4.0',
            '3.7',
            '4.5',
            '3.8',
            '4.8',
            '3.0',
            '4.9',
            '5',
            '3'
        ],
        reviewer: [
            '122k',
            '144k',
            '133k',
            '112k',
            '378k',
            '100k',
            '55k',
            '77k',
            '22k',
            '10k',
            '78k'
        ],
        des: 'Samuel Langhorne Clemens, known by his pen name Mark Twain, was an American writer, humorist, entrepreneur, publisher, and lecturer. He was lauded as the "greatest humorist [the United States] has produced’, and william Faulkner called him “the father of American literature”. His novels include The Adventures of Tom Sawyer (1876) and its sequel, the Adventures of Huckleberry Finn (1884), the latter often called “The Great American Novel”.'
    },
    {
        author: 'Fyodor Tyutchev',
        ava: '/img/author_ava/Fyodor_Tyutchev.png',
        Poem: [
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
        ],
        rate: [
            '4.2',
            '4.6',
            '4.0',
            '3.7',
            '4.5',
            '3.8',
            '4.8',
            '3.0',
            '4.9',
            '5',
            '3'
        ],
        reviewer: [
            '122k',
            '144k',
            '133k',
            '112k',
            '378k',
            '100k',
            '55k',
            '77k',
            '22k',
            '10k',
            '78k'
        ],
        des: 'Fyodor Tyutchev, in full Fyodor Ivanovich Tyutchev, Tyutchev also spelled Tiutchev, is a Russian writer who was remarkable both as a highly original philosophic poet and as a militant Slavophile, and whose whole literary output constitutes a struggle to fuse political passion with poetic imagination.'
    },
    {
        author: 'Alexander Puskin',
        ava: '/img/author_ava/Alexander_Puskin.png',
        Poem: [
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
        ],
        rate: [
            '4.2',
            '4.6',
            '4.0',
            '3.7',
            '4.5',
            '3.8',
            '4.8',
            '3.0',
            '4.9',
            '5',
            '3'
        ],
        reviewer: [
            '122k',
            '144k',
            '133k',
            '112k',
            '378k',
            '100k',
            '55k',
            '77k',
            '22k',
            '10k',
            '78k'
        ],
        des: 'Alexander Sergeyevich Puskin was a Russian poet, playwright, and novelist of the Romantic era. He is considered by many to be the greatest Russian poet and the founder of modern Russian literature.'
    },
    {
        author: 'Mikhail Lermontov',
        ava: '/img/author_ava/Mikhail_Lermontov.png',
        Poem: [
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
        ],
        rate: [
            '4.2',
            '4.6',
            '4.0',
            '3.7',
            '4.5',
            '3.8',
            '4.8',
            '3.0',
            '4.9',
            '5',
            '3'
        ],
        reviewer: [
            '122k',
            '144k',
            '133k',
            '112k',
            '378k',
            '100k',
            '55k',
            '77k',
            '22k',
            '10k',
            '78k'
        ],
        des: 'Mikhail Yuryevich Lermontov was a Russian Romantic writer, poet and painter, sometimes called "the poet of the Caucasus", the most important Russian poet after Alexander Pushkin is death in 1837 and the greatest figure in Russian Romanticism. His influence on later Russian literature is still felt in modern times, not only through his poetry, but also through his prose, which founded the tradition of the Russian psychological novel.'
    },
    {
        author: 'Karolina Pavlova',
        ava: '/img/author_ava/Karolina_Pavlova.png',
        Poem: [
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
        ],
        rate: [
            '4.2',
            '4.6',
            '4.0',
            '3.7',
            '4.5',
            '3.8',
            '4.8',
            '3.0',
            '4.9',
            '5',
            '3'
        ],
        reviewer: [
            '122k',
            '144k',
            '133k',
            '112k',
            '378k',
            '100k',
            '55k',
            '77k',
            '22k',
            '10k',
            '78k'
        ],
        des: 'Karolina Karlovna Pavlova was a 19th-century Russian poet and novelist. Karolina Pavlova finished her only novel, A Double Life, in 1848. It is a ten-chapter novel that mixes prose and poetry to illustrate the duality of women and of members of high society.'
    },
    {
        author: 'Khomyakov Avtoportret',
        ava: '/img/author_ava/Khomyakov_Avtoportret.png',
        Poem: [
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
        ],
        rate: [
            '4.2',
            '4.6',
            '4.0',
            '3.7',
            '4.5',
            '3.8',
            '4.8',
            '3.0',
            '4.9',
            '5',
            '3'
        ],
        reviewer: [
            '122k',
            '144k',
            '133k',
            '112k',
            '378k',
            '100k',
            '55k',
            '77k',
            '22k',
            '10k',
            '78k'
        ],
        des: 'Aleksey Stepanovich Khomyakov was a Russian theologian, philosopher, poet and amateur artist. He co-founded the Slavophile movement along with Ivan Kireyevsky, and he became one of its most distinguished theoreticians.'
    }
]

//#endregion
//Data accesse;
export { booksData };


