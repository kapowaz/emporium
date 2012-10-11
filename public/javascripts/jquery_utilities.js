$(document).ready(function() {
  
  jQuery.fn.elementSelector = function elementSelector(){
    var element = this;
    var output  = $(this).get(0).nodeName.toLowerCase();
    
    if (element.attr('id')) output += '#' + element.attr('id');
    if (element.attr('class')) output += '.' + element.attr('class').replace(' ', '.');

    return '[' + output + ']';
  };
  
});