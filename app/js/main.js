

$(function () {
    $('.menu__list').hide();
    //-----------------------------------------работа кнопки меню
    $('.menu__btn').click(function () {
        $(this).toggleClass('active');
        $('.menu__list').slideToggle();
	});

    //---------------------slick
    $('.promo').slick({
		dots: true,
        infinite: true,
        vertical: true,
        arrows: false,
		appendDots: $('.dots'),
		swipeToSlide: true,
		// autoplay: true
		responsive: [
			{
			  breakpoint: 900,
				settings: {
					vertical: false,
					fade: true,
					autoplay: true
			  }
			}
			
		  ]
	});
    //-----------------------------------------работа eye
    $('.view-btn').click(function () {
        $(this).toggleClass('active');
        $('.menu__btn').toggleClass('off');
        $('.header__logo').toggleClass('off');
        $('.dots').toggleClass('off');
        $('.promo__item').toggleClass('off');
	});
	
	var containerEl1 = document.querySelector('[data-ref="container"]');
	var containerEl2 = document.querySelector('[data-ref="container2"]');
   
	var config = {
	  controls: {
		scope: 'local'
	  }
	};
   
	var mixer1 = mixitup(containerEl1, config);
	var mixer2 = mixitup(containerEl2, config);

});


$(document).ready(function() {
	$('.gallery__list').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank"></a>';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});
});

$(document).ready(function() {
	$('.collection__list').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank"></a>';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});
});