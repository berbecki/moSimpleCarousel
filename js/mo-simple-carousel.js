var MoSimpleCarousel = new Class({
	Implements: [Events, Options],
	options:{
		sWidthOpt:160, 			// define one slider width
		sHeightOpt:160, 		// define carousel height
		sElementOpt:5,			// define carousels visible elements
		sOpt:'slider-list',		// define carousel 
		ssOpt:'li',				// define carousel name list 
		vNav:false				// enable or disable vertical navigation
    },
    initialize: function(options){
        this.setOptions(options);
        this.slide();
    },
	slide: function(){
		var slidersWidth = this.options.sWidthOpt,
			sliderHeight = this.options.sHeightOpt,
			slidersElements = this.options.sElementOpt, 
			slider = $(this.options.sOpt),
			sliders = slider.getElements(this.options.ssOpt),
			sliderWidth = sliders.length * slidersWidth,
			sliderModule = (sliders.length / slidersElements).toInt(),
			arrowsBox,
			arrowLeft,
			arrowRight,
			sliderPosition,
			sliderPagPosition,
			vNav = this.options.vNav;
		var sliderWrapper = new Element('div#slider-wrapper').wraps(slider);
		var slideBox = new Element('div#slider-box').setStyles({'height' : sliderHeight, 'position' : 'relative'}).wraps(sliderWrapper);
		if (sliders.length % slidersElements != 0) {sliderModule = sliderModule + 1;}
		var sliderModulor = (sliderModule - 1) * slidersElements * slidersWidth;
		slider.set('morph', {duration: 'normal', transition: 'cubic:in'});
		slider.getParent().setStyles({'overflow' : 'hidden', 'height' : sliderHeight, 'position' : 'relative'});
		slider.setStyles({'height' : sliderHeight, 'width' : sliderWidth, 'position' : 'absolute'});
		sliderPosition = 0;
		sliderPagPosition = 0;
		

		if (sliders.length > slidersElements) {
			arrowLeft = new Element('a#arr-l', {html : '&laquo;'}).setStyles({'display' : 'block', 'width' : 30, 'height' : 30, 'position' : 'absolute', 'left' : -36, 'text-align' : 'center', 'top' : sliderHeight / 2 - 15, 'cursor' : 'pointer', 'color' : '#fff', 'background' : 'rgba(0,0,0,.6)', 'line-height' : 30});
			arrowRight = new Element('a#arr-r', {html : '&raquo;'}).setStyles({'display' : 'block', 'width' : 30, 'height' : 30, 'position' : 'absolute', 'right' : -36, 'text-align' : 'center', 'top' : sliderHeight / 2 - 15, 'cursor' : 'pointer', 'color' : '#fff', 'background' : 'rgba(0,0,0,.6)', 'line-height' : 30});
			arrowsBox = new Element('div#arrow-box');
			arrowsBox.inject(slideBox, 'bottom').adopt(arrowLeft, arrowRight);

			actButtons(sliderPosition, arrowLeft, arrowRight);

			//actions when click
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
			if(vNav) {
				var vertNav = new Element('div#vert-nav').inject(slideBox,'bottom');
				sliderModule.each(function(index,item){
					sliderPagPosition = -(slidersWidth * slidersElements)*index;
					new Element('a.vert-nav-button',{
						'data-position':-(slidersWidth * slidersElements)*index,
						html:index+1,
						href:'#'+(index+1),
						events:{
							click:function(event){
								slider.morph({'left':-(slidersWidth * slidersElements)*index});
								sliderPosition = -(slidersWidth * slidersElements)*index;
								actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor);
								event.stopPropagation();
								event.preventDefault();
							}
						}
					}).inject(vertNav);

				});
				//add current class to first element of verticals navigation
				var vertNavElements = $$('a.vert-nav-button')[0].addClass('current');
			}
		}
		
		function actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor) {
			var vertNavElements = $$('a.vert-nav-button');
			
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
			if(vNav) {
				vertNavElements.each(function(item,index){
					if(item.getProperty('data-position') == sliderPosition){
						item.addClass('current');
					} else {
						item.removeClass('current');
					}
				});
			}
		}
		
		// TODO: add infinite slides
		// TODO: add autoplay
		// TODO: add multiple carousels on one site
	}
});
