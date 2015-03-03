var HTMLElement = require('famous-dom-renderables').HTMLElement;

function AppView(node, model) {
    this.node = node;
    this.model = model;

    this.el = new HTMLElement(node);
    this.el.property('background', 'url(http://demo.famo.us/tweetus/content/mback_small.png)');
    this.el.property('backgroundSize', 'cover');
}

AppView.subscribe = {
    layout: ['*']
};

AppView.prototype.layout = function(current, previous, index) {
    current.setProportions(1, null);
    switch (index) {
        case 0:
            current.setSize(null, 50);
            break;
        case 1:
            current.setAlign(0, 1, 0);
            current.setMountPoint(0, 1, 0);
            current.setSize(null, 50);
            break;
        case 2:
            // current.setScale(0.0, 0, 0);
            // current.setSize(null, null);
            break;
    }
};

module.exports = AppView;
