/* ---------------------------------------------- /*
 * Activate Bootstrap Dropdown Hover and Click Navbar
/* ---------------------------------------------- */
jQuery(function($) {
    $('.navbar .dropdown').hover(function() {
        $(this).find('.dropdown-menu').first().stop(true, true).show();
    }, function() {
        $(this).find('.dropdown-menu').first().stop(true, true).hide();
    });
    $('.navbar .dropdown > a').click(function(){
        location.href = this.href;
    });
});


/* ---------------------------------------------- /*
 * Activate Bootstrap tabs on hover
/* ---------------------------------------------- */
(function ($) {
  $(function () {
    $(document).off('click.bs.tab.data-api', '[data-hover="tab"]');
    $(document).on('mouseenter.bs.tab.data-api', '[data-hover="tab"]', function () {
      $(this).tab('show');
    });
  });
})(jQuery);


/* ---------------------------------------------- /*
 * Activate Bootstrap tabs on click in navbar
/* ---------------------------------------------- */
$('.dropdown-content .nav-tabs li a').on("click",function (e) {
          window.location.href = $(this).attr("data-href");
});


/* ---------------------------------------------- /*
 * Activate Bootstrap stickytabs
/* ---------------------------------------------- */
$(function() {
    var options = {
        backToTop: false
    };
    $('.nav-tabs').stickyTabs( options );
});


/* ---------------------------------------------- /*
 * hide carousel controls on first and last items
/* ---------------------------------------------- */
$("#featured-customers-carousel").carousel({interval: false, wrap: false});

var checkitem = function() {
  var $this;
  $this = $("#featured-customers-carousel");
  if ($("#featured-customers-carousel .carousel-inner .item:first").hasClass("active")) {
      $this.children(".left").hide();
      $this.children(".right").show();
  } else if ($("#featured-customers-carousel .carousel-inner .item:last").hasClass("active")) {
      $this.children(".right").hide();
      $this.children(".left").show();
  } else {
      $this.children(".carousel-control").show();
  }
};

checkitem();

$("#featured-customers-carousel").on("slid.bs.carousel", "", checkitem);


/* ---------------------------------------------- /*
 * Activate popup-video
/* ---------------------------------------------- */
  $(document).ready(function(){
    $("a[rel^='prettyPhoto[youtube]']").prettyPhoto();
    $(".popup-video").prettyPhoto({
        default_width: 970,
        default_height: 546});
  });


/* ---------------------------------------------- /*
 * Wheel image responsive
/* ---------------------------------------------- */
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});