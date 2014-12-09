'use strict';
var MoSimpleCarousel = new Class({
    Implements: [Events, Options],
    options: {
        sWidthOpt: 160,                  // define one slider width
        sHeightOpt: 160,                 // define carousel height
        sElementOpt: 5,                  // define carousels visible elements
        sOpt: 'slider-list',             // define carousel
        ssOpt: 'li',                     // define carousel name list
        vNav: false,                     // enable or disable vertical navigation
        autoPlay: true,                  // enable autoplay
        autoPlayInterval: 3000,          // set autoplay interval
        responsivity: true               // enable responsivity
    },
    initialize: function (options) {
        this.setOptions(options);
        this.slide();
    },
    slide: function () {
        var that = this;
        var slidersWidth = this.options.sWidthOpt,
            sliderHeight = this.options.sHeightOpt,
            slidersElements = this.options.sElementOpt,
            slider = $(this.options.sOpt),
            sliders = slider.getElements(this.options.ssOpt),
            sliderWidth = sliders.length * slidersWidth,
            sliderModule = (sliders.length / slidersElements).toInt(),
            rotate,
            sliderWrapper,
            slideBox,
            arrowsBox,
            arrowLeft,
            arrowRight,
            sliderPosition,
            sliderPagPosition,
            vertNavElements,
            vNav = this.options.vNav,
            autoPlay = this.options.autoPlay,
            autoPlayInterval = this.options.autoPlayInterval,
            responsivity = this.options.responsivity;

        sliderWrapper = new Element('div#slider-wrapper').wraps(slider);
        slideBox = new Element('div#slider-box').setStyles({
            'position': 'relative'
        }).wraps(sliderWrapper);

        if(responsivity) {
            that.updateSliderHeight(slideBox);
            window.addEvent('resize', function(){
                that.updateSliderHeight(slideBox);
            });
        }

        if (sliders.length % slidersElements != 0) {
            sliderModule = sliderModule + 1;
        }
        var sliderModulor = (sliderModule - 1) * slidersElements * slidersWidth;
        slider.set('morph', {duration: 'normal', transition: 'cubic:in'});
        slider.getParent().setStyles({'overflow': 'hidden','height' : sliderHeight, 'position': 'relative'});
        slider.setStyles({'height' : sliderHeight, 'width': sliderWidth, 'position': 'absolute'});
        sliderPosition = 0;
        sliderPagPosition = 0;

        if (responsivity) {
            var sliderWrapperAutoSize = slideBox.getSize().x;
            slidersWidth = sliderWrapperAutoSize / slidersElements;
            sliderHeight = slideBox.getSize().y;
            sliders.setStyle('width', slidersWidth);
            slideBox.setStyle('height', sliderHeight);
            slider.setStyle('height', sliderHeight);
            sliderModulor = (sliderModule - 1) * slidersElements * slidersWidth;

            var timeOutResp;
            window.clearTimeout(timeOutResp);

            window.addEvent('resize', function () {
                timeOutResp = window.setTimeout (function() {
                    sliderWrapperAutoSize = slideBox.getSize().x;
                    slidersWidth = sliderWrapperAutoSize / slidersElements;
                    sliders.setStyle('width', slidersWidth);
                    sliderPosition = 0;
                    slider.morph({'left': sliderPosition});
                    arrowLeft.setStyles({'opacity': '0.3', 'cursor': 'default'}).removeClass('active');
                    arrowRight.setStyles({'opacity': 1, 'cursor': 'pointer'}).addClass('active');
                    sliderModulor = (sliderModule - 1) * slidersElements * slidersWidth;
                    if (vNav) {
                        vertNavElements = $$('a.vert-nav-button').removeClass('current');
                        vertNavElements = $$('a.vert-nav-button')[0].addClass('current');
                        $$('.vert-nav-button').each(function (item, index) {
                            item.setProperty('data-position', -(slidersWidth * slidersElements) * index);
                        });
                    }
                }, 300);
            });
        }

        if (sliders.length > slidersElements) {
            arrowLeft = new Element('a#arr-l', {html: '&laquo;'}).setStyles({
                'display': 'block',
                'width': 30,
                'height': 30,
                'position': 'absolute',
                'left': 0,
                'text-align': 'center',
                'top': sliderHeight / 2 - 15,
                'cursor': 'pointer',
                'color': '#fff',
                'background': 'rgba(0,0,0,.6)',
                'line-height': 30
            });
            arrowRight = new Element('a#arr-r', {html: '&raquo;'}).setStyles({
                'display': 'block',
                'width': 30,
                'height': 30,
                'position': 'absolute',
                'right': 0,
                'text-align': 'center',
                'top': sliderHeight / 2 - 15,
                'cursor': 'pointer',
                'color': '#fff',
                'background': 'rgba(0,0,0,.6)',
                'line-height': 30
            });
            arrowsBox = new Element('div#arrow-box');
            arrowsBox.inject(slideBox, 'bottom').adopt(arrowLeft, arrowRight);

            actButtons(sliderPosition, arrowLeft, arrowRight);

            //actions when click
            arrowLeft.addEvent('click', function (event) {
                if (sliderPosition < 0) {
                    sliderPosition = sliderPosition + slidersWidth * slidersElements;
                    slider.morph({'left': sliderPosition});
                    actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor);
                }
            });
            arrowRight.addEvent('click', function (event) {
                if (sliderPosition > -sliderModulor) {
                    sliderPosition = sliderPosition + -slidersWidth * slidersElements;
                    slider.morph({'left': sliderPosition});
                    actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor);
                }
            });
            this.updatePositions([arrowLeft, arrowRight]);
            if(responsivity) {
                window.addEvent('resize', function(){
                    that.updatePositions([arrowLeft, arrowRight]);
                });
            }
            if (vNav) {
                var vertNav = new Element('div#vert-nav').inject(slideBox, 'bottom');
                sliderModule.each(function (index, item) {
                    sliderPagPosition = -(slidersWidth * slidersElements) * index;
                    new Element('a.vert-nav-button', {
                        'data-position': -(slidersWidth * slidersElements) * index,
                        html: index + 1,
                        href: '#' + (index + 1),
                        events: {
                            click: function (event) {
                                slider.morph({'left': -(slidersWidth * slidersElements) * index});
                                sliderPosition = -(slidersWidth * slidersElements) * index;
                                actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor);
                                event.stopPropagation();
                                event.preventDefault();
                            }
                        }
                    }).inject(vertNav);

                });
                //add current class to first element of verticals navigation
                vertNavElements = $$('a.vert-nav-button')[0].addClass('current');
            }
            //autoplay if autoplay enebled
            if (autoPlay) {

                rotateSlider();
                slideBox.addEvent('mouseover', function (event) {
                    clearInterval(rotate);
                    event.stopPropagation();
                });
                slideBox.addEvent('mouseout', function (event) {
                    rotateSlider();
                    event.stopPropagation();

                });
            }
        }

        function rotateSlider() {
            rotate = setInterval(function () {
                if (sliderPosition > -sliderModulor) {
                    sliderPosition = sliderPosition + -slidersWidth * slidersElements;
                    slider.morph({'left': sliderPosition});
                    actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor);
                } else {
                    sliderPosition = 0;
                    slider.morph({'left': sliderPosition});
                    actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor);
                }
            }, autoPlayInterval);
        }

        function actButtons(sliderPosition, arrowLeft, arrowRight, sliderModulor) {
            var vertNavElements = $$('a.vert-nav-button');

            if (sliderPosition == 0) {
                arrowLeft.setStyles({'opacity': '0.3', 'cursor': 'default'}).removeClass('active');
                arrowRight.setStyles({'opacity': 1, 'cursor': 'pointer'}).addClass('active');
            } else if (sliderPosition == -sliderModulor) {
                arrowRight.setStyles({'opacity': '0.3', 'cursor': 'default'}).removeClass('active');
                arrowLeft.setStyles({'opacity': 1, 'cursor': 'pointer'}).addClass('active');
            } else {
                arrowRight.setStyles({'opacity': 1, 'cursor': 'pointer'}).addClass('active');
                arrowLeft.setStyles({'opacity': 1, 'cursor': 'pointer'}).addClass('active');
            }
            if (vNav) {
                vertNavElements.each(function (item, index) {
                    if (item.getProperty('data-position') == sliderPosition) {
                        item.addClass('current');
                    } else {
                        item.removeClass('current');
                    }
                });
            }
        }

        // TODO: add infinite slides
        // TODO: add multiple carousels on one site
    },

    getImgHeight: function() {
        var sliderHeight = $('slider-list').getChildren()[0].getChildren()[0].getHeight();
        return sliderHeight;
    },

    updatePositions: function(tableElements) {
        var that = this;
        var timeOutImg, sliderHeight;
        window.clearTimeout(timeOutImg);
        timeOutImg = window.setTimeout (function() {
            sliderHeight = that.getImgHeight();
            tableElements.each(function(element) {
                element.setStyles( {'position' : 'absolute', 'top': sliderHeight / 2 - 15} );
            });
        }, 330);
    },

    updateSliderHeight: function(slider) {
        var that = this;
        var timeOutImg, sliderHeight;
        window.clearTimeout(timeOutImg);
        timeOutImg = window.setTimeout (function() {
            sliderHeight = that.getImgHeight();
            slider.set('morph', {duration: 100, transition: Fx.Transitions.Sine.easeOut});
            slider.morph( { 'height': sliderHeight } );
        }, 330);
    }

});
