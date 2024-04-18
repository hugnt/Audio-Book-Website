$(document).ready(function () {
  const audioOutput = $(".section-studio .output .audio-res audio");
  const audioElement = audioOutput[0];
  let isPlaying = false;

  const fileInput = $(".section-studio .input .custom-file-input");

  // Input file change event
  $("#inputGroupFile04").on("change", function () {
    $(this).next(".custom-file-label").html(fileInput.prop("files")[0].name);
    //sendAudioToAPI(fileInput.prop("files")[0]);
  });

  // Function to send audio file to API
  function sendAudioToAPI(file) {
    setPending(false);
    setLoading(true);
    setOutput(false);
    const formData = new FormData();
    formData.append("body", file);
    fetch("/convert", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => handleAPIResponse(data))
      .catch((error) => {
        setLoading(false);
        setPending(true);
        console.error("Error uploading audio:", error);
        alert("Lỗi trong quá trình tạo sách từ audio")
      });
  }

  // Function to handle API response
  function handleAPIResponse(response) {
    console.log("API response:", response);
    $(".result").val(response.text); // Giữ nguyên phần xử lý văn bản
    let textContent = response.text;

    // Tạo một đối tượng Blob từ dữ liệu văn bản
    let blob = new Blob([textContent], { type: "text/plain" });

    // Tạo một URL tạm thời cho Blob
    let url = window.URL.createObjectURL(blob);

    // Lấy thẻ <a> download và thiết lập thuộc tính href để tải về file văn bản
    let downloadLink = document.getElementById("downloadJsonLink");
    downloadLink.href = url;
    downloadLink.download = "Result.txt"; // Đặt tên cho file văn bản

    // Cập nhật văn bản trong thẻ <a> để hiển thị tên file
    downloadLink.textContent = "Download file text";

    // Hiển thị kết quả và ẩn loading
    setPending(false);
    setLoading(false);
    setOutput(true);
  }

  // Confirm button click event
  $("#btnAudioToText").on("click", function () {
    const fileInput = document.getElementById("inputGroupFile04");
    const file1 = fileInput.files[0];
    
    sendAudioToAPI(file1);
  });

  // Play uploaded audio
  function playUploadedAudio() {
    const fileInput = document.getElementById("inputGroupFile04");
    const file = fileInput.files[0];

    if (file) {
      console.log("file", file);
      const audioURL = URL.createObjectURL(file);

      audioElement.src = audioURL;
      stopUploadedAudio();
      audioElement.play();

      isPlaying = true;
      $(".try-listen button").hide();
      $("#stopListenButton").show();
    }
  }

  // Stop uploaded audio
  function stopUploadedAudio() {
    audioElement.pause();
    audioElement.currentTime = 0;
    isPlaying = false;
    $(".try-listen button").show();
    $("#stopListenButton").hide();
  }

  // Try button click event
  $(".try-listen button").on("click", function () {
    playUploadedAudio();
  });

  // Stop button click event
  $("#stopListenButton").on("click", function () {
    stopUploadedAudio();
  });

  // Stop audio when leaving the page
  $(window).on("beforeunload", function () {
    if (isPlaying) {
      stopUploadedAudio();
    }
  });

  function setLoading(on) {
    if (on === true) {
      $(".section-studio .loading").css("display", "flex");
    } else {
      $(".section-studio .loading").css("display", "none");
    }
  }
  function setPending(on) {
    if (on === true) {
      $(".section-studio .pending").css("display", "block");
    } else {
      $(".section-studio .pending").css("display", "none");
    }
  }
  function setOutput(on) {
    if (on === true) {
      $(".section-studio .output").css("display", "block");
    } else {
      $(".section-studio .output").css("display", "none");
    }
  }

  function setInput(on) {
    if (on === true) {
      $(".section-studio .input").css("pointer-events", "auto");
      $(".section-studio .input").prop("disabled", false);
      $(".section-studio .input").css("opacity", "1");
    } else {
      $(".section-studio .input").css("pointer-events", "none");
      $(".section-studio .input").prop("disabled", true);
      $(".section-studio .input").css("opacity", "0.5");
    }
  }

  $(".btn-readnow").click(function () {
    const bookId = $(this).data("id");
    window.location.href = `/bookmark_reading/${bookId}`;
  });

  $("#downloadAsPDF").click(function(){
        var doc = new jsPDF();
        const textVal = $("#result").val();
        doc.text(textVal, 10, 10)
        doc.save('a4.pdf')
  })
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
  slidesPerView: 6,
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
