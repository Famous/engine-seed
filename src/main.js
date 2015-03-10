'use strict';
var Compositor = require('famous-renderers').Compositor;
var ThreadManager = require('famous-renderers').ThreadManager;
var Engine = require('famous-engine');
require('famous-stylesheets');
var Famous = require('famous-core').Famous;

var compositor = new Compositor();

// Use Worker thread
// var worker = new Worker('worker.bundle.js');
// var threadmanger = new ThreadManager(worker, compositor);

// Use Main thread (doesn't work with famous-api)
require('./worker')
var threadmanger = new ThreadManager(Famous, compositor);


var engine = new Engine();
engine.update(threadmanger);
