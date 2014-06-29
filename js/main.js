var simpleSlider = function() {
    'use strict';
    var slidersWidth = 160,  // define one slider width
		sliderHeight = 160,  // define slider height
		slidersElements = 5, // define sliders visible elements
		slider = $('slider-list'),
		sliders = slider.getElements('li'),
		sliderWidth = sliders.length * slidersWidth,
		sliderModule = (sliders.length / slidersElements).toInt(),
		arrowsBox,
		arrowLeft,
		arrowRight,
		sliderPosition;
	if (sliders.length % slidersElements != 0) {sliderModule = sliderModule + 1;}
	var sliderModulor = (sliderModule - 1) * slidersElements * slidersWidth;
    slider.set('morph', {duration: 'normal', transition: 'cubic:in'});
    slider.getParent().setStyles({'overflow' : 'hidden', 'height' : sliderHeight, 'position' : 'relative'});
    slider.setStyles({'height' : sliderHeight, 'width' : sliderWidth, 'position' : 'absolute'});
    sliderPosition = slider.getStyle('left').toInt();

    if (sliders.length > slidersElements) {
        arrowLeft = new Element('a#arr-l', {html : '&laquo;'}).setStyles({'display' : 'block', 'width' : 30, 'height' : 30, 'position' : 'absolute', 'left' : 0, 'text-align' : 'center', 'top' : sliderHeight / 2 - 15, 'cursor' : 'pointer', 'color' : '#fff', 'background' : 'rgba(0,0,0,.6)', 'line-height' : 30});
        arrowRight = new Element('a#arr-r', {html : '&raquo;'}).setStyles({'display' : 'block', 'width' : 30, 'height' : 30, 'position' : 'absolute', 'right' : 0, 'text-align' : 'center', 'top' : sliderHeight / 2 - 15, 'cursor' : 'pointer', 'color' : '#fff', 'background' : 'rgba(0,0,0,.6)', 'line-height' : 30});
        arrowsBox = new Element('div#arrow-box');
        arrowsBox.inject(slider, 'after').adopt(arrowLeft, arrowRight);

        actButtons(sliderPosition, arrowLeft, arrowRight);

        //actions
        arrowLeft.addEvent('click', function(event) {
			if (sliderPosition < 0) {
				sliderPosition = sliderPosition + slidersWidth * slidersElements;
				slider.morph({'left' : sliderPosition});
				actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor);
			}            
        });
        arrowRight.addEvent('click', function(event) {
			if (sliderPosition > -sliderModulor) {
				sliderPosition = sliderPosition + -slidersWidth * slidersElements;
				slider.morph({'left': sliderPosition});
				actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor);
			}
        });
    }
	
    function actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor) {
        if (sliderPosition == 0) {
            arrowLeft.setStyles({'opacity' : '0.3', 'cursor' : 'default'}).removeClass('active');
            arrowRight.setStyles({'opacity': 1, 'cursor' : 'pointer'}).addClass('active');
        } else if (sliderPosition == -sliderModulor) {
            arrowRight.setStyles({'opacity': '0.3', 'cursor' : 'default'}).removeClass('active');
            arrowLeft.setStyles({'opacity': 1, 'cursor' : 'pointer'}).addClass('active');
        } else {
			arrowRight.setStyles({'opacity': 1, 'cursor' : 'pointer'}).addClass('active');
            arrowLeft.setStyles({'opacity': 1, 'cursor' : 'pointer'}).addClass('active');
		}
		
    }

};

$(window).addEvent('domready', function() {
	'use strict';
    simpleSlider();
});
