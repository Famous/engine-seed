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
    var sqrt = Math.sqrt(this.model.bodies.length);
    var p = 1 / sqrt;
    c.setProportions(p, p, 0);
    var offset = c.getSize();
    if (i) {
        c.setPosition((i%sqrt)*offset[0],~~(i/sqrt)*offset[1],0);
    }
};

WorldView.prototype.step = function() {
    // this.el.content(stringify(this.model))
    var t = Date.now();
    world.update(t);

};

WorldView.subscribe = {layout: ['*'], step: ['*']};

var Box = physics.Box;
Box.renderWith = BoxView;

var j = 0;
function BoxView(dispatch, model) {
    this.body = model;
    this.j = ++j;

    this.elapsedscale = 0;
    this.scaling = false;

    this.spinning = false;

    this.scale = new Scale(dispatch);
    this.rotation = new Rotation(dispatch);
    this.origin = new Origin(dispatch);
    this.position = new Position(dispatch);

    this.origin.set(0.5,0.5,0.5);

    this.el = new HTMLElement(dispatch);
    this.el.property('textAlign', 'center');
    // this.el.property('lineHeight', '200px');
    this.el.property('background', 'black');
    this.el.property('color', 'white');
    this.el.property('zIndex', j + '');
    this.el.content(j + '');
}

var r = ~~(256*Math.random());
var g = ~~(256*Math.random());
var b = ~~(256*Math.random());

BoxView.prototype.sync = function() {
    // if (!this.spinning)
        world.getTransform(this.body, this.position, this.rotation);
    // else world.getTransform(this.body, this.position, null);
    var p = this.position;
    var x = p._x.state;
    var y = p._y.state;
    this.el.property('background', 'rgb('+~~((r*this.j+x/10)%255)+','+~~((g*this.j+y/10)%255)+','+~~(b*this.j)+')');
}

BoxView.subscribe = {sync: ['*']}

BoxView.prototype.tap = function(e) {
    var p = e.position;
    // this.el.content(stringify(e));
    this.el.property('zIndex', ++j + '');
};

var hz = 1000 / world.step;

BoxView.prototype.pinch = function(e) {
    // this.el.content(stringify(e));
    var r = this.rotation;
    if (e.status === 'end') this.body.setAngularVelocity(0,0,e.rotationDelta * hz);
    else this.body.setAngularVelocity(0,0,0);
    var halftheta = e.rotationDelta*0.5;
    var q = new math.Quaternion(Math.cos(halftheta),0,0,Math.sin(halftheta));
    this.body.orientation.multiply(q);
};

BoxView.prototype.rotate = function(e) {
    // this.el.content(stringify(e));
    if (e.status === 'move') {
        this.elapsedscale += e.scaleDelta;
    } else if (e.status === 'end') {
        this.elapsedscale = 0;
        this.scaling = false;
    }
    var s = this.scale;
    var x = s._x.state;
    var y = s._y.state;
    var z = s._z.state;

    var d = e.scaleDelta + 1;
    this.scaling = true;
    this.scale.set(x*d,y*d,z*d);
};

BoxView.prototype.drag = function(e) {
    // this.el.content(stringify(e));
    if (e.status === 'start') {
        this.body.position.z = 1000;
        world.remove(this.body.spring, this.body.rspring);
    }
    else if (e.status === 'end') {
        if (e.current === 0) {
            this.spinning = true;
            this.scale.set(1, 1, 1, {duration: 1500, curve: 'outBounce'});
            // this.rotation.set(0, 0, 0, {duration: 1000, curve: 'outElastic'}, function() {
            //     this.body.setOrientation(1,0,0,0);
            //     this.body.setAngularVelocity(0,0,0);
            //     this.spinning = false;
            // }.bind(this));
            world.add(this.body.spring, this.body.rspring);
        }
    }
    var d = e.centerDelta;
    if (e.points === 1) {
        if (e.current === 0) this.body.setVelocity(d.x * hz, d.y * hz, 0);
        this.body.position.x += d.x;
        this.body.position.y += d.y;
    }
    else {
        var x = d.x * 0.005;
        var y = d.y * 0.005;
        var q = new math.Quaternion(Math.cos(x),0,Math.sin(x),0);
        var q1 = new math.Quaternion(Math.cos(y),-Math.sin(y),0,0);
        this.body.orientation.multiply(q).multiply(q1);
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
        var spring = new physics.Spring(null,b, {period:1.5, dampingRatio:0.6,anchor: new math.Vec3()});
        var rspring = new physics.RotationalSpring(null,b, {period:1.5, dampingRatio:0.6});
        forces.push(spring, rspring);

        b.spring = spring;
        b.rspring = rspring;


        // b.setOrientation(4,20,-15,2);
    }

    var rdrag = new physics.RotationalDrag(bodies, {strength: 3});
    var drag = new physics.Drag(bodies, {strength: 3});

    world.add(drag, rdrag, forces, bodies);
}

boxes(4);

var famous = new Context(world, 'body');
