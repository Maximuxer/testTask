"use strict";
// для данных
let discript = {}; 

function init(){
// Вычитаем файл Джейсон
    $.getJSON("products.json", goodsOut)
}

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
 // Авторизация(если єто можно так назвать:)))))
function loginEnter(){
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    if(login==="admin" && password==="admin"){
        document.location.href ="catalog.html"
    } else {
        alert('Ошибка авторизации')
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