
//API

const fileInput = document.querySelector(".section-studio .input .custom-file-input");
const textInput = document.querySelector(".section-editer .text-area textarea");
var audioOutput = document.querySelector(".section-studio .output .audio-res audio");
const submitBtn = document.querySelector(".btn-confirm-text");

//input
const getValTextInput = (textInput) => textInput.value;
// const getValFileInput = (textInput) => textInput.value;

submitBtn.onclick = (e) => {
    e.preventDefault();
    var text = getValTextInput(textInput);
    // var file = getValFileInput(fileInput);
    // handleInput(text);


}


//output

const baseUrl = "https://api.fpt.ai/hmi/tts/v5";
const getAudio = (data) => {


    var myHeaders = new Headers();
    myHeaders.append("api_key", "RKWYCowwW2I8v78HRiqdsabyKcfGoRC9");
    myHeaders.append("voice", "banmai ");
    myHeaders.append("speed", "0");
    // 'myHeaders.append("format", "mp3");
    // myHeaders.append("Content-Type", "text/plain");

    var raw = data;

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.fpt.ai/hmi/tts/v5", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            var jsObject = JSON.parse(result);
            let audioRes = jsObject["async"];
            audioOutput.src=audioRes
            console.log(audioRes);
            return audioRes;
        })
        .catch(error => console.log('error', error));

}

const handleShowResult = () => {
    console.log();
}

const handleInput = (data) => {
    getAudio(data);

}


//PDF -> TEXT

const textOutput = document.querySelector(".section-editer .text-area textarea");

$('.btn-confirm').click(function(){
    console.log(fileInput.files[0]);
});











