(function ($, window, undefined) {
  $.fn.marqueeify = function (options) {
    var settings = $.extend(
      {
        horizontal: true,
        vertical: true,
        speed: 100, // In pixels per second
        container: $(this).parent(),
        bumpEdge: function () {},
      },
      options
    );

    return this.each(function () {
      var containerWidth,
        containerHeight,
        elWidth,
        elHeight,
        move,
        getSizes,
        $el = $(this);

      getSizes = function () {
        containerWidth = settings.container.outerWidth();
        containerHeight = settings.container.outerHeight();
        elWidth = $el.outerWidth();
        elHeight = $el.outerHeight();
      };

      move = {
        right: function () {
          $el.animate(
            { left: containerWidth - elWidth },
            {
              duration: (containerWidth / settings.speed) * 1000,
              queue: false,
              easing: "linear",
              complete: function () {
                settings.bumpEdge();
                move.left();
              },
            }
          );
        },
        left: function () {
          $el.animate(
            { left: 0 },
            {
              duration: (containerWidth / settings.speed) * 1000,
              queue: false,
              easing: "linear",
              complete: function () {
                settings.bumpEdge();
                move.right();
              },
            }
          );
        },
        down: function () {
          $el.animate(
            { top: containerHeight - elHeight },
            {
              duration: (containerHeight / settings.speed) * 1000,
              queue: false,
              easing: "linear",
              complete: function () {
                settings.bumpEdge();
                move.up();
              },
            }
          );
        },
        up: function () {
          $el.animate(
            { top: 0 },
            {
              duration: (containerHeight / settings.speed) * 1000,
              queue: false,
              easing: "linear",
              complete: function () {
                settings.bumpEdge();
                move.down();
              },
            }
          );
        },
      };

      getSizes();

      if (settings.horizontal) {
        move.right();
      }
      if (settings.vertical) {
        move.down();
      }

      // Make that shit responsive!
      $(window).resize(function () {
        getSizes();
      });
    });
  };
})(jQuery, window);

$(document).ready(function () {
  var cur_color = 0;
  var colors = [0, 60, 120, 210, 270];
  var color = colors[cur_color];
  $(".marquee").marqueeify({
    speed: 300,
    bumpEdge: function () {
      if (cur_color == colors.length) {
        cur_color = 0;
      }
      color = colors[cur_color + 1];
      if ($(".marquee").attr("src").includes("dvd")) {
        $(".marquee").css("filter", `brightness(50%) sepia(1) saturate(1000%) hue-rotate(${color}deg)`);
      } else {
        $(".marquee").css("filter", `brightness(50%) sepia(1) hue-rotate(${color}deg)`);
      }
      cur_color = cur_color + 1;
    },
  });
});

function setMarquee(img) {
  var cur_color = 0;
  var colors = [0, 60, 120, 210, 270];
  var color = colors[cur_color];
  $(".marquee").attr("src", img);
  if ($(".marquee").attr("src").includes("dvd")) {
    $(".marquee").css("filter", `brightness(50%) sepia(1) saturate(1000%) hue-rotate(${color}deg)`);
  } else {
    $(".marquee").css("filter", `brightness(50%) sepia(1) hue-rotate(${color}deg)`);
  }
}
