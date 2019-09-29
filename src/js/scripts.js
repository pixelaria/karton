$(function (){
  console.log('init 0.1');
  
  $('#nav-toggler').click(function(e){
    target = $(this).data('target');
    $('#'+target).toggleClass('nav__list--active');
  });  

});

