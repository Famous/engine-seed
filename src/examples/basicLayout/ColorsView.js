var Size = require('famous-components').Size;
var Position = require('famous-components').Position;

function ColorsView(node, model) {
    this.size = new Size(node);
    this.childrenComponents = [];
    this.model = model;

    for (var i = 0; i < model.colors.length; i++) this.childrenComponents.push();
}

ColorsView.subscribe = {
    layout: ['*']
};

ColorsView.prototype.layout = function(current, previous, index) {
    current.setProportions(1, 1 / this.model.colors.length, 0);

    if (previous) current.setPosition(0, previous.getPosition()[1] + previous.getSize()[1], 0);
};

module.exports = ColorsView;
