"use strict";
// для данных
let discript = {}; 

function init(){
// Вычитаем файл Джейсон
    $.getJSON("products.json", goodsOut);
    $.getJSON("authorization.json", authorisation);
}

//  Валидация
function validate() {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let login = document.getElementById("login").value;
    
    if(reg.test(login) == false) {
       alert('Введите корректный e-mail');
    
       return false;
    }
 }

// Проверка пользователей на наличие
function authorisation(data){
    let count = 0;
    $('#logins').on("click", function(){
        validate()
        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;
            for( let key in data){  
                    if(login === data[key].email && password===data[key].password){
                        document.location.href ="catalog.html"
                    A();
                } 
        }     
  });
    function A(){
         //сохраняю lданные в localStorage
    localStorage.setItem('login', JSON.stringify(count)); //в строку
    }
}

//   function B(){
//         //проверяю есть ли в localStorage запись discript
// //         if (localStorage.getItem('login')) {
// //             console.log("oke" )
// //         }  else {
// //             // document.location.href ="index.html"
// //         }
// //   }


function goodsOut(data){
    // Вывод на страницу
//  let goods = JSON.parse(data); - если приходит строка
 let out ='';
 for( let key in data){
// Шаблонизированные строки Есма6 
    out +='<div class="grid-item">';
    out +=`<h1>${data[key].name}</h1>`;
    out +=`<div class="image"><img src="./img/${data[key].img}" alt="photo"></div>`;
    out +=`<div class="cost">${data[key].cost}</div>`;
    out +=`<a  class="btn btn--stripe out"  id="${key}" href="./description-item.html">Подробнее</a>`;
    out +='</div>'; 
 }
 
  // Записываем в структуру страницы HTML
$('.grid').html(out);
$(".out").on('click', moreInfo)

}

function moreInfo(){
    // console.log(this.id);
    discript[this.id] = true; //В discript записываю по айди обьект.
    
    saveCart();
}
function saveCart() {
    //сохраняю lданные в localStorage
    localStorage.setItem('discript', JSON.stringify(discript)); //в строку
}
function loadCart() {
    //проверяю есть ли в localStorage запись discript
    if (localStorage.getItem('discript')) {
    // если есть - расширфровываю и записываю в переменную discript
    discript = JSON.parse(localStorage.getItem('discript'));
    }
   
}
 
// Реализация 
$(document).ready(function(){
	$('.icon').on('click', function(){
        $(this).closest('.menu').toggleClass('menu-open');
    })

    init();
    loadCart();
    
    
});