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
        
        
        for(let key in discript){
     
        out +=`<div class="descriptions">${goods[key].description}</div>`
             
         $("#myimg").attr("src",`img/${goods[key].imageSlide}`);
         $("#myimg2").attr("src",`img/${goods[key].imageSlide2}`);
         $("#myimg3").attr("src",`img/${goods[key].imageSlide3}`);
         $("#myimg4").attr("src",`img/${goods[key].imageSlide4}`);
        }
         $('.block2').html(out);
      
         
    });
}  


// Очистка данных при выходи со страницы
function clearLocalFile(){
    localStorage.removeItem('discript');
}
window.onunload = function() {
    clearLocalFile();
  };
//   Функция конструктор слайдер

//   Реализация
$(document).ready(function(){
    // Меню
    $('.icon').on('click', function(){
        $(this).closest('.menu').toggleClass('menu-open');
    })
    loadCart();
// Слайдер
   
 
    loadCart();
    (function() {

        let doc = document,
            index = 1;
    
        let Slider = function() {
            this.box = doc.querySelector('.carousel-container');
            this.slidesBox = doc.querySelector('.carousel-slides');
            this.slides = doc.querySelectorAll('.slide');
            this.btns = doc.querySelectorAll('.btns');
            this.size = this.box.clientWidth;
    
            this.position();
            this.carousel();
    
        };
    
        Slider.prototype.position = function() {
            var size = this.size;
            this.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
        };
    
        Slider.prototype.carousel = function() {
            let i, max = this.btns.length,
                that = this;
    
            for (i = 0; i < max; i += 1) {
                that.btns[i].addEventListener('click', Slider[that.btns[i].id].bind(null, that));
            }
        }
    
        Slider.prev = function(box) {
            box.slidesBox.style.transition = "transform .3s ease-in-out";
            let size = box.size;
            index <= 0 ? false : index--;
            box.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
            box.jump();
        };
    
        Slider.next = function(box) {
            box.slidesBox.style.transition = "transform .3s ease-in-out";
            let max = box.slides.length;
            let size = box.size;
            index >= max - 1 ? false : index++;
            box.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
            box.jump();
        };
    
        Slider.prototype.jump = function() {
            let that = this;
            let size = this.size;
            this.slidesBox.addEventListener('transitionend', function() {
                
                that.slidesBox.style.transition = "none";
                that.slidesBox.style.transform = 'translateX(' + (-index * size) + 'px)';
            });
        }
    
    
        new Slider();
    
    })();
})