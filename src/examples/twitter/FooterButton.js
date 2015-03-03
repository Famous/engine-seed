var FooterButtonView = require('./FooterButtonView');

function FooterButton(icon, text, active) {
    this.icon = icon;
    this.text = text;
    this.active = active;
}

FooterButton.renderWith = FooterButtonView;

module.exports = FooterButton;
