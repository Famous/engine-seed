'use strict';

Object.observe = function() {};
Array.observe = function() {};

var Context = require('famous-api').Context;

var UIEvents = require('famous-handlers').UIEvents;
var Gestures = require('famous-handlers').Gestures;
var HTMLElement = require('famous-dom-renderables').HTMLElement;
var components = require('famous-components');
var Position = components.Position;
var Rotation = components.Rotation;
var Origin = components.Origin;
var MountPoint = components.MountPoint;
var Size = components.Size;
var Scale = components.Scale;
var Camera = components.Camera;

var physics = require('famous-physics');
var math = require('famous-math');

var world = new physics.PhysicsEngine();

physics.PhysicsEngine.publish = 'bodies';
physics.PhysicsEngine.renderWith = WorldView;

function WorldView(node, model) {
    this.model = model;
    // this.el = new HTMLElement(node);
}

WorldView.prototype.layout = function(c, p, i) {
    c.setProportions(1,1 / this.model.bodies.length, 0);
    var offset = c.getSize();
    if (p) c.setPosition(offset[0]/2,p.getPosition()[1]+offset[1],0);
    else c.setPosition(offset[0]/2,offset[1]/2,0);
};

WorldView.prototype.step = function() {
    // this.el.content(stringify(this.model))
    var t = Date.now();
    world.update(t);

};

WorldView.subscribe = {layout: ['*'], step: ['*']};

var Box = physics.Box;
Box.renderWith = BoxView;

function BoxView(dispatch, model) {
    this.body = model;

    this.elapsedscale = 0;
    this.scaling = false;

    this.scale = new Scale(dispatch);
    this.rotation = new Rotation(dispatch);
    this.origin = new Origin(dispatch);
    // this.size = new Size(dispatch);
    this.mp = new MountPoint(dispatch);
    this.position = new Position(dispatch);

    this.origin.set(0.5,0.5,0.5);
    this.mp.set(0.5,0.5,0.5);
    // this.size.setAbsolute(200,800,200)

    this.el = new HTMLElement(dispatch);
    this.el.property('textAlign', 'center');
    this.el.property('background', 'black');
    this.el.property('color', 'white');
}

BoxView.prototype.sync = function() {
    world.getTransform(this.body, this.position, this.rotation);
}

BoxView.subscribe = {sync: ['*']}

var i = 0;
BoxView.prototype.tap = function(e) {
    var p = e.position;
    // this.el.content(stringify(e));
    this.el.property('zIndex', ++i + '');
};

var hz = 1000 / world.step;

BoxView.prototype.rotate = function(e) {
    this.el.content(stringify(e));
    var r = this.rotation;
    if (e.status === 'end') this.body.setAngularVelocity(0,0,e.rotationDelta * hz);
    else this.body.setAngularVelocity(0,0,0);
    var halftheta = e.rotationDelta*0.5;
    var q = new math.Quaternion(Math.cos(halftheta),0,0,Math.sin(halftheta));
    this.body.orientation.multiply(q)
    this.el.content(stringify(e));
};

BoxView.prototype.pinch = function(e) {
    if (e.status === 'move') {
        this.elapsedscale += e.scaleDelta;
    } else if (e.status === 'end') {
        this.elapsedscale = 0;
        this.scaling = false;
    }
    this.el.content(stringify(e));
    var r = e.scale;
    if (Math.abs(this.elapsedscale) > 0.55 || this.scaling) {
        this.scaling = true;
        this.scale.set(r,r,r)
    }
};

var r = 117;
var g = 65;
var b = 153;

BoxView.prototype.drag = function(e) {
    if (e.status === 'start') {
        world.remove(this.body.spring);
        if (e.points === 2) world.remove(this.body.rspring);
    }
    else if (e.status === 'end') {
        world.add(this.body.spring, this.body.rspring);
    }
    // this.el.content(stringify(e));
    var d = e.centerDelta;
    var p = this.position;
    var x = p._x.state + d.x;
    var y = p._y.state + d.y;
    var z = p._z.state;
    if (e.points === 1) {
        this.el.property('background', 'rgb('+~~((r+x/10)%255)+','+~~((g+y/10)%255)+','+~~(g)+')')
        // this.body.setVelocity(d.x * hz, d.y * hz, 0);
    }
    else {
        var halftheta = d.x*0.005;
        var q = new math.Quaternion(Math.cos(halftheta),0,Math.sin(halftheta),0);
        // this.body.orientation.multiply(q)
    }
};

function stringify(obj) {
    var result = '';
    if (typeof obj === 'string') return obj;
    for (var key in obj) {
        result += key + ': ' + JSON.stringify(obj[key]) +'<br>';
    }
    return result;
}

BoxView.handlers = [Gestures(['rotate', 'tap', 'pinch', 'drag'])];


function boxes(n) {
    var bodies = [];
    var forces = [];
    while (n--) {
        var b = new Box({
        mass: 1,
        size: [100,100,100]
        });

        bodies.push(b);
        var spring = new physics.Spring(null,b, {period:2.5, dampingRatio:0.3,anchor: new math.Vec3()});
        var rspring = new physics.RotationalSpring(null,b, {period:3.5, dampingRatio:0.3});
        forces.push(spring, rspring);

        b.spring = spring;
        b.rspring = rspring;
    }

    var rdrag = new physics.RotationalDrag(bodies, {strength: 3});
    var drag = new physics.Drag(bodies, {strength: 3});

    world.add(drag, rspring, forces, bodies);
}

boxes(1);

var famous = new Context(world, 'body');
