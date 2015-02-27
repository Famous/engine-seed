var HTMLElement = require('famous-dom-renderables').HTMLElement;
var Opacity = require('famous-components').Opacity;
var Align = require('famous-components').Align;
var EventHandler = require('famous-handlers').EventHandler;
var UIEvents = require('famous-handlers').UIEvents;

function SignUpView(node, model) {
    this.el = new HTMLElement(node);
    this.opacity = new Opacity(node);
    this.align = new Align(node);
    this.el.addClass('signup');
    this.el.content(
        '<h1>Sign Up!</h1>'
    );

    this.align.set(1, 0, 1);
}

SignUpView.prototype.showSignUp = function() {
    this.align.halt().set(0, 0, 0, {
        duration: 1000,
        curve: 'outCirc'
    });
};

SignUpView.prototype.hideSignUp = function() {
    this.align.halt().set(1, 0, 1, {
        duration: 1000,
        curve: 'outCirc'
    });
};

SignUpView.prototype.click = function() {
    this.hideSignUp();
};

SignUpView.handlers = [
    EventHandler(['showSignUp', 'hideSignUp']),
    UIEvents([{
        name: 'click',
        methods: ['preventDefault'],
        properties: ['']
    }])
];

module.exports = SignUpView;
