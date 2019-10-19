$(function (){
  console.log('init 0.1');
  
  $('#nav-toggler').click(function(e){
    target = $(this).data('target');
    $('#'+target).toggleClass('nav__list--active');
  });  


  $('.packaging__title').click(function(e){
    console.log('test');
    $('.packaging__item').removeClass('packaging__item--active');
    $(this).closest('.packaging__item').toggleClass('packaging__item--active');
  });  


  $('.packaging__tab').click(function(e){
    var index = $(this).data('index');
    $('.packaging__tab').removeClass('packaging__tab--active');
    $(this).toggleClass('packaging__tab--active');
    
    $('.packaging__item').removeClass('packaging__item--active');
    $('.packaging__item[data-index="'+index+'"]').toggleClass('packaging__item--active');
  });

  if ($('#map').length) {
    ymaps.ready(function(){
      console.log('ymaps ready');
      
      map = new ymaps.Map("map", {
          center: [59.7615, 30.5855],
          zoom: 14,
          controls: []
      });

      placemark=new ymaps.Placemark(
        [59.761336, 30.602260],
        {
          balloonContent:"Производство",
          balloonContentHeader:"Производство",
          balloonContentBody:"196655, г. Санкт-Петербург, г. Колпино, Сапёрный переулок, 6"
        },
        { 
          iconLayout: 'default#image',
        });

      map.geoObjects.add(placemark);
    }); 
  }

  if ($('#slider-packaging').length) {
    var sliderPackaging = $('#slider-packaging .slider__items').lightSlider({
      item:1,
      loop:false,
      slideMove:1,
      speed:600,
      pager:false,
      controls: true,
    });
    
    $('#slider-packaging .slider__arrow--prev').click(function(){
      sliderPackaging.goToPrevSlide(); 
    });

    $('#slider-packaging .slider__arrow--next').click(function(){
      sliderPackaging.goToNextSlide(); 
    });
  }

  if ($('#slider-consult').length) {
    var sliderConsult = $('#slider-consult .consult__items').lightSlider({
      item:1,
      auto:true,
      pauseOnHover: true,
      loop:true,
      pause: 3000,
      slideMove:1,
      speed:600,
      pager:false,
      controls: true,
      onBeforeSlide: function (el) {
        var slide = el.getCurrentSlideCount() - 1;
        $('#slider-consult .consult__part').removeClass('consult__part--active');
        $('#slider-consult .consult__part[data-slide="'+slide+'"]').addClass('consult__part--active')
      }
    });
    
    $('#slider-consult .consult__part').click(function(e){
      var slide = $(this).data('slide');
      $('#slider-consult .consult__part').removeClass('consult__part--active');
      $(this).addClass('consult__part--active')
      sliderConsult.goToSlide(slide);
    }); 
  }


  if ($('#services').length) {
     var sliderServices = $('#services .services__list').lightSlider({
      item:6,
      loop:false,
      slideMove:1,
      speed:600,
      pager:false,
      controls: true,
      responsive : [
          {
              breakpoint:800,
              settings: {
                  item:3,
                  slideMove:1,
                  slideMargin:6,
                }
          },
          {
              breakpoint:480,
              settings: {
                  item:2,
                  slideMove:1
                }
          }
      ]
    });
  }

  /* POPUPS */
  $('[data-popup]').click(function(e){
    var target = $(this).data('target');
    var overlay = $('.popup-overlay');
    var popup = $('.popup[data-popup="'+target+'"]');
    
    if (popup) {
      overlay.addClass('popup-overlay--active');
      popup.addClass('popup--active');
    }
  });

  $(window).click(function() {
    $('.popup--active').removeClass('popup--active');
    $('.popup-overlay--active').removeClass('popup-overlay--active');
  });

  $('.popup__close').click(function(e){
    $('.popup--active').removeClass('popup--active');
    $('.popup-overlay--active').removeClass('popup-overlay--active');
    return false;

  });
  
  $('.popup, [data-popup]').click(function(event){
      event.stopPropagation();
  });


  
  if ($('.karton').length) {
    var white = $('.karton__img--white');
    var aTop = white.offset().top;
    var bTop = $('.slider__img').offset().top;
    var _100 = (bTop-aTop);
    var scrollable = true;
    
    $(window).scroll(function(){
      if (scrollable) {
        var scroll = 1;
        
        if ($(this).scrollTop()) scroll = 1 - $(this).scrollTop()/_100;
        white.fadeTo(0,scroll);
        
        if($(this).scrollTop()>=_100){
          scrollable = false;
          $('.karton__img--main').css('visibility', 'visible');
          $('.slider__img--karton').css('visibility', 'visible');
          $('.karton__img--fixed').hide();
        }
      }
    });
  }

  if ($('.certificates')) {
    $('.certificates').magnificPopup({
      delegate: 'a', // child items selector, by clicking on it popup will open
      type: 'image',
      zoom: {
        enabled: true,
        duration: 400 // don't foget to change the duration also in CSS
      }
    });
  }


  /* COOKIES */

  var cookie_msg = document.cookie.match(new RegExp("(?:^|; )karton-cookie-active=([^;]*)"));
    cookie_msg = cookie_msg ? decodeURIComponent(cookie_msg[1]) : undefined;

  if(!cookie_msg) {
    $('.cookie').addClass('cookie--active');

    var popup = $('.popup[data-popup="cookie"]');
    var overlay = $('.popup-overlay');
    
    if (popup) {
      overlay.addClass('popup-overlay--active');
      popup.addClass('popup--active');
    }
   
  }

  $('.popup__btn--cookie').click(function(e){
    overlay.removeClass('popup-overlay--active');
    popup.removeClass('popup--active');
    document.cookie = "karton-cookie-active=1";
  });

});


(function() {
  // Get relevant elements and collections
  const tabbed = document.querySelector('.services');
  const tablist = tabbed.querySelector('ul');
  const tabs = tablist.querySelectorAll('a');
  const panels = tabbed.querySelectorAll('[id^="section"]');
  
  // The tab switching function
  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  }
  
  // Add the tablist role to the first <ul> in the .tabbed container
  tablist.setAttribute('role', 'tablist');
  
  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');
    
    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', e => {
      e.preventDefault();
      let currentTab = tablist.querySelector('[aria-selected]');
      currentTab.classList.remove('services__link--active');
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
        e.currentTarget.classList.add('services__link--active');
      }
    });
    
    // Handle keydown events for keyboard users
    tab.addEventListener('keydown', e => {
      // Get the index of the current tab in the tabs node list
      let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
      if (dir !== null) {
        e.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
      }
    });
  });
  
  // Add tab panel semantics and hide them all
  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    let id = panel.getAttribute('id');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true; 
  });
  
  // Initially activate the first tab and reveal the first tab panel
  tabs[0].removeAttribute('tabindex');
  tabs[0].setAttribute('aria-selected', 'true');
  panels[0].hidden = false;
})();
