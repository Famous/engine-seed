var ColorView = require('./ColorView');

function Color(color) {
    this.color = color;
}

Color.renderWith = ColorView;

module.exports = Color;
