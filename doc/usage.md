# Usage
Include MooTools library and MoSimpleCarousel Class:
```html
<script src="js/vendor/mootools-core-1.5.0-full-compat-yc.js"></script>
<script src="js/mo-simple-carousel.js"></script>
```

Call class MoSimpleCarousel with parametrs when document is ready:
```html
$(window).addEvent('domready', function() {
	var myCarousel = new MoSimpleCarousel({
		sWidthOpt:160
	});
});
```