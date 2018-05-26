function Component(selector) {
  this.selector = selector;
}

Component.prototype = {
  init: function() {
    console.log("Component: " + this.selector + " initialized");
  },
  getDOMElement: function() {
    return document.querySelector(this.selector);
  },
  render: function() {
    const container = this.getDOMElement();

    this.numbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number.id;
  
        container.appendChild(listElement);
    });
  }
}