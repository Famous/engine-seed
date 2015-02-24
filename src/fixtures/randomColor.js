'use strict';

function randomColor() {
    return 'rgb(' + ((Math.random() * 256)|0) + ', ' + ((Math.random() * 256)|0) + ', ' + ((Math.random() * 256)|0) + ')';
}

module.exports = randomColor;
