
$(function(){console.log('init 0.1');$('#nav-toggler').click(function(e){target=$(this).data('target');$('#'+target).toggleClass('nav__list--active');});$('.packaging__title').click(function(e){console.log('test');$(this).closest('.packaging__item').toggleClass('packaging__item--active');});if($('#map').length){ymaps.ready(function(){console.log('ymaps ready');map=new ymaps.Map("map",{center:[59.7615,30.5855],zoom:14,controls:[]});placemark=new ymaps.Placemark([59.761336,30.602260],{balloonContent:"Производство",balloonContentHeader:"Производство",balloonContentBody:"196655, г. Санкт-Петербург, г. Колпино, Сапёрный переулок, 6"},{iconLayout:'default#image',});map.geoObjects.add(placemark);});}});window.onload=function(){console.log('baron');};