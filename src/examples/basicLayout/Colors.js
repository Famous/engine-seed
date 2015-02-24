var ColorsView = require('./ColorsView');
var Color = require('./Color');

function Colors(options) {
    this.colors = (options && options.colors) || [new Color('red'), new Color('blue'), new Color('green'), new Color('yellow'), new Color('orange'), new Color('pink')];
}

Colors.publish = 'colors';
Colors.renderWith = ColorsView;

module.exports = Colors;
