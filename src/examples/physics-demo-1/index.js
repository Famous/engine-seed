'use strict';

var Clock = require('famous-core').Clock;

var UIEvents = require('famous-handlers').UIEvents;
var HTMLElement = require('famous-dom-renderables').HTMLElement;
var components = require('famous-components');
var Position = components.Position;
var Rotation = components.Rotation;
var Origin = components.Origin;
var MountPoint = components.MountPoint;
var Size = components.Size;
var Camera = components.Camera;

var math = require('famous-math');
var physics = require('famous-physics');

var PhysicsEngine = physics.PhysicsEngine;

var world = new PhysicsEngine();
// Tell famous how to render objects from the 'bodies' array of instances of PhysicsEngine
PhysicsEngine.publish = 'bodies';
PhysicsEngine.renderWith = WorldView;

// We need an HTMLElement to detect mouse events
// Because we don't specify a size, the world view will expand to fill the size of the window,
// so this is essentially our document and site of global events
function WorldView(dispatch, model) {
    this.el = new HTMLElement(dispatch);
}

// A particle we will use as a physical representation of the mouse
// We won't add this to the world, so it won't be rendered
var mouseghost = new physics.Particle({
    mass: 1e8
});

WorldView.prototype.mousemove = function(e) {
    mouseghost.setPosition(e.clientX, e.clientY, 0)
}

// See below
WorldView.prototype.mouseup = function() {
    world.add(spring, rspring);
    world.remove(p2p);
    p2p = null;
}

WorldView.handlers = [UIEvents([
    {name: 'mousemove', methods: ['preventDefault'], properties: ['clientX', 'clientY']},
    'mouseup'])];

// The world needs to be told to update, so let's do so every frame
WorldView.prototype.tick = function() {
    world.update(Date.now());
}
WorldView.subscribe = {tick : ['*']};

// Tell famous how to render instances of Box
physics.Box.renderWith = BoxView;
var box = new physics.Box({
    size: [300,200,100],
    mass: 10,
    position: new math.Vec3(300,300,0)
});

// A spring which acts on box and pulls it to the box's starting position
var spring = new physics.Spring(null, box, {
    period: 2,
    dampingRatio: 0.4,
    anchor: math.Vec3.clone(box.position)
});

// A torsion spring which acts on box.
// Like Spring, this can take an .anchor option, but when unspecified it will default to
// an orientation representing no rotation, i.e. it will oppose any rotation in the box
var rspring = new physics.RotationalSpring(null, box, {
    period: 2,
    dampingRatio: 0.4
});

// By default, the world has no friction forces, so bodies will just keep moving and/or rotating
// The RotationalDrag force will slow the rotation of its targets
var rdrag = new physics.RotationalDrag(box, {
    strength: 1
});

// Notify the world to keep account for box and rdrag --we'll add the springs later
world.add(box, rdrag);

// How instances of Box will appear
// Instances will be passed in the model parameter, and we'll store a reference at this.box
function BoxView(dispatch, model) {
    this.box = model;
    this.position = new Position(dispatch);
    this.origin = new Origin(dispatch);
    this.mp = new MountPoint(dispatch);
    this.rotation = new Rotation(dispatch);
    this.size = new Size(dispatch);

    this.origin.set(0.5,0.5,0.5);
    this.mp.set(0.5,0.5,0.5);

    var s = model.size;
    this.size.setAbsolute(s[0],s[1],s[2]);

    this.el = new HTMLElement(dispatch);
    this.el.property('background', 'red');
    this.el.property('textAlign', 'center');
    this.el.property('lineHeight', s[1]+'px');
    this.el.property('color', 'white');
    this.el.property('borderRadius', '10px');
    this.el.property('box-shadow', '0px 0px 2px 2px red');
    this.el.content('Upright');
}

// Every frame, lets pull out the position and orientation of the box and sync it with
// the position and rotation components of the view
BoxView.prototype.sync = function() {
    world.getTransform(this.box, this.position, this.rotation);
}

// We'll use a Point2Point constraint to drag the body around
var p2p;
BoxView.prototype.mousedown = function(e) {
    world.remove(spring, rspring);
    p2p = new physics.Point2Point(this.box, mouseghost, {
        anchor: math.Vec3.clone(mouseghost.position)
    });
    world.add(p2p);
}

BoxView.subscribe = {sync: ['*']};
BoxView.handlers= [UIEvents(['mousedown'])];

var famous = new Clock();

famous.publish(world, 'body');
