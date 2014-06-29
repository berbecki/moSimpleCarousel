# Usage
- 1. Include MooTools library and MoSimpleCarousel Class:
```html
<script src="js/vendor/mootools-core-1.5.0-full-compat-yc.js"></script>
<script src="js/mo-simple-carousel.js"></script>
```

- 2. Prepare your HTML code structure.
```html
<ul id="slider-list">
	...
	<li><a href="#yourLink"><img src="http://placekitten.com/g/160/160/#yourImage">...</a></li>
	...
</ul>
```

- 3. Call class MoSimpleCarousel with parametrs when document is ready:
```html
<script>
	$(window).addEvent('domready', function() {
		var myCarousel = new MoSimpleCarousel({
			sWidthOpt:160,
			sElementOpt:5,
			vNav:true
		});
	});
</script>
```