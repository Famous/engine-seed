'use strict';

var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');

// Boilerplate
FamousEngine.init();

// App Code
var scene = FamousEngine.createScene();
var root = scene.addChild();
var el = new DOMElement(root);
el.setProperty('background', 'yellow');
