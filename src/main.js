'use strict';

var FamousPlatform = require('famous');
var Compositor = FamousPlatform.renderers.Compositor;
var ThreadManager = FamousPlatform.renderers.ThreadManager;
var Engine = FamousPlatform.engine;
var Context = FamousPlatform.core.Context;
var HTMLElement = FamousPlatform.domRenderables.HTMLElement;
var Famous = FamousPlatform.core.Famous;
FamousPlatform.stylesheets;

// Boilerplate
var compositor = new Compositor();
var threadmanger = new ThreadManager(Famous, compositor);
var engine = new Engine();
engine.update(threadmanger);

// App Code
var context = new Context();
var root = context.addChild();
var el = new HTMLElement(root.getDispatch());
el.property('background', 'yellow');
