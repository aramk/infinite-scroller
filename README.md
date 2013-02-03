## Demo

...

## How To Use

	var args = $('.container').infiniteScroll();
	$('.direction-button').click(function () {
	    args.direction *= -1;
	});


## Settings API

The `.infiniteScroll()` function takes an object as an argument. These are the default values:

	innerCount: 3, // How many duplicates to create
	direction: -2, // Direction and magnitude of movement
	freq: 50, // Frequency of update in ms
	pause: true // Whether to pause on mouseover
