'use strict';

var HTMLElement = require('famous-dom-renderables').HTMLElement;
var UIEvents = require('famous-handlers').UIEvents;
var EventEmitter = require('famous-components').EventEmitter;

function FooterButtonView(node, model) {
    this.el = new HTMLElement(node);
    
    this.el.addClass('footer-button');

    this.el.content(
        '<i class="icon ' + model.icon + '"></i>' +
        '<span>' + model.text + '</span>'
    );

    this.model = model;
    this.emitter = new EventEmitter(node);
    this.renderActiveChange();
}

FooterButtonView.prototype.click = function(){
    this.emitter.emit('pageChange', this.model);
};

FooterButtonView.subscribe = {
    renderActiveChange: ['active']
};

FooterButtonView.prototype.renderActiveChange = function(){
    if (this.model.active) {
        this.el.property('background', 'linear-gradient(to bottom, #212121 0%,#0f0f0f 100%)');
        this.el.property('box-shadow', '#000 0px 0px 3px 2px inset');
        this.el.property('color', '#fff');
    }
    else {
        this.el.property('background', 'linear-gradient(to bottom, #000000 0%,#595959 1%,#383838 4%,#101010 98%,#000000 100%)');    
        this.el.property('box-shadow', 'rgba(0,0,0,0.75) 0px -1px 0px');
        this.el.property('color', '#999');
    }
};

FooterButtonView.handlers = [
    UIEvents([{
        name: 'click',
        methods: ['preventDefault'],
        properties: ['']
    }])
];

module.exports = FooterButtonView;
