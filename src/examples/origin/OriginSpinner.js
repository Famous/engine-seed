'use strict';

var OriginSpinnerView = require('./OriginSpinnerView');

function OriginSpinner(subview, x, y) {
        this.subview = subview;
        this.x = x;
        this.y = y;
}

OriginSpinner.renderWith = OriginSpinnerView;
OriginSpinner.publish = 'subview';

module.exports = OriginSpinner;
