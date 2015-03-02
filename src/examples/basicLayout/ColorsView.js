var Size = require('famous-components').Size;

function ColorsView(node, model) {
    this.size = new Size(node);
    this.childrenComponents = [];
    this.model = model;
}

ColorsView.subscribe = {
    layout: ['*']
};

ColorsView.prototype.layout = function(current, previous, index) {
    current.setProportions(1, 1 / this.model.colors.length, 0);

    if (previous) current.setPosition(0, previous.getPosition()[1] + previous.getSize()[1], 0);
};

module.exports = ColorsView;
