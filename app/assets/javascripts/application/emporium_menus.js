Emporium.Components.menuController = function(navigationList, options){
  var controller = this;
  
  controller.options = jQuery.extend({
  }, options);
  
  controller.element     = $(navigationList);
  controller.navitems    = controller.element.find('li');
  controller.menus       = [];
  controller.menuvisible = false;

  controller.initialize();
};

Emporium.Components.menuController.prototype = {
  initialize: function(){
    var controller = this;
    
    // create menu bindings & behaviour for all those with a menu
    jQuery.each(controller.navitems, function(i, navitem){
      navitem = $(navitem);
      navitem.bind('mouseover', function(e){ $(document).trigger('emporium.components.menucontroller.vanish', {event: e}); });
      if (navitem.attr('data-menu')) {
        var menu = new Emporium.Components.menu(navitem);
        controller.menus.push(menu);
      }
    });

    // debug events — uncomment to see how events are triggered on the menu controller from anywhere
    if (window.console && console.log) {
      $(document).bind('emporium.components.menucontroller.vanish', function(){ console.log('emporium.components.menucontroller.vanish'); });
      $(document).bind('emporium.components.menucontroller.visibility', function(e, params){ 
        console.log('emporium.components.menucontroller.visibility: [' + params.visibility + ']');
      });
    }
    
    $(document).bind('emporium.components.menucontroller.vanish', function(e, params){ controller.vanish(params); });
    $(document).bind('emporium.components.menucontroller.visibility', function(e, params){ controller.menuVisibility(params); });
  },
  
  vanish: function(params){
    var controller = this;
    jQuery.each(controller.menus, function(i, menu){
      if (menu.navitem.find('a')[0] != params.event.target) menu.element.trigger('emporium.components.menu.vanish', {event: params.event});
    });
    return false;
  },
  
  menuVisibility: function(params){
    var controller = this;
    if (params && params.visibility) controller.menuvisible = params.visibility;
    return false;
  }
};

Emporium.Components.menu = function(navigationItem, options){
  var menu = this;
  
  menu.options = jQuery.extend({
    delay:    1000,
    duration: 200
  }, options);
  
  menu.navitem = $(navigationItem);  
  menu.element = $('*[data-menu-name=' + menu.navitem.attr('data-menu') + ']');
  menu.timer   = null;
  menu.state   = 'hidden';
  
  menu.initialize();
};

Emporium.Components.menu.prototype = {
  initialize: function(){
    var menu = this;

    // debug events — uncomment to see how events are triggered on menus from anywhere
    if (window.console && console.log) {
      menu.element.bind('emporium.components.menu.show', function(){ console.log('emporium.components.menu.show'); });
      menu.element.bind('emporium.components.menu.hide', function(){ console.log('emporium.components.menu.hide'); });
      menu.element.bind('emporium.components.menu.vanish', function(){ console.log('emporium.components.menu.vanish'); });
      menu.element.bind('emporium.components.menu.pin', function(){ console.log('emporium.components.menu.pin'); });
      menu.element.bind('emporium.components.menu.unpin', function(){ console.log('emporium.components.menu.unpin'); });  
    }
    
    menu.element.bind('emporium.components.menu.show', function(e, params){ menu.show(params); });
    menu.element.bind('emporium.components.menu.hide', function(e, params){ menu.hide(params); });
    menu.element.bind('emporium.components.menu.vanish', function(e, params){ menu.vanish(params); });
    menu.element.bind('emporium.components.menu.pin', function(e, params){ menu.pin(params); });
    menu.element.bind('emporium.components.menu.unpin', function(e, params){ menu.unpin(params); });

    menu.element.bind('mouseover', function(e){ menu.element.trigger('emporium.components.menu.pin', {event: e}); });
    menu.element.bind('mouseout', function(e){ menu.element.trigger('emporium.components.menu.unpin', {event: e}); });
    menu.navitem.bind('mouseover', function(e){ menu.element.trigger('emporium.components.menu.show', {event: e}); });
    menu.navitem.bind('mouseout', function(e){ menu.element.trigger('emporium.components.menu.hide', {event: e}); });
    
    menu.element.hide();
  },
  
  show: function(params){
    var menu = this;
    
    params.event.stopPropagation();
    
    if (menu.state == 'visible') {
      clearTimeout(menu.timer);
    } else {
      menu.navitem.find('a').addClass('open');
      menu.state = 'showing';
      menu.element.fadeIn(menu.options.duration, function(){
        $(document).trigger('emporium.components.carousel.pause');
        $(document).trigger('emporium.components.menucontroller.visibility', {event: params.event, visibility: true});
        menu.state = 'visible';
      }); 
    }
    return false;
  },
  
  hide: function(params){
    var menu = this;
    
    params.event.stopPropagation();
    
    menu.timer = setTimeout(function(){
      menu.state = 'hiding';
      menu.element.fadeOut(menu.options.duration, function(){
        $(document).trigger('emporium.components.carousel.resume');
        $(document).trigger('emporium.components.menucontroller.visibility', {event: params.event, visibility: false});
        menu.navitem.find('a').removeClass('open');
        menu.state = 'hidden';
      });
    }, menu.options.delay);
    return false;
  },
  
  // like hide, only without any effects, so immediate
  vanish: function(params){
    var menu = this;
    
    menu.navitem.find('a').removeClass('open');
    menu.element.hide();
    menu.state = 'hidden';
    $(document).trigger('emporium.components.carousel.resume');
    $(document).trigger('emporium.components.menucontroller.visibility', {event: params.event, visibility: false});
  },
  
  pin: function(params){
    var menu = this;
    params.event.stopPropagation();
    
    menu.state = 'pinned';
    clearTimeout(menu.timer);
    return false;
  },
  
  unpin: function(params){
    var menu = this;
    params.event.stopPropagation();
    
    menu.hide(params);
    return false;
  }
  
};