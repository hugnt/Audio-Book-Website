const path = require("path");
const { speechToText } = require("../../util/fptAPI2");
const fs = require("fs");
class SpeechToTextController {
  async convertAudioToText(req, res, next) {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.files.body.name);

      const UPLOADS_DIR ="D:/Documents/SchoolFiles/IT/SEMESTER_6/API/project/Audio-Book-Website/src/app/public/audio_to_text";

      // Tạo thư mục nếu chưa tồn tại
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR);
      }

      let uploadedFile = req.files.body;
      // Lưu file âm thanh vào thư mục UPLOADS_DIR
      uploadedFile.mv(
        path.join(UPLOADS_DIR, uploadedFile.name),
        async function (err) {
          if (err) {
            console.error("Error saving file:", err);
            return res.status(500).send(err);
          }
          console.log("File saved successfully");
          // Gọi hàm xử lý chuyển đổi âm thanh thành văn bản và gửi kết quả về
          try {
            const text = await speechToText(
              path.join(UPLOADS_DIR, uploadedFile.name)
            );
            //console.log("Converted text:", text);
            res.json({ text });
          } catch (error) {
            console.error("Error converting audio to text:", error);
            return res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SpeechToTextController();
