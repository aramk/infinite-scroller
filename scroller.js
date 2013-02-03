(function ($) {

    $.fn.infiniteScroll = function(args) {
        var elem = $(this);
        args = $.extend({
            innerCount: 3, // How many duplicates to create
            direction: -2, // Direction and magnitude of movement
            freq: 50, // Frequency of update in ms
            pause: true // Whether to pause on mouseover
        }, args);

        args.origDirection = args.direction;

        $(elem).addClass('scroll');
        var contents = $(elem).find('> *').clone(true);
        var wrapper = $('<div class="scroll-inner-wrapper"></div>');
        var origInner = $('<div class="scroll-inner-content"></div>');
        var inners = [];
        var innerWidth = 0;
        $(elem).empty();
        $(elem).append(wrapper);
        for (var i = 0; i < args.innerCount; i++) {
            var inner = origInner.clone();
            inner.append(contents.clone(true));
            inner.attr('data-i', i);
            inners.push(inner);
            wrapper.append(inner);
            innerWidth = inner.width();
            inner.css('left', innerWidth * i);
        }
        wrapper.width(innerWidth * (args.innerCount + 1));

        var timer = setInterval(function () {
            var oldLeft = wrapper.position().left;
            var newLeft = oldLeft + args.direction;
            if (newLeft < -innerWidth) {
                wrapper.css('left', 0);
            } else if (newLeft > 0) {
                wrapper.css('left', -innerWidth);
            } else {
                wrapper.css('left', newLeft);
            }
        }, args.freq);

        if (args.pause) {
            $(elem).hover(function () {
                args.direction = 0;
            }, function () {
                args.direction = args.origDirection;
            });
        }

        return args;
    }

})(jQuery);
