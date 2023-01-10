const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

let login=$$('.login h2')
function loginForm(i,j){
  login[i].onclick=function(){
    login[j].classList.remove('active')
    login[j].classList.add('nonactive')
    login[i].classList.remove('nonactive')
    login[i].classList.add('active')
    $$('.text')[2].classList.toggle('active1')
    $$('.text')[2].classList.toggle('nonactive1')
    $$('span')[2].classList.toggle('active1')
    $$('span')[2].classList.toggle('nonactive1')
    $('.signin').classList.toggle('nonactive1')
    $('.signin').classList.toggle('active1')
    $('.signup').classList.toggle('nonactive1')
    $('.signup').classList.toggle('active1')
    $('.custom-checkbox').classList.toggle('nonactive1')
    $('.custom-checkbox').classList.toggle('active1')
    $('label').classList.toggle('nonactive1')
    $('label').classList.toggle('active1')
  }
}
loginForm(1,0)
loginForm(0,1)

//Tai khoan
account=[
  {
    username:'phucla@gmail.com',
    pass:'123456'
  },
  {
    username:'hungthanh@gmail.com',
    pass:'134567'
  },
  {
    username:'duyquang@gmail.com',
    pass:'145678'
  }
]


$('.signin').onclick = function(){
  account.forEach((item,index)=>{
    let user=$$('.text')[0].value
    let pass=$$('.text')[1].value
      if((item.username==user && item.pass==pass) || (user==localStorage.user && pass==localStorage.password)){
        $('a').click()
      }
      else{
        $('p').classList.add('active1');
        $('p').classList.remove('nonactive1');
        $('p').innerHTML = 'Wrong password or username'
      }
  })
}
var user=''
var password=''

$('.signup').onclick = function(){
  let username=$$('.text')[0].value
  let pass=$$('.text')[1].value
  let repass=$$('.text')[2].value
  if(repass==pass && username.length>=6 && pass.length>=6 ){
    account.push({username:$$('.text')[0].value,pass:$$('.text')[1].value})
    localStorage.user=username; 
    localStorage.password=pass;
    login[0].click()
  }
  else if(username.length<6 ){
    $('p').classList.add('active1');
    $('p').classList.remove('nonactive1');
    $('p').innerHTML = 'Username length is not length enough'
  }
  else if(pass.length<6 ){
    $('p').classList.add('active1');
    $('p').classList.remove('nonactive1');
    $('p').innerHTML = 'Password length is not length enough'
  }
  else{
    $('p').classList.add('active1');
    $('p').classList.remove('nonactive1');
    $('p').innerHTML = 'Repeat password not is the same of password'
  }
}
localStorage.array=['123','331']
console.log(localStorage.user,localStorage.password)
console.log(localStorage.array)





