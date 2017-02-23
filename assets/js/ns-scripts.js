
/*@ 2014 NetSuite Inc.*/
var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

!(function($) {
  $(function(){
		if ($('#links-container').length <= 0)
		  return;
  
		var _div = $('#links-container');
	  var containerOffset =  _div.offset().top;
		
    if (!_div.parents(".main-head-container").length) {
      $(window).bind('scroll', function(){scrollHandler()});
      $(window).load(scrollHandler());
    }
		
		function scrollHandler() {
			
			var menuPosition = ($('.main-head-container').height() > 0) ? $('.main-head').height() : $('.mobileslider-theme-custom').height();
			var stopPosition = menuPosition;
			
			//if cwcookielaw exists
			if ($('.cwcookielaw').length) {
				stopPosition += $('.cwcookielaw').height();
			}
			
			if(containerOffset <= $(window).scrollTop() + menuPosition) {
				_div.css('position', 'fixed');
				_div.css('top', stopPosition);
				_div.next().css('margin-top', _div.height() + 1);
			} else {
				_div.css('position', 'static');
				_div.css('top', '');
				_div.next().css('margin-top', '');
			}
		}
	});
})(jQuery);


!(function($) {
  "use strict";
  
  function nsScroll( element, options ) {
    this.options = $.extend( {}, nsScroll.DEFAULTS, options) ;        
    this.init();
  }
	
  nsScroll.DEFAULTS  = {
    anchor : ".ns-scroll",
    mainContainer : ".main-head-container",
    additOffset : 10,
    mAdditOffset : 90,	
    speed: 1000
  }
	
  nsScroll.prototype.init = function () {
    var _self = this;
	
    $(_self.options.anchor).each(function(){
      $(this).bind('click', function(event) {
        event.preventDefault();
        _self.goToSection(this.href);
      });
    });
  }
  
  nsScroll.prototype.goToSection = function (url) {
    var _self = this;
    var parts = url.split("#");
    var trgt = parts[1];

    var target_offset = $("#"+trgt).offset();
if (target_offset == undefined) {
      return;
    }
    var adjust_offset = ($(_self.options.mainContainer).height() > 0) ? _self.options.additOffset : _self.options.mAdditOffset;
    
    var target_top = target_offset.top - adjust_offset;

    $('html, body').stop().animate({scrollTop:target_top}, _self.options.speed);
  }
  
  $.fn.nsScroll = function ( options ) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('ns.nsScroll');
      if (!data) $this.data('ns.nsScroll', (data = new nsScroll(this, options	)));
    });
  }
})(jQuery);


//Animation

!(function($) {

  //-------------------------------
  // Plugin definition
  //-------------------------------

  $.fn.elementEffect = function(callback, threshold) {
    var $w = $(window), th = threshold || 0, images = this, loaded, inview, source;
    this.one('element.effect', callback);
    function element() {
      inview = images.filter(function() {
        var $e = $(this), wt = $w.scrollTop(), wb = wt + $w.height(), et = $e.offset().top, eb = et + $e.height();
        return eb >= wt - th && et <= wb + th;
      });
      loaded = inview.trigger("element.effect"); images = images.not(loaded);
    }
    $w.scroll(element).resize(element).load(element);
    return this;
  };

  //-------------------------------
  // Defaults can be override
  //-------------------------------

  elementEffectSettings = $.extend({

    transitionDuration: 0.7,             // seconds
    transitionEasing:   "ease-in-out",   // css timing
    dataEffect:         '[data-effect]', // animatable items selector
    threshold:          100              // px of the appearing elements before run animation

  }, (typeof(elementEffectSettings) != 'undefined' ? elementEffectSettings : false));

  //-------------------------------
  // Autorstart on document ready
  //-------------------------------

  $(function() {

    // transition name detection
    $.fn.elementEffect.transition = (function () {
      var el = document.createElement('bs');

      var transEndEventNames = {
        'WebkitTransition' : '-webkit-transition',
        'MozTransition'    : '-moz-transition',
        'OTransition'      : '-o-transition',
        'transition'       : '-transition'
      };

      for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
          return { css: transEndEventNames[name] };
        }
      }
    })();

    // if no transition support, do nothing
    if( ! $.fn.elementEffect.transition)
      return;

    var animSelector = $(elementEffectSettings.dataEffect);

    animSelector
      .each(function() {
        var $this = $(this), effectName = $this.data('effect');
        // add effect class and force reflow
        $this.addClass('effect-' + effectName)[0].offsetWidth;
        $this.css($.fn.elementEffect.transition.css,
                   'all ' +
                          elementEffectSettings.transitionDuration + 's ' +
                          elementEffectSettings.transitionEasing);
      })
      .elementEffect(function() {
          // activate animation
          $(this).addClass('in');

      }, (- elementEffectSettings.threshold) );

  });

})(window.jQuery);