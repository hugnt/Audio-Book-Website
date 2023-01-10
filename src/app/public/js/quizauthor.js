const quizData = [
    {
        question: "Which of the following works is done by Mark Twain?",
        a: "Adventure of Huckleberry Finn",
        b: "The Revival",
        c: "The Idiot",
        d: "A Wolf for a Spell",
        correct: "a",
    }, 
    {
        question: "What is Aleksandr Pushkin favorite genre?",
        a: "Romantic",
        b: "Renaissance",
        c: "Transcendental",
        d: "Modern",
        correct: "a",
    },
    {
        question: "The river in Mark Twain's stories are a symbol of...",
        a: "Fear",
        b: "Peace",
        c: "Freedom",
        d: "Fishing",
        correct: "c",
    },
    {
        question: "Which of Pushkin's work came out in 1830-1840?",
        a: "Ruslan and Ludmilla",
        b: "Eugene Onegin",
        c: "The captain's daughter ",
        d: "Boris Godunov",
        correct: "c",
    },
    {
        question: "What is the only book of Karolina Pavlova?",
        a: "A double life",
        b: "Double King",
        c: "The idiot",
        d: "A wolf for a spell",
        correct: "a",
    },
];

var currQuiz = 0;
var corrAns = 0;
const quizLeng = quizData.length;
const quiz = document.getElementById('quiz');
const _a = document.getElementById('a');
const _b = document.getElementById('b');
const _c = document.getElementById('c');
const _d = document.getElementById('d');

function loadQuiz(){
    quiz.innerText = quizData[currQuiz].question;
    _a.innerText = quizData[currQuiz].a;
    _b.innerText = quizData[currQuiz].b;
    _c.innerText = quizData[currQuiz].c;
    _d.innerText = quizData[currQuiz].d;
    currQuiz++;
    return;
}

loadQuiz();

function checkNNext(id){
    if(currQuiz < quizLeng){
        if(id === quizData[currQuiz].correct){
            corrAns++;
        }
        loadQuiz();
    }
    else{
        quiz.innerText = `You answered ${corrAns}/${quizData.length} questions correctly`;
        _a.innerText = "";
        _b.innerText = "";
        _c.innerText = "";
        _d.innerText = "";
    }
    return false;
}

_a.addEventListener('click', function(){return checkNNext(_a.id);});
_b.addEventListener('click', function(){return checkNNext(_b.id);});
_c.addEventListener('click', function(){return checkNNext(_c.id);});
_d.addEventListener('click', function(){return checkNNext(_d.id);});
