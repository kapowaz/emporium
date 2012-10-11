Emporium.Components.mainCarousel = function(mainCarouselElement, options){
  var carousel = this;
  
  carousel.options = jQuery.extend({
    auto: true,
    loop: true,
    direction: 'forward',
    delay: 4000,
    duration: 500
  }, options);
  
  carousel.element    = $(mainCarouselElement);
  carousel.links      = $('ul.carousel.navigation li', carousel.element);
  carousel.slides     = $('ul.carousel.slides li', carousel.element);
  carousel.pagination = { prev: $('div.carousel.pagination a.prev', carousel.element), next: $('div.carousel.pagination a.next', carousel.element)};
  carousel.current    = { slide: null, link: null, index: null };
  carousel.timer      = null;
  carousel.paused     = false;
  
  carousel.initialize();
};

Emporium.Components.mainCarousel.prototype = {
  initialize: function(){
    var carousel = this;

    // debug events — uncomment to see how events are triggered on the carousel from anywhere
    if (window.console && console.log) {
      $(document).bind('emporium.components.carousel.pause', function(){ console.log('emporium.components.carousel.pause'); });
      $(document).bind('emporium.components.carousel.resume', function(){ console.log('emporium.components.carousel.resume'); });
      $(document).bind('emporium.components.carousel.play', function(){ console.log('emporium.components.carousel.play'); });
      $(document).bind('emporium.components.carousel.stop', function(){ console.log('emporium.components.carousel.stop'); });
      $(document).bind('emporium.components.carousel.jump', function(e, slide){ console.log('emporium.components.carousel.jump [' + slide.index + ']'); });
      $(document).bind('emporium.components.carousel.next', function(){ console.log('emporium.components.carousel.next'); });
      $(document).bind('emporium.components.carousel.prev', function(){ console.log('emporium.components.carousel.prev'); });
    }

    // general purpose event bindings allow triggering behaviours arbitrarily
    $(document).bind('emporium.components.carousel.pause', function(){ carousel.pause(); });
    $(document).bind('emporium.components.carousel.resume', function(){ carousel.resume(); });
    $(document).bind('emporium.components.carousel.play', function(){ carousel.play(); });
    $(document).bind('emporium.components.carousel.stop', function(){ carousel.stop(); });
    $(document).bind('emporium.components.carousel.jump', function(e, slide){ carousel.jump(slide.index); });
    $(document).bind('emporium.components.carousel.next', function(){ carousel.showNextSlide(); });
    $(document).bind('emporium.components.carousel.prev', function(){ carousel.showPrevSlide(); });

    // specific event bindings
    carousel.slides.bind('mouseover', function(){ $(document).trigger('emporium.components.carousel.pause'); });
    carousel.slides.bind('mouseout', function(){ $(document).trigger('emporium.components.carousel.resume'); });
    carousel.links.find('a').bind('mouseout', function(){ $(document).trigger('emporium.components.carousel.resume'); });
    carousel.links.find('a').bind('mouseover', function(e){
      $(document).trigger('emporium.components.carousel.jump', {index: $(e.target).parent('li').index()});
    });
    carousel.pagination.prev.bind('click', function(e){ e.preventDefault(); $(document).trigger('emporium.components.carousel.prev'); });
    carousel.pagination.next.bind('click', function(e){ e.preventDefault(); $(document).trigger('emporium.components.carousel.next'); });
    
    // determine the initially visible slide
    carousel.current = {
      link:  carousel.options.direction == 'forward' ? carousel.links.first() : carousel.links.last(),
      slide: carousel.options.direction == 'forward' ? carousel.slides.first() : carousel.slides.last(),
      index: carousel.options.direction == 'forward' ? 0 : carousel.slides.length - 1
    };

    if (carousel.options.auto) carousel.start(true);
  },
  
  lastSlide: function(){
    var carousel = this;
    return carousel.current.slide[0] == (carousel.slides.last())[0] ? true : false;
  },
  
  firstSlide: function(){
    var carousel = this;
    return carousel.current.slide[0] == (carousel.slides.first())[0] ? true : false;
  },
  
  nextLink: function(){
    var carousel = this;
    return carousel.lastSlide() ? carousel.links.first() : carousel.current.link.next();
  },
  
  nextSlide: function(){
    var carousel = this;
    return carousel.lastSlide() ? carousel.slides.first() : carousel.current.slide.next();
  },
  
  nextIndex: function(){
    var carousel = this;
    return carousel.lastSlide() ? 0 : carousel.current.index + 1;
  },
  
  prevLink: function(){
    var carousel = this;
    return carousel.firstSlide() ? carousel.links.last() : carousel.current.link.prev();
  },
  
  prevSlide: function(){
    var carousel = this;
    return carousel.firstSlide() ? carousel.slides.last() : carousel.current.slide.prev();
  },
  
  prevIndex: function(){
    var carousel = this;
    return carousel.firstSlide() ? carousel.slides.length - 1 : carousel.current.index - 1;
  },
  
  showSlide: function(item){
    var carousel = this;

    carousel.current.link.removeClass('selected');
    carousel.current.slide.fadeOut(carousel.options.duration);
    carousel.current = item;
    
    item.link.addClass('selected');
    item.slide.fadeIn(carousel.options.duration);
  },
  
  showNextSlide: function(){
    var carousel = this;
    
    clearTimeout(carousel.timer);
    carousel.showSlide({
      link: carousel.nextLink(),
      slide: carousel.nextSlide(),
      index: carousel.nextIndex()
    });
  },
  
  showPrevSlide: function(){
    var carousel = this;
    
    clearTimeout(carousel.timer);
    carousel.showSlide({
      link: carousel.prevLink(),
      slide: carousel.prevSlide(),
      index: carousel.prevIndex()
    });
  },
  
  jump: function(index){    
    var carousel = this;
    
    if (carousel.current.index != index) {
      carousel.showSlide({
        slide: $(carousel.slides[index]),
        link: $(carousel.links[index]),
        index: index
      });
      carousel.pause(); 
    }
  },
  
  start: function(init){
    var carousel   = this;
    
    if (init) {
      carousel.current.link.addClass('selected');
      carousel.current.slide.show();
    }
    
    carousel.timer = setTimeout(function(){
      if (carousel.lastSlide() && carousel.options.loop == false) {
        carousel.stop();
      } else {
        switch (carousel.options.direction) {
          case 'forward':
            $(document).trigger('emporium.components.carousel.next');
            break;
          case 'reverse':
            $(document).trigger('emporium.components.carousel.prev');
            break;
        }
        carousel.start();
      }
    }, carousel.options.delay);
  },
  
  stop: function(){
    var carousel    = this;
    carousel.options.auto   = false;
    carousel.paused = false;
    clearTimeout(carousel.timer);
  },
  
  play: function(){
    var carousel    = this;
    carousel.options.auto   = true;
    carousel.paused = false;
    carousel.start();
  },
  
  pause: function(){
    var carousel = this;
    
    if (carousel.options.auto && !carousel.paused) {
      clearTimeout(carousel.timer);
      carousel.paused = true;
    }
  },
  
  resume: function(){
    var carousel = this;
    
    if (carousel.options.auto && carousel.paused) {
      carousel.paused = false;
      carousel.start();
    }
  }
  
};