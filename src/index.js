'use strict';

var Compositor = require('famous/renderers/Compositor');
var ThreadManager = require('famous/renderers/ThreadManager');
var Engine = require('famous/engine/Engine');
var Context = require('famous/core/Context');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Famous = require('famous/core/Famous');

// Boilerplate
var compositor = new Compositor();
var engine = new Engine();
var threadManager = new ThreadManager(Famous.getChannel(), compositor, engine);

// App Code
var context = Famous.createContext();
var root = context.addChild();
var el = new DOMElement(root);
el.setProperty('background', 'yellow');
