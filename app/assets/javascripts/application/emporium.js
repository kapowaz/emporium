$(document).ready(function() {

  // browser engine-specific flags
  if ($.browser.mozilla) $('body').addClass('mozilla');
  if ($.browser.webkit) $('body').addClass('webkit');
  if ($.browser.ie) $('body').addClass('ie');
  
  // augment buttons and button-like links
  Emporium.Components.Utilities.buttonWrapper('input[type=submit], button, a.button');
  // Emporium.Components.Utilities.menuItemWrapper('nav#navigation ul li a'); // disabled as the <b> element for the dropdown arrow interferes with event capture
  
  // start main page carousel
  mainCarousel = new Emporium.Components.mainCarousel('div#main_carousel', {duration: 750});

  // initiate all navigation menus
  menuController = new Emporium.Components.menuController('nav#navigation ul');
  
});