// const {Book} = require('../../models/Book');


var $ = jQuery.noConflict();



$( document ).ready(function() {
    //
    var audioOutput = $(".section-studio .output .audio-res audio");
    const fileInput = $(".section-studio .input .custom-file-input");
    const textInput = $(".section-editer .text-area textarea");
    const voiceInput = $('.op-voice .input-option');
    const speedInput = $('.op-speed input');
    const submitBtn = $(".btn-confirm-text");

    var validate = {
        isInput: false,
        isSetVoice: false,
        isSetSpeed: true,
    }


    //input tag
    $('#inputGroupFile04').on('change', function () {
        //get the file name
        var fileName = $(this).val();
        fileName = $(this).val().replace('C:\\fakepath\\', " ");
        //replace the "Choose a file" label
        $(this).next('.custom-file-label').html(fileName);
    })


    //btn - confirm
    $(".btn-confirm").on('click', function (){
        // console.log($(this).closest('.confirm-box').find('.icon-check').attr("class"));
        $(this).closest('.confirm-box').find('.icon-check').css("display","block");
        if($(this).closest('.op-file').length!=0){
            validate.isInput = true;
        }
        else if($(this).closest('.op-voice').length!=0){
            validate.isSetVoice = true;
        }
        
    });

    $(".input-option").on('click', function (){
        // console.log($(this).closest('.confirm-box').find('.icon-check').attr("class"));
        $(this).closest('.confirm-box').find('.icon-check').css("display","none");
        if($(this).closest('.op-file').length!=0){
            validate.isInput = false;
        }
        else if($(this).closest('.op-voice').length!=0){
            validate.isSetVoice = false;
        }
    });

    //text-area
    $('.instance-box .btn').on('click', function (){
        $(".section-editer").css("display","block");
    });
    $(".btn-confirm-text").on('click', function (){
        $(this).closest('.confirm-box').find('.icon-check').css("display","block");
        $('.instance-box').find('.icon-check').css("display","block");
        validate.isInput = true;
    });

    $(".text-area textarea").on('click', function (){
        $(this).closest('.container').find('.icon-check').css("display","none");
        $('.instance-box').find('.icon-check').css("display","none");
        validate.isInput = false;
    });

    //input file or text option
    $('input[name=upload]').click(function(){
        $('input[name=upload]').each(function () {
            if($(this).is(':checked')){
                console.log($(this).attr('id'));
                $(this).closest('.confirm-box').css("opacity","1");
                if($(this).closest('.confirm-box').hasClass('instance-box')){
                    $(".section-editer").css("display","block");
                    $(this).closest('.confirm-box').find('.able').prop("disabled", false );
                }
                else{
                    $(this).closest('.confirm-box').find('.able input').prop("disabled", false );
                    $(this).closest('.confirm-box').find('.able button').prop("disabled", false );
                }
            }
            else{
                $(this).closest('.confirm-box').css("opacity","0.5");
                if($(this).closest('.confirm-box').hasClass('instance-box')){
                    $(".section-editer").css("display","none");
                    $(this).closest('.confirm-box').find('.able').prop("disabled", true );
                }
                else{
                    $(this).closest('.confirm-box').find('.able input').prop("disabled", true );
                    $(this).closest('.confirm-box').find('.able button').prop("disabled", true );
                }
                $(this).closest('.confirm-box').find('.icon-check').css("display","none");
               
               

            }
        });
        validate.isInput = false;
    });




    $('.excute-audio button').click(function(e){
        e.preventDefault();
        setPending(false);
        setInput(false);
        setLoading(true);
    
        for (const [key, value] of Object.entries(validate)) {
            console.log(`${key}: ${value}`);
            if(value==false){
                alert("Nh???p thi???u tr?????ng ho???c ch??a ???n x??c nh???n t???i m???i l???a ch???n", key);
                setLoading(false);
                setPending(true);
                setInput(true);
                return;
            }
        }

        // var file = fileInput[0].files[0];
        var voice = voiceInput.val();
        var speed = speedInput.val();
        var content = textInput.val();

        // console.log("file: "+file.name+"\ncontent: "+content+"\nvoice: "+voice+"\nspeed: "+speed);


        //?????c file ra text truy???n v??o bi???n content
        if (content.trim()==="") {
            alert("Kh??ng c?? th??ng tin ????? ?????c ho???c ch??a ???n x??c nh???n t???i m???i l???a ch???n");
            return;
        }
        if(voice ==='null'){
            voice = "banmai";
        };

        $.ajax({
            url: `/audio_book/api/${content}/${voice}/${speed}`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                setTimeout(() => {
                    setPending(false);
                    setLoading(false);
                    setInput(true);
                    setOutput(true);
                    console.log(response);
                    audioOutput.attr('src', response.async);
                }, 1000); // Th???c thi sau 5 gi??y: do l???n ?????u tr??? v??? link xo ????? tr??? do b??n API
            },
            error: function (xhr, status, error) {
                setLoading(true);
                // setPending(true);
                setInput(true);
                console.log(error);
            }
        });
    })

    function setLoading(on){
        if(on===true){
            $('.section-studio .loading').css("display","flex");
        }    
        else{
            $('.section-studio .loading').css("display","none");
        }
    }
    function setPending(on){
        if(on===true){
            $('.section-studio .pending').css("display","block");
        }    
        else{
            $('.section-studio .pending').css("display","none");
        }
    }
    function setOutput(on){
        if(on===true){
            $('.section-studio .output').css("display","block");
        }    
        else{
            $('.section-studio .output').css("display","none");
        }
    }

    function setInput(on){
        if(on===true){
            $('.section-studio .input').prop("disabled", false );
            $('.section-studio .input').css("opacity","1");
        }    
        else{
            $('.section-studio .input').prop("disabled", true );
            $('.section-studio .input').css("opacity","0.5");
        }
    }
   
   
   
        
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

var swiper3 = new Swiper(".user-slides", {
    slidesPerView: 2.5,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});



