'use strict';
var Compositor = require('famous-renderers').Compositor;
var ThreadManager = require('famous-renderers').ThreadManager;
var Engine = require('famous-engine');
require('famous-stylesheets');

// Use Worker thread
// var worker = new Worker('worker.bundle.js');

// Use Main thread
var worker = require('./worker.js');

var compositor = new Compositor();

var threadmanger = new ThreadManager(worker, compositor);
var engine = new Engine();
engine.update(threadmanger);
