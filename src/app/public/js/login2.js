import * as API from './api/ajax_config.js';
let login = $('.login h2');

function loginForm(i, j) {
  login.eq(i).click(function () {
    login.eq(j).removeClass('active');
    login.eq(j).addClass('nonactive');
    login.eq(i).removeClass('nonactive');
    login.eq(i).addClass('active');
    $('.text').eq(2).toggleClass('active1');
    $('.text').eq(2).toggleClass('nonactive1');
    $('span').eq(2).toggleClass('active1');
    $('span').eq(2).toggleClass('nonactive1');
    $('.signin').toggleClass('nonactive1');
    $('.signin').toggleClass('active1');
    $('.signup').toggleClass('nonactive1');
    $('.signup').toggleClass('active1');
    $('.custom-checkbox').toggleClass('nonactive1');
    $('.custom-checkbox').toggleClass('active1');
    $('label').toggleClass('nonactive1');
    $('label').toggleClass('active1');
  });
}

loginForm(1, 0);
loginForm(0, 1);

//Tai khoan


$('.signin').click(async function () {
    let username = $('.text').eq(0).val();
    let password = $('.text').eq(1).val();
    //
    var loginInfor = {
      username, password
    }
    try {
      var loginRes = await API.postData('login',loginInfor);
      console.log(loginRes);
      localStorage.username = username;
      localStorage.accessToken = loginRes.accessToken;
      window.location.href ="/loading";
    } catch (error) {
      console.log(error);
      $('p').addClass('active1');
      $('p').removeClass('nonactive1');
      $('p').html('Wrong password or username');
    }
});


$('.signup').click(async function () {
  let username = $('.text').eq(0).val();
  let password = $('.text').eq(1).val();
  let repassword = $('.text').eq(2).val();
  if (repassword == password && username.length >= 6 && password.length >= 6) {
    try {
      var loginInfor = {username, password};
      var signupRes = await API.postData('register',loginInfor);
      localStorage.username = username;
      localStorage.accessToken = signupRes.accessToken;
      window.location.href ="/loading";
    } catch (error) {
      console.log(error);
    }
  } else if (username.length < 6) {
    $('p').addClass('active1');
    $('p').removeClass('nonactive1');
    $('p').html('Username length is not long enough');
  } else if (password.length < 6) {
    $('p').addClass('active1');
    $('p').removeClass('nonactive1');
    $('p').html('Password length is not long enough');
  } else {
    $('p').addClass('active1');
    $('p').removeClass('nonactive1');
    $('p').html('Repeat password is not the same as password');
  }
});

