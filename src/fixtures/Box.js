'use strict';

var BoxView = require('./BoxView');
var randomColor = require('./randomColor');

function Box(content, color) {
    this.content = content || '';
    this.color = color || randomColor();
}

Box.renderWith = BoxView;

Box.prototype.changeColor = function changeColor(color){
    this.color = color || randomColor();
};

module.exports = Box;
