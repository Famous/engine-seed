var HeaderView = require('./HeaderView');
var Logo = require('./Logo');
var SignUpButton = require('./SignUpButton');

function Header() {
    this.items = [new Logo(), new SignUpButton()];
}

Header.publish = 'items';
Header.renderWith = HeaderView;

module.exports = Header;
