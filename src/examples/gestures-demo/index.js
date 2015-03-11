'use strict';

var Context = require('famous-core').Context;
var Famous = require('famous-core').Famous;
var clock = Famous.getClock();

var GestureHandler = require('famous-components').GestureHandler;
var HTMLElement = require('famous-dom-renderables').HTMLElement;
var components = require('famous-components');
var Position = components.Position;
var Align = components.Align;
var Rotation = components.Rotation;
var Origin = components.Origin;
var Size = components.Size;
var Scale = components.Scale;

var physics = require('famous-physics');
var math = require('famous-math');

var world = new physics.PhysicsEngine();

function App(root) {
    this.node = root;
    this.views = [];
    this.engine = world;

    clock.update(this);
}

App.prototype.grid = function(n) {
    var bodies = [];
    var forces = [];

    var sqrt = Math.sqrt(n);
    var p = 1 / sqrt;
    for(var i = 0; i < n; i++) {
        var panel = new GridLayoutNode(this.node.addChild());
        panel.size.setProportional(p,p,0);
        panel.align.set((i % sqrt) * p, Math.floor(i / sqrt) * p,0);

        var bView = new BoxView(panel.node.addChild(), {
            mass: 1,
            size: [100,100,100]
        });

        var b = bView.body;

        bodies.push(b);
        var spring = new physics.Spring(null,b, {period:1.5, dampingRatio:0.6,anchor: new math.Vec3()});
        var rspring = new physics.RotationalSpring(null,b, {period:1.5, dampingRatio:0.6});
        forces.push(spring, rspring);

        b.spring = spring;
        b.rspring = rspring;
    }

    var rdrag = new physics.RotationalDrag(bodies, {strength: 3});
    var drag = new physics.Drag(bodies, {strength: 3});

    world.add(drag, rdrag, forces, bodies);
};

App.prototype.update = function(t) {
    this.engine.update(t);
};

function GridLayoutNode(node) {
    this.node = node;
    var dispatch = node.getDispatch();
    this.align = new Align(dispatch);
    this.size = new Size(dispatch);
}

var j = 0;
function BoxView(node, options) {
    this.node = node;
    var dispatch = node.getDispatch();
    this.body = new physics.Box(options);

    this.j = ++j;

    this.scale = new Scale(dispatch);
    this.rotation = new Rotation(dispatch);
    this.origin = new Origin(dispatch);
    this.position = new Position(dispatch);

    this.origin.set(0.5,0.5,0.5);

    this.el = new HTMLElement(dispatch);
    this.el.property('textAlign', 'center');
    this.el.property('background', 'black');
    this.el.property('color', 'white');
    this.el.property('zIndex', j + '');
    this.el.content(j + '');

    this.gestures = new GestureHandler(dispatch, [
        {event:'pinch', callback: pinch.bind(this)},
        {event:'drag', callback: drag.bind(this)},
        {event:'tap', callback: tap.bind(this), threshold: 300, points: 1},
        {event:'rotate', callback: rotate.bind(this)}
    ]);

    clock.update(this);
}

var r = ~~(256*Math.random());
var g = ~~(256*Math.random());
var b = ~~(256*Math.random());

BoxView.prototype.update = function() {
    world.getTransform(this.body, this.position, this.rotation);
    var p = this.position;
    var x = p._x.state;
    var y = p._y.state;
    this.el.property('background', 'rgb('+~~((r*this.j+x/10)%255)+','+~~((g*this.j+y/10)%255)+','+~~(b*this.j)+')');
}

function tap(e) {
    // this.el.content(stringify(e));
    var p = e.position;
    this.el.property('zIndex', ++j + '');
}

var hz = 1000 / world.step;

function rotate(e) {
    // this.el.content(stringify(e));
    var halftheta = e.rotationDelta*0.5;
    if (e.status === 'end') this.body.setAngularVelocity(0,0,2 * halftheta * hz);
    else this.body.setAngularVelocity(0,0,0);
    var q = new math.Quaternion(Math.cos(halftheta),0,0,Math.sin(halftheta));
    this.body.orientation.multiply(q);
}

function pinch(e) {
    // this.el.content(stringify(e));
    var s = this.scale;
    var x = s._x.state;
    var y = s._y.state;
    var z = s._z.state;

    var d = e.scaleDelta + 1;
    this.scale.set(x*d,y*d,z*d);
}

function drag(e) {
    // this.el.content(stringify(e));
    if (e.status === 'start') {
        this.body.position.z = 1000;
        world.remove(this.body.spring, this.body.rspring);
    }
    else if (e.status === 'end') {
        if (e.current === 0) {
            this.scale.set(1, 1, 1, {duration: 1500, curve: 'outBounce'});
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
}

function stringify(obj) {
    var result = '';
    if (typeof obj === 'string') return obj;
    for (var key in obj) {
        result += key + ': ' + JSON.stringify(obj[key]) +'<br>';
    }
    return result;
}

var root = new Context('body');
var app = new App(root);

app.grid(4)
