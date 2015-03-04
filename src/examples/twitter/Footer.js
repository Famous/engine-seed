var FooterView = require('./FooterView');

var FooterButton = require('./FooterButton');

function Footer() {
    this.buttons = [
        new FooterButton('ion-ios-home', 'Home', true, this),
        new FooterButton('ion-at', 'Connect', false, this),
        new FooterButton('ion-pound', 'Discover', false, this),
        new FooterButton('ion-person', 'Me', false, this)
    ];
}

Footer.publish = 'buttons';
Footer.renderWith = FooterView;

module.exports = Footer;
