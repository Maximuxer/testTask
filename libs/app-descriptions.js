"use strict";

let discript = {};

function loadCart() {
    //проверяю есть ли в localStorage запись discript
    if (localStorage.getItem('discript')) {
        //расширфровываю и записываю в переменную discript
        discript = JSON.parse(localStorage.getItem('discript'));
             showDist();
            console.log(discript);
        }
}
 //Вывод на страницу
function  showDist(){
    $.getJSON("products.json", function (data) {
        let goods = data;
        let out = '';
        let slider ='';
        for(let id in discript){
            
            // console.log(goods)
            // console.log(discript)
            // console.log(id)
            out +=`<div class="descriptions">${goods[id].description}</div>`
            slider += `<img class="img curry" src="./img/${goods[id].imageFull}"   alt="">
            <img class="img " src="./img/sold2.png"   alt=""> ` // Чтобы показать слайдер подключил
        }
         $('.block2').html(out);
         $('.slider').html(slider);
         
    });
}  

// Очистка данных при выходи со страницы
function clearLocalFile(){
    localStorage.removeItem('discript');
}
window.onunload = function() {
    clearLocalFile();
  };
 
//   Реализация
$(document).ready(function(){
    // Меню
    $('.icon').on('click', function(){
        $(this).closest('.menu').toggleClass('menu-open');
    })
    loadCart();
// Слайдер
    $('.next').click(function() {
        
        let currentImage = $('.img.curry');
        let currentImageIndex = $('.img.curry').index();
        let nextImageIndex = currentImageIndex + 1;
        let nextImage = $('.img').eq(nextImageIndex);
        currentImage.fadeOut(1000);
        currentImage.removeClass('curry');

        if(nextImageIndex == ($('.img:last').index()+1)) {
            $('.img').eq(0).fadeIn(1000);
            $('.img').eq(0).addClass('curry');
        } else {
            nextImage.fadeIn(1000);
            nextImage.addClass('curry');
        }
    });

    $('.prev').click(function() {
        let currentImage = $('.img.curry');
        let currentImageIndex = $('.img.curry').index();
        let prevImageIndex = currentImageIndex - 1;
        let prevImage = $('.img').eq(prevImageIndex);
        currentImage.fadeOut(1000);
        currentImage.removeClass('curry');
        prevImage.fadeIn(1000);
        prevImage.addClass('curry');
    });
    loadCart();
})