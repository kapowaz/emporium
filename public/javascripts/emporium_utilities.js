Emporium.Components.Utilities = {};
Emporium.Components.Utilities.buttonWrapper = function buttonWrapper(selector){
  var elements = $(selector);
  elements.each(function(){
    var button = $(this);
    if (button.children('span').length == 0 && button.children('i').length == 0)
    {
      if (this.nodeName == 'BUTTON' || (this.nodeName == 'A' && $(this).hasClass('button')))
      {
        button.wrapInner('<span></span>').append('<i></i>');
        if (button.hasClass('search')) button.children('span').append('<b>\u2192</b>');
        if (button.hasClass('start')) button.children('span').prepend('<b>\u25b6</b>');
        
        button.bind('click.button', function(){ $(this).blur(); });
      }
    }
  });
};

Emporium.Components.Utilities.menuItemWrapper = function menuItemWrapper(selector){
  var elements = $(selector);
  elements.each(function(){
    var item = $(this);
    if (item.attr('data-menu-item-wrapped') == null)
    {
      item.attr('data-menu-item-wrapped', 'true');
      item.prepend('<b>\u25BC</b>');
    }
  });
};