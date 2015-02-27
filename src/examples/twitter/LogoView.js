var HTMLElement = require('famous-dom-renderables').HTMLElement;
var Opacity = require('famous-components').Opacity;

function LogoView(node, model) {
    this.el = new HTMLElement(node);
    this.opacity = new Opacity(node);
    this.el.property('fontSize', '30px');
    this.el.property('lineHeight', '50px');
    this.el.property('textAlign', 'center');
    this.el.property('color', '#fff');
    this.opacity.set(0.6);
    this.el.content('<i class="icon ion-social-twitter"></i>')
}

module.exports = LogoView;
