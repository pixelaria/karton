$(function (){
  console.log('init 0.1');
  
  $('#nav-toggler').click(function(e){
    target = $(this).data('target');
    $('#'+target).toggleClass('nav__list--active');
  });  


  $('.packaging__title').click(function(e){
    console.log('test');
    $(this).closest('.packaging__item').toggleClass('packaging__item--active');
  });  

});

