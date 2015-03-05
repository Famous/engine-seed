'use strict';

var AppView = require('./AppView');
var Header = require('./Header');
var Footer = require('./Footer');
var SignUp = require('./SignUp');

function App () {
    this.views = [new Header(), new Footer(), new SignUp()];
}

App.renderWith = AppView;
App.publish = 'views';

module.exports = App;
