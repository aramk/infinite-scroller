/*
jQuery Infinite Scroller

Copyright (c) 2013 Aram Kocharyan

Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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
