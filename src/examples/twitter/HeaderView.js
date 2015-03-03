var HTMLElement = require('famous-dom-renderables').HTMLElement;

function HeaderView(node, model) {
    this.el = new HTMLElement(node);
    this.el.property('backgroundColor', '#76c5fb');
    this.el.property('color', '#fff');
    this.el.property('background', 'linear-gradient(to bottom, #76c5fb 0%,#60abe2 1%,#2978b1 99%,#18659d 100%)');
    this.el.property('fontSize', '18px');
    this.el.property('lineHeight', '26px');
    this.el.property('textShadow', 'rgba(0,0,0,0.75) 0px -1px 0px');
}

HeaderView.subscribe = {
    layout: ['*']
};

HeaderView.prototype.layout = function(current, previous, index) {
    switch (index) {
        case 0:
            // Logo
            current.setSize(50, null);
            current.setAlign(0.5, 0.5, 0);
            current.setMountPoint(0.5, 0.5);
            break;
        case 1:
            current.setPosition(10, 0, 0);
            break;
    }
};

module.exports = HeaderView;
