var EventHandler = require('famous-handlers').EventHandler;

function FooterView(node, model) {
    this.model = model;
}

FooterView.subscribe = {
    layout: ['*']
};

FooterView.prototype.layout = function(current, previous, index) {
    var len = this.model.buttons.length;
    current.setProportions(1 / len, 1);
    if (previous) {
        current.setPosition(previous.getPosition()[0] + previous.getSize()[0], 0, 0);
    }
};

FooterView.prototype.pageChange = function(footerButton){
    this.model.buttons.forEach(function(button) {
        button.active = false;
    });
    footerButton.active = true;
};

FooterView.handlers = [EventHandler(['pageChange'])]


module.exports = FooterView;
