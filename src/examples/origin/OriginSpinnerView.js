'use strict';

var Origin = require('famous-components').Origin;
var Rotation = require('famous-components').Rotation;
var Align = require('famous-components').Align;
var Size = require('famous-components').Size;

function OriginSpinnerView(node, instance) {
    this.origin = new Origin(node);
    this.rotation = new Rotation(node);
    this.align = new Align(node);
    this.size = new Size(node);
    this.size.setAbsolute(100, 100, 100);
    this.origin.set(instance.x, instance.y, 0, {duration: 1000});
    this.align.set(instance.x, instance.y, 0);
}

OriginSpinnerView.subscribe = {
    spin: ['*']
};

OriginSpinnerView.prototype.spin = function() {
    this.rotation.setZ(Date.now() * 0.002);
};

module.exports = OriginSpinnerView;
