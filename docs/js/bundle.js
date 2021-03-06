$(function () {
    console.log("init 0.1");
    $("#nav-toggler").click(function (e) {
        target = $(this).data("target");
        $("#" + target).toggleClass("nav__list--active");
    });
    $(".packaging__title").click(function (e) {
        console.log("test");
        $(".packaging__item").removeClass("packaging__item--active");
        $(this).closest(".packaging__item").toggleClass("packaging__item--active");
    });
    $(".packaging__tab").click(function (e) {
        var index = $(this).data("index");
        $(".packaging__tab").removeClass("packaging__tab--active");
        $(this).toggleClass("packaging__tab--active");
        $(".packaging__item").removeClass("packaging__item--active");
        $(".packaging__item[data-index=\"" + index + "\"]").toggleClass("packaging__item--active");
    });
    if ($("#map").length) {
        ymaps.ready(function () {
            console.log("ymaps ready");
            map = new ymaps.Map("map", {center: [59.7615, 30.5855], zoom: 14, controls: []});
            placemark = new ymaps.Placemark([59.761336, 30.602260], {
                balloonContent: "Производство",
                balloonContentHeader: "Производство",
                balloonContentBody: "196655, г. Санкт-Петербург, г. Колпино, Сапёрный переулок, 6",
            }, {iconLayout: "default#image"});
            map.geoObjects.add(placemark);
        });
    }
    if ($("#slider-packaging").length) {
        var sliderPackaging = $("#slider-packaging .slider__items")
            .lightSlider({item: 1, loop: false, slideMove: 1, speed: 600, pager: false, controls: true});
        $("#slider-packaging .slider__arrow--prev").click(function () {sliderPackaging.goToPrevSlide();});
        $("#slider-packaging .slider__arrow--next").click(function () {sliderPackaging.goToNextSlide();});
    }
    if ($("#slider-consult").length) {
        var sliderConsult = $("#slider-consult .consult__items").lightSlider({
            item: 1,
            auto: true,
            pauseOnHover: true,
            loop: true,
            pause: 3000,
            slideMove: 1,
            speed: 600,
            pager: false,
            controls: true,
            onBeforeSlide: function (el) {
                var slide = el.getCurrentSlideCount() - 1;
                $("#slider-consult .consult__part").removeClass("consult__part--active");
                $("#slider-consult .consult__part[data-slide=\"" + slide + "\"]").addClass("consult__part--active");
                $(".consult__image").removeClass("consult__image--active");
                $(".consult__image[data-slide=\"" + slide + "\"]").addClass("consult__image--active");
            },
        });
        $("#slider-consult .consult__part").click(function (e) {
            var slide = $(this).data("slide");
            $("#slider-consult .consult__part").removeClass("consult__part--active");
            $(this).addClass("consult__part--active");
            sliderConsult.goToSlide(slide + 1);
        });
    }
    if ($("#services").length) {
        var sliderServices, sliderServicesTabs;
        sliderServices = $("#services .services__list").lightSlider({
            item: 6,
            loop: false,
            slideMove: 1,
            speed: 600,
            pager: false,
            controls: false,
            autoWidth: true,
            responsive: [
                {breakpoint: 800, settings: {item: 3, slideMove: 1, slideMargin: 6}},
                {breakpoint: 480, settings: {item: 2, slideMove: 1}},
            ],
            onAfterSlide: function (el) {sliderServicesTabs.goToSlide($(el).parent().find(".active").index());},
        });
        sliderServicesTabs = $("#services .services__tabs").lightSlider({
            item: 1,
            slideMove: 1,
            speed: 600,
            pager: false,
            controls: false,
            slideMargin: 300,
            enableTouch: false,
            enableDrag: false,
        });
        $(".services__link").click(function (el) {
            $(".services__link--active").removeClass("services__link--active");
            $(this).addClass("services__link--active");
            var index = $(this).parent().index();
            sliderServicesTabs.goToSlide(index);
            sliderServices.goToSlide(index);
        });
    }
    if ($("#packaging").length) {
        var sliderPackaging, sliderPackagingTabs;
        sliderPackaging = $("#packaging .packaging__list").lightSlider({
            item: 6,
            loop: false,
            slideMove: 1,
            speed: 600,
            pager: false,
            controls: false,
            autoWidth: true,
            responsive: [
                {breakpoint: 800, settings: {item: 3, slideMove: 1, slideMargin: 6}},
                {breakpoint: 480, settings: {item: 2, slideMove: 1}},
            ],
            onAfterSlide: function (el) {sliderPackagingTabs.goToSlide($(el).parent().find(".active").index());},
        });
        sliderPackagingTabs = $("#packaging .packaging__tabs").lightSlider({
            item: 1,
            slideMove: 1,
            speed: 600,
            pager: false,
            controls: false,
            slideMargin: 300,
            enableTouch: false,
            enableDrag: false,
        });
        $("#packaging .packaging__inner .slides")
            .lightSlider({item: 1, slideMove: 1, speed: 600, pager: false, controls: true, slideMargin: 0});
        $(".packaging__link").click(function (el) {
            $(".packaging__link--active").removeClass("packaging__link--active");
            $(this).addClass("packaging__link--active");
            var index = $(this).parent().index();
            sliderPackagingTabs.goToSlide(index);
            sliderPackaging.goToSlide(index);
        });
    }
    $("[data-popup]").click(function (e) {
        var target = $(this).data("target");
        var overlay = $(".popup-overlay");
        var popup = $(".popup[data-popup=\"" + target + "\"]");
        if (popup) {
            overlay.addClass("popup-overlay--active");
            popup.addClass("popup--active");
        }
    });
    $(window).click(function () {
        $(".popup--active").removeClass("popup--active");
        $(".popup-overlay--active").removeClass("popup-overlay--active");
    });
    $(".popup__close").click(function (e) {
        $(".popup--active").removeClass("popup--active");
        $(".popup-overlay--active").removeClass("popup-overlay--active");
        return false;
    });
    $(".popup, [data-popup]").click(function (event) {event.stopPropagation();});
    if ($(".karton").length) {
        var white = $(".karton__img--white");
        var aTop = white.offset().top;
        var bTop = $(".slider__img").offset().top;
        var _100 = (bTop - aTop);
        var scrollable = true;
        $(window).scroll(function () {
            if (scrollable) {
                var scroll = 1;
                if ($(this).scrollTop()) scroll = 1 - $(this).scrollTop() / _100;
                white.fadeTo(0, scroll);
                if ($(this).scrollTop() >= _100) {
                    scrollable = false;
                    $(".karton__img--main").css("visibility", "visible");
                    $(".slider__img--karton").css("visibility", "visible");
                    $(".karton__img--fixed").hide();
                }
            }
        });
    }
    if ($(".certificates")) {
        $(".certificates").magnificPopup({delegate: "a", type: "image", zoom: {enabled: true, duration: 400}});
    }
    var cookie_msg = document.cookie.match(new RegExp("(?:^|; )karton-cookie-active=([^;]*)"));
    cookie_msg = cookie_msg ? decodeURIComponent(cookie_msg[1]) : undefined;
    if (!cookie_msg) {
        $(".cookie").addClass("cookie--active");
        var popup = $(".popup[data-popup=\"cookie\"]");
        var overlay = $(".popup-overlay");
        if (popup) {
            overlay.addClass("popup-overlay--active");
            popup.addClass("popup--active");
        }
        document.cookie = "karton-cookie-active=1";
    }
    $(".popup__btn--cookie").click(function (e) {
        overlay.removeClass("popup-overlay--active");
        popup.removeClass("popup--active");
        document.cookie = "karton-cookie-active=1";
        return false;
    });
    $(".contacts-form__input").each(function () {
        if ($(this).val())
            $(this).addClass("used");
    });
    $(".contacts-form__input").blur(function () {
        if ($(this).val())
            $(this).addClass("used"); else
            $(this).removeClass("used");
    });
    $(".contacts-form__btn").click(function (e) {
        console.log("contacts-form__btn");
        e.preventDefault();
        var form = $(this).closest("form");
        if (validateForm(form)) {
            $.ajax({
                method: "POST",
                url: "/mailer.php",
                data: form.serialize(),
                dataType: "json",
                success: function (json) {
                    console.log("success");
                    window.setTimeout(function () {
                        form.find(".contacts-form__title").html("Спасибо за обращение! Мы ответим в ближайшее время.");
                        form.find(".form__text").html("Спасибо за обращение! Мы ответим в ближайшее время.");
                    }, 1000);
                    window.setTimeout(function () {
                        $(".error").remove();
                        $(".contacts-form__input").each(function () {
                            $(this).removeClass("used");
                            $(this).parent().removeClass("has-error");
                            $(this).val("");
                        });
                        $(".popup__close").trigger("click");
                    }, 4000);
                },
                error: function (xhr, ajaxOptions, thrownError) {alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);},
            });
        }
    });

    function validateForm(form) {
        console.log("validateForm");
        var result = true;
        form.find(".contacts-form__group").removeClass("has-error");
        form.find(".error").remove();
        console.log("getContacts");
        var contacts = form.find("input[name=\"contacts\"]");
        if (!contacts.val()) {
            contacts.parent().addClass("has-error");
            contacts.parent().append("<p class=\"error\">Введите ваш контакт</p>");
            result = false;
        }
        console.log("validated", result);
        return result;
    }
});