var HTMLElement = require('famous-dom-renderables').HTMLElement;

function BasicView(node, model) {
    this.el = new HTMLElement(node);

    node.onSizeChange(function (e) {
        this.el.property('lineHeight', e.getTopDownSize()[1] + 'px');
    }.bind(this));

    this
        .el
            .property('backgroundColor', model.backgroundColor)
            .property('borderRadius', model.borderRadius + 'px')
            .property('textAlign', 'center')
            .content(model.content);
}

module.exports = BasicView;
