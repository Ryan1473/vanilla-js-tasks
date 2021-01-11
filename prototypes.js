  Element.prototype.appendBefore = function(element) {
    element.parentNode.insertBefore(this, element);
  }, false;

  Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
  }, false;