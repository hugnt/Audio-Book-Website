import * as API from './api/ajax_config.js';
import Crunker from 'https://unpkg.com/crunker@latest/dist/crunker.esm.js';
pdfjsLib.GlobalWorkerOptions.workerSrc ="/js/lib/pdf.worker.min.js";
$(document).ready(function () {
    var audioOutput = $(".section-studio .output .audio-res audio");
    const fileInput = $(".section-studio .input .custom-file-input");
    const textInput = $(".section-editer .text-area textarea");
    const voiceInput = $('.op-voice .input-option');
    const speedInput = $('.op-speed input');
    const submitBtn = $(".btn-confirm-text");
    const userListBook = $('.section-trend .user-book .list-books #tmp');
    var recordType = "Bản nghe thử";
    var audioUrls = [];

    // setPending(false);
    // setOutput(true);
    // setInput(false);
    // setLoading(false);
    // let lstAudios = [
    //     'https://file01.fpt.ai/text2speech-v5/short/2023-05-02/6ca2995b08d9ec6456deb0ae4351cad8.mp3',
    //     'https://file01.fpt.ai/text2speech-v5/short/2023-05-02/ed5f0ad7787fd444ea7443edba94bd31.mp3',
    //     'https://file01.fpt.ai/text2speech-v5/short/2023-05-02/4e2df9ed181e9b3214803d8f96338791.mp3'
    // ];

    var audioInfo = {
        id: "uaid_0",
        name: "My audio book",
        url: "",
        author: localStorage.username,
        cover: "null.png",
        speed: 0,
        voice: "",
        inputType: "",
        user_name: localStorage.username,
        fileName:"",
        urlLink:"",
    };

    
    var validate = {
        isInput: false,
        isSetVoice: false,
        isSetSpeed: true,
    }

    //input file 
    $('#inputGroupFile04').on('change', function () {

        $(this).next('.custom-file-label').html(fileInput.prop("files")[0].name);
    })

    //btn - confirm
    $(".btn-confirm").on('click', function () {
        // console.log($(this).closest('.confirm-box').find('.icon-check').attr("class"));
        $(this).closest('.confirm-box').find('.icon-check').css("display", "block");
        if ($(this).closest('.op-file').length != 0) {
            console.log("Helel");
            validate.isInput = true;
        }
        else if ($(this).closest('.op-voice').length != 0) {
            validate.isSetVoice = true;
        }

    });

    $(".input-option").on('click', function () {
        // console.log($(this).closest('.confirm-box').find('.icon-check').attr("class"));
        $(this).closest('.confirm-box').find('.icon-check').css("display", "none");
        if ($(this).closest('.op-file').length != 0) {
            validate.isInput = false;
        }
        else if ($(this).closest('.op-voice').length != 0) {
            validate.isSetVoice = false;
        }
    });

    //text-area
    $('.instance-box .btn').on('click', function () {
        $(".section-editer").css("display", "block");
    });
    $(".btn-confirm-text").on('click', function () {
        $(this).closest('.confirm-box').find('.icon-check').css("display", "block");
        $('.instance-box').find('.icon-check').css("display", "block");
        validate.isInput = true;
    });

    $(".text-area textarea").on('click', function () {
        $(this).closest('.container').find('.icon-check').css("display", "none");
        $('.instance-box').find('.icon-check').css("display", "none");
        validate.isInput = false;
    });

    //input file or text option
    $('input[name=upload]').click(function () {
        validate.isInput= false;
        $('.list-op-upload .icon-check').css("display", "none");
        $('.section-editer .icon-check').css("display", "none");
        $('#inputGroupFile04').next('.custom-file-label').html("Chưa có file upload");
        $('input[name=upload]').each(function () {
            if ($(this).is(':checked')) {
                // console.log($(this).attr('id'));
                $(this).closest('.confirm-box').css("opacity", "1");
                if ($(this).closest('.confirm-box').hasClass('instance-box')) {
                    $(".section-editer").css("display", "block");
                    $(this).closest('.confirm-box').find('.able').prop("disabled", false);
                }
                else {
                    $(this).closest('.confirm-box').find('.able input').prop("disabled", false);
                    $(this).closest('.confirm-box').find('.able button').prop("disabled", false);
                }
            }
            else {
                $(this).closest('.confirm-box').css("opacity", "0.5");
                if ($(this).closest('.confirm-box').hasClass('instance-box')) {
                    $(".section-editer").css("display", "none");
                    $(this).closest('.confirm-box').find('.able').prop("disabled", true);
                }
                else {
                    $(this).closest('.confirm-box').find('.able input').prop("disabled", true);
                    $(this).closest('.confirm-box').find('.able button').prop("disabled", true);
                }
                $(this).closest('.confirm-box').find('.icon-check').css("display", "none");



            }
        });
        validate.isInput = false;
    });


    //generate audio full
    $('.excute-audio button').click(async function (e) {
        e.preventDefault();
        try {
            //validation
            if (!isConfirmInput()) return;
            if (!isValidInput()) return;

            //display loading
            setPending(false);
            setOutput(false);
            setInput(false);
            setLoading(true);
            recordType = "Bản ghi full";

            //var file = fileInput[0].files[0];
            var voice = voiceInput.val();
            var speed = speedInput.val();
            var content = await getContent();

            audioInfo.voice = voice;
            audioInfo.speed = speed;

            //add infor to details popup
            var typeInput = "Nhập văn bản";
            if (!textInput.val()) typeInput = "File văn bản";
            $('#detailsInforModal #inputType').val(typeInput);
            $('#detailsInforModal #voice').val(voice);
            $('#detailsInforModal #speed').val(speed);
            audioInfo.inputType = typeInput;

            //spliting content
            var words = content.split(' ');
            var totalWords = words.length;
            console.log("Number of words:", totalWords);
            var wordPerCalling = 1000;
            var index = 0;
            var n = Math.ceil(totalWords / wordPerCalling);
            console.log("Number of calling API: " + n);
            audioUrls = new Array(n);;

            let promises = [];
            for (let i = 0; i < words.length; i += wordPerCalling) {
                const selectedWords = words.slice(i, i + wordPerCalling);
                console.log(selectedWords.join(" "));
                var selectedContent = selectedWords.join(" ");

                //get audio url by calling API
                promises.push(ajaxPOST(index, selectedContent, voice, speed));
                // ajaxPOST(index, selectedContent, voice, speed);
                index++;

            }
            await Promise.all(promises);
            console.log("All AJAX requests have been completed.");
        } catch (err) {
            console.error(err);
        }
    });
    function checkValidUrl(url, time, callback) {
        $.ajax({
            url: url,
            type: 'HEAD',
            success: function () {
                // Đường link không phải là trang 404
                callback(true);
            },
            error: function () {
                // Đường link là trang 404
                console.log('Link is 404, retrying...');
                time++;
                console.log(time);
                if (time < 10) {
                    setTimeout(function () {
                        checkValidUrl(url, time, callback);
                    }, 5000); // Thử lại sau 1 giây
                } else {
                    console.log('Link is still 404 after 10 retries.');
                    callback(false);
                }
            }
        });
    }

    //generate trial audio
    $('.try-listen button').click(async function (e) {
        e.preventDefault();
        try {
            //validation
            if (!isConfirmInput()) return;
            if (!isValidInput()) return;

            //display loading
            setPending(false);
            setOutput(false);
            setInput(false);
            setLoading(true);
            recordType = "Bản nghe thử";

            //var file = fileInput[0].files[0];
            var voice = voiceInput.val();
            var speed = speedInput.val();
            //chỉ cho nghe 100 kí tự dầu
            var content = await getContent();
            content = content.substring(0, 50);
            //add infor to details popup
            var typeInput = "Nhập văn bản";
            if (!textInput.val()) typeInput = "File văn bản";
            $('#detailsInforModal #inputType').val(typeInput);
            $('#detailsInforModal #voice').val(voice);
            $('#detailsInforModal #speed').val(speed);
            audioInfo.inputType = typeInput;


            //spliting content
            var words = content.split(' ');
            var totalWords = words.length;
            var wordPerCalling = 1000;
            var index = 0;
            var n = Math.ceil(totalWords / wordPerCalling);
            console.log("Number of calling API: " + n);
            audioUrls = new Array(n);;

            let promises = [];
            for (let i = 0; i < words.length; i += wordPerCalling) {
                const selectedWords = words.slice(i, i + wordPerCalling);
                console.log(selectedWords.join(" "));
                var selectedContent = selectedWords.join(" ");

                //get audio url by calling API
                promises.push(ajaxPOST(index, selectedContent, voice, speed));
                // ajaxPOST(index, selectedContent, voice, speed);
                index++;

            }
            await Promise.all(promises);
            console.log("All AJAX requests have been completed.");

        } catch (err) {
            console.error(err);
        }
    });

    //ajax POST to get audio url
    function ajaxPOST(index, content, voice, speed) {
        $.ajax({
            url: `/audio_book/api/${audioInfo.name}/${audioInfo.id}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ content, voice, speed }),
            success: function (response) {
                checkValidUrl(response.audioUrl, 0, function (isValid) {
                    if (isValid) {
                        // audioOutput.attr('src', response.audioUrl);
                        audioUrls[index] = response.audioUrl;
                        if (!audioUrls.includes(undefined)) {
                            console.log("OKOK");
                            audioInfo.urlLink = response.audioUrl;
                            concatAudios(audioUrls);
                        }
                    }
                    else {
                        console.log("Gãy...");
                    }
                });

            },
            error: function (xhr, status, error) {
                setLoading(true);
                // setPending(true);
                setInput(true);
                console.log("ERR received response from SERVER: ", error);
            }
        });
    }

    function isConfirmInput() {
        for (const [key, value] of Object.entries(validate)) {
            console.log(`${key}: ${value}`);
            if (value == false) {
                alert("Nhập thiếu trường hoặc chưa ấn xác nhận tại mỗi lựa chọn", key);
                // setLoading(false);
                // setPending(true);
                // setInput(true);
                return false;
            }
        }
        return true;
    }

    function isValidInput() {
        var inputCheck = {
            voice: voiceInput.val(),
            speed: speedInput.val(),
            content: 0
        }
        if (inputCheck.voice === 'null') {
            inputCheck.voice = "banmai";
        };
        var contentType = $("input[name='upload']:checked");
        if (contentType.val() == 1) {
            console.log("FILE");
            var fileInput = $("#inputGroupFile04")[0].files[0];
            if (!fileInput) {
                alert("Vui lòng chọn một file!");
                return false;
            } else if (!fileInput.name.match(/\.(pdf|docx)$/i)) {
                alert("Vui lòng chỉ chọn file pdf hoặc docx!");
                return false;
            } else {
                console.log("OKOKO");
            }
        }
        else if (contentType.val() == 2) {
            console.log("TEXT");
            if (textInput.val().trim() === "") {
                alert("Không có thông tin để đọc hoặc chưa ấn xác nhận tại mỗi lựa chọn");
                return false;
            }
        }
        return true;

    }

    //tranfer PDF -> TEXT
    async function convertPDFtoText(url) {
        try {
            const loadingTask = pdfjsLib.getDocument(url);
            let text = '';
            const pdf = await loadingTask.promise;
            const maxPages = pdf.numPages;
            for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                const textContent = await page.getTextContent();
                text += '\n' + textContent.items.map((s) => s.str).join('');
            }
            return text;
        } catch (error) {
            throw error;
        }
    }
    
    async function getContent() {
        try {
            var contentType = $("input[name='upload']:checked");
            if (contentType.val() == 1) {
                var formData = new FormData();
                var fileName = fileInput.prop("files")[0].name;
                formData.append("uploadFile", fileInput.prop("files")[0]);
                // console.log(formData);
                $.ajax({
                    url: `/uploadFile/${audioInfo.user_name}`,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        console.log(response);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                const url = `../clientFiles/${audioInfo.user_name}/${fileName}`;
                const text = await convertPDFtoText(url);
                audioInfo.fileName = fileName;
                return text;
            }
            else if (contentType.val() == 2) {
                return textInput.val();
            }
        } catch (error) {
            console.log("getContent-ERROR: " + error);
            return "Lỗi file pdf";
        }

    }

    //concat audios into one
    async function concatAudios(lstAudios) {
        let crunker = new Crunker();
        try {
            const buffers = await crunker.fetchAudio(...lstAudios);
            // => [AudioBuffer, AudioBuffer]
            const concat = await crunker.concatAudio(buffers);
            console.log(concat);
            const output = await crunker.export(concat, 'audio/mp3');
            // => {blob, element, url}
            // crunker.download(output.blob,"testconcat1");
            audioOutput.attr('src', output.url);
            audioInfo.url = output.url;
            audioInfo.author = "hungnt";
            audioInfo.id = "uaid_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
            // console.log(output.blob);
            console.log("final audio: ", output.url);
            
            setPending(false);
            setLoading(false);
            setInput(true);
            setOutput(true);
        } catch (error) {
            // => Error Message

            console.log("Audio concat Error!!: " + error);
        }

        crunker.notSupported(() => {
            // Handle no browser support
            console.log("NGUUUU");
        });
    }

    //ADD TO LIST
    var n = 0;
    $('.output .action .add-list .btn').on("click", function () {
        // e.preventDefault();
        // setTimeout(()=>{
        //     setLoading(true);
        //     setInput(false);
        // },2000);
        // setLoading(false);
        // setInput(true);

        console.log("check");
        if (audioOutput.attr('src') != '') {
            n++;
            audioInfo.url = audioOutput.attr('src');
            const audioInfoJSON = JSON.stringify(audioInfo);
            // console.log(audioInfoJSON);
            var bookItemHtml = `
            <div class="book-item swiper-slide" >
                <div class="book-cover">
                    <img src="/img/audio_book/${audioInfo.cover}" alt="NULL img" class="w-100 h-100">
                    <span class="action-more action-trash fa-solid fa-trash-can">
                    </span>
                    <span class="action-listen fa-regular fa-circle-play" 
                    data-id='${audioInfo.id}' data-audio='${audioInfoJSON}'>
                    </span>
                </div>
                <div class="book-name">${audioInfo.name}</div>
            </div>
            `

            userListBook.after(bookItemHtml);
        }
    });


    //POPUP Handler
    $("#detailsInforModal #saveDetails").click(async function (e) {
        e.preventDefault();
        audioInfo.inputType = $('#detailsInforModal #inputType').val();
        audioInfo.name = $('#detailsInforModal #bookName').val();
        if (audioInfo.name == "" || audioInfo.name == undefined) audioInfo.name = "myAudioBook";
        audioInfo.author = localStorage.username;
        $('.section-studio .output .details .book-name').text("- Tên sách: " + audioInfo.name);
        $('.section-studio .output .details .author').text("- Tác giả: " + audioInfo.author);
        console.log(audioInfo);
        var bookCreate = {
            name:audioInfo.name,
            fileName:audioInfo.fileName,
            image:"null.png",
            username:localStorage.username,
            urlLink:audioInfo.urlLink,
            voice: audioInfo.voice,
            speed: audioInfo.speed,
            inputType: audioInfo.inputType
        }
        try {
            var reqAudio = await API.postData('book/add',bookCreate);
            console.log(reqAudio);
            window.location.href(`/profile/${localStorage.username}`);
        } catch (error) {
            console.log(error);
        }
    
    });


    function setLoading(on) {
        if (on === true) {
            $('.section-studio .loading').css("display", "flex");
        }
        else {
            $('.section-studio .loading').css("display", "none");
        }
    }
    function setPending(on) {
        if (on === true) {
            $('.section-studio .pending').css("display", "block");
        }
        else {
            $('.section-studio .pending').css("display", "none");
        }
    }
    function setOutput(on) {
        if (on === true) {
            $('.section-studio .output .title').text("Kết quả (" + recordType + ")");
            $('.section-studio .output').css("display", "block");
        }
        else {
            $('.section-studio .output').css("display", "none");
        }
    }

    function setInput(on) {
        if (on === true) {
            $('.section-studio .input').css("pointer-events", "auto");
            $('.section-studio .input').prop("disabled", false);
            $('.section-studio .input').css("opacity", "1");
        }
        else {
            $('.section-studio .input').css("pointer-events", "none");
            $('.section-studio .input').prop("disabled", true);
            $('.section-studio .input').css("opacity", "0.5");
        }
    }



    //OTHER TOOLS



});





//slides
var swiper2 = new Swiper(".other-book-slides", {
    slidesPerView: 4,
    spaceBetween: 10,
    freeMode: true,
    // loop: true,
    direction: "vertical",
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    mousewheel: true,

});
var swiper1 = new Swiper(".current-book-slides ", {
    spaceBetween: 10,
    slidesPerView: 1,
    // autoplay:true,
    // loop:true,
    freeMode: true,
    allowTouchMove: false,
    watchSlidesProgress: true,
    thumbs: {
        swiper: swiper2,
    },
});

var swiper3 = new Swiper(".trend-slides", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

var swiper4 = new Swiper(".user-slides", {
    slidesPerView: 2.5,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


// var n= 0;
// $('.output .action .add-list .btn').on("click", function () {
//     console.log("check");
// });
