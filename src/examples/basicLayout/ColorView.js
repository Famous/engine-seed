var HTMLElement = require('famous-dom-renderables').HTMLElement;

function ColorsView(node, model) {
    this.el = new HTMLElement(node);

    this.el.property('backgroundColor', model.color);    
}

module.exports = ColorsView;
