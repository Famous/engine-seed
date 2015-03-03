var HTMLElement = require('famous-dom-renderables').HTMLElement;
var EventEmitter = require('famous-components').EventEmitter;
var UIEvents = require('famous-handlers').UIEvents;

var Size = require('famous-components').Size;

function SignUpButtonView(node, model) {
    this.el = new HTMLElement(node);
    this.el.content('sign up');
    this.size = new Size(node);
    this.size.setAbsolute(100, 50);
    this.el.addClass('signup-button');

    this.emitter = new EventEmitter(node);
}

SignUpButtonView.prototype.click = function() {
    this.emitter.emit('showSignUp');
};

SignUpButtonView.handlers = [
    UIEvents([{
        name: 'click',
        methods: ['preventDefault'],
        properties: ['']
    }])
];

module.exports = SignUpButtonView;
