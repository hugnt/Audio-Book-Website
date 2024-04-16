const { User } = require("../models/User");
const { Book } = require("../models/Book");
const crypto = require("crypto");
const SIGNATURE = "APPLE VO DICH";
class UserController {
  async getById(req, res, next) {
    let id = req.params.id;
    User.getAccount(id)
      .then((user) => {
        res.json(user[0]);
      })
      .catch(next);
  }
  async login(userLogin) {
    var allUser = await User.getAll();
    const isExistUser = allUser.some(
      (x) =>
        x.username == userLogin.username &&
        x.password == hash256(userLogin.password)
    );
    if (isExistUser) return createToken(userLogin.username, SIGNATURE);
    return null;
  }
  async register(userLogin) {
    var allUser = await User.getAll();
    const isExistUser = allUser.some((x) => x.username == userLogin.username);
    if (isExistUser) return null;
    try {
      userLogin.password = hash256(userLogin.password);
      await User.createAccount(userLogin);
      return createToken(userLogin.username, SIGNATURE);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async openProfile(req, res, next) {
    let username = req.params.username;
    var allUser = await User.getAll();
    const userInfor = allUser.find((x) => x.username == username);
    if (userInfor==null||userInfor==undefined){
        res.redirect(`/home`);
        return;
    }
    Promise.all([User.getAccount(userInfor.id), Book.getBooksByAccount(userInfor.id)])
        .then((results)=>{
            res.render('profile',{
                user:results[0],
                books: results[1]
            });
        })
        .catch(next); 
  }
}

function hash256(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

function createToken(username, signature) {
  const data = username + signature;

  // Sử dụng thuật toán mã hóa MD5 hoặc SHA-256
  const algorithm = "sha256";

  // Tạo đối tượng mã hóa
  const hash = crypto.createHash(algorithm);

  // Mã hóa dữ liệu
  const token = hash.update(data).digest("hex");

  // Trả về token
  return token;
}

module.exports = new UserController();
