var HTMLElement = require('famous-dom-renderables').HTMLElement;
var UIEvents = require('famous-handlers').UIEvents;

function BasicView(node, model) {
    this.el = new HTMLElement(node);
    this.el.property('backgroundColor', 'red').content('scroll on me, or click me!!!');
}

BasicView.prototype.wheel = function(ev) {
    this.el.content('wheel called! obj:' + JSON.stringify(ev));
}

BasicView.prototype.click = function(ev) {
    this.el.content('click called! obj:' + JSON.stringify(ev));
}

BasicView.handlers = [UIEvents([
    {
        name: 'wheel',
        methods: ['preventDefault'],
        properties: ['deltaX', 'deltaY']
    },
    {
        name : 'click'
    }
])];

module.exports = BasicView;
