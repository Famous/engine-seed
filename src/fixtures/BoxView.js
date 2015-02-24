'use strict';

var HTMLElement = require('famous-dom-renderables').HTMLElement;
var Size = require('famous-components').Size;

function BoxView (node, instance) {
    this.el = new HTMLElement(node);
    this.el.property('backgroundColor', instance.color);
    this.el.content(instance.content);
}

module.exports = BoxView;
