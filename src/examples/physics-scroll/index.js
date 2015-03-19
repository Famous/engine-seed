'use strict';

var Context = require('famous-core').Context;
var Famous = require('famous-core').Famous;
var Clock = Famous.getClock();

var HTMLElement = require('famous-dom-renderables').HTMLElement;
var components = require('famous-components');
var Position = components.Position;
var Rotation = components.Rotation;
var Origin = components.Origin;
var MountPoint = components.MountPoint;
var Size = components.Size;
var Opacity = components.Opacity;
var Scale = components.Scale;
var Camera = components.Camera;
var UIEventHandler = components.UIEventHandler;
var GestureHandler = components.GestureHandler;

var Torus = require('famous-webgl-geometries').Tetrahedron;
var Plane = require('famous-webgl-geometries').Plane;
var Material = require('famous-webgl-materials').Material;
var Mesh = require('famous-webgl-renderables').Mesh;

var PointLight = require('famous-webgl-renderables').PointLight;

var math = require('famous-math');
var physics = require('famous-physics');

var OBJLoader = require('famous-webgl-geometries').OBJLoader;
var DynamicGeometry = require('famous-webgl-geometries').DynamicGeometry;

var PhysicsEngine = physics.PhysicsEngine;

var world = new PhysicsEngine({ origin: new math.Vec3(530,300,0)});

function WorldView(node) {
    var dispatch = node.getDispatch();
    this.el = new HTMLElement(dispatch);
    this.last = [0,0];

    this.events = new UIEventHandler(dispatch, [
        {
            event: 'wheel',
            methods: ['preventDefault'],
            properties: ['deltaX', 'deltaY'],
            callback: this.wheel.bind(this)
        }
    ]);

    this.gestures = new GestureHandler(dispatch, [
        {
            event: 'drag',
            callback: function(e) {
                var d = e.centerDelta;
                impulse.set(-d.y*3000, d.x*3000, 0);
                ghost.applyAngularImpulse(impulse);
            }
        }
    ]);

    this.camera = new Camera(dispatch);
    this.camera.setDepth(4 * radius);

    this.engine = world;
    this.children = [];
    Clock.update(this);

    var g = new BoxView(node.addChild(), world.bodies[0], false);
    for (var i = 1; i < world.bodies.length; i++) {
        this.children.push(new BoxView(node.addChild(), world.bodies[i], true, 0));
    }
}

WorldView.prototype.update = function(t) {
    this.engine.update(t);
};
var impulse = new math.Vec3();
WorldView.prototype.wheel = function(ev) {
    impulse.set(ev.deltaY*1000, -ev.deltaX*1000, 0);
    ghost.applyAngularImpulse(impulse);
};

function BoxView(node, model, bool, bool2) {
    var dispatch = node.getDispatch();
    this.body = model;
    this.position = new Position(dispatch);

    this.rotation = new Rotation(dispatch);
    this.origin = new Origin(dispatch);
    this.mountPoint = new MountPoint(dispatch);
    this.size = new Size(dispatch);
    this.scale = new Scale(dispatch);

    var s = model.size;
    this.size.setAbsolute(s[0],s[1],s[2]);
    this.origin.set(0.5,0.5,0.5);
    this.mountPoint.set(0.5,0.5,0.5);

    this.el = new HTMLElement(dispatch);

    this.el.property('background', model.color);
    this.el.property('color', 'white');
    this.el.property('textAlign', 'center');
    this.el.property('fontSize', '40px')
    this.el.property('lineHeight', s[1]+'px');

    this.content = '';

    Clock.update(this);
}

BoxView.prototype.update = function() {
    var c = this.body.content + '';
    if (c !== this.content) this.el.content(c);
    var s = this.body.size;
    this.size.setAbsolute(s[0],s[1],s[2]);
    var t = world.getTransform(this.body);
    this.position.set(t.position[0],t.position[1],t.position[2])
    this.rotation.set(t.rotation[0],t.rotation[1],t.rotation[2])
};

var w = 1400;
var h = 800;

var ghost = new physics.Box({
    size: [w/10,h/10,h/10],
    mass: 1e3,
    restrictions: ['xyz', '']
});

ghost.content = '';
ghost.color = 'black';

world.add(ghost);

var radius = 1300;
ghost.setPosition(0,0,-radius);

var blades = [];
var springs = [];
var forces = [];
var num = 50;
var span = 20;

var qs = [];
var rs = [];

var base = Math.floor(360 * Math.random());
for (var i = 0; i < num; i++) {
    var size = [400,150,100];

    var theta = -i * 2 * Math.PI / num;
    var r = new math.Vec3(0,0,radius);
    r.rotateX(theta)

    var q = new math.Quaternion(Math.cos(theta/2),Math.sin(theta/2),0,0);

    rs.push(r);
    qs.push(q);

    var blade = new physics.Box({
        size: size,
        position: math.Vec3.add(r, ghost.position, new math.Vec3()),
        orientation: math.Quaternion.clone(q)
    });

    var spring = new physics.Spring(null, blade, {
        period: 2.3,
        dampingRatio: 0.8,
        anchor: math.Vec3.add(r, ghost.position, new math.Vec3())
    });

    blade.content = i+1;
    blade.color = 'hsl('+(base + (i*17)%360)+',50%,50%)';

    blades.push(blade);
    springs.push(spring);
}

var rdrag = new physics.RotationalDrag(ghost, {
    strength: 1e6
});

forces.push(rdrag);

var ws = [];
world.prestep.push(function(time, dt) {
    blades.forEach(function(b, i) {
        ws[i] = [b.orientation.w, b.orientation.x];
        // ghost.orientation.rotateVector(rs[i], b.position).add(ghost.position);
        ghost.orientation.rotateVector(rs[i], springs[i].anchor).add(ghost.position);
        math.Quaternion.multiply(qs[i], ghost.orientation, b.orientation);
    });
});

var count = 0;
world.poststep.push(function(time, dt) {
    blades.forEach(function(b, i) {
        var w = ws[i][0];
        var x = ws[i][1];

        var cw = b.orientation.w;
        var cx = b.orientation.x;
        if (w > 0 && x > 0 && cw < 0 && cx > 0) {
            if (i === 0) count++;
            if (count > 0) b.content += num;
        }
        else if (w < 0 && x < 0 && cw > 0 && cx < 0) {
            if (i === 0) count++;
            if (count > 0) b.content += num;
        }
        else if (w < 0 && x > 0 && cw > 0 && cx > 0) {
            if (i === 0) count = Math.max(0, count - 1);
            b.content = Math.max(b.content - num, i + 1);
        }
        else if (w > 0 && x < 0 && cw < 0 && cx < 0) {
            if (i === 0) count = Math.max(0, count - 1);
            b.content = Math.max(b.content - num, i + 1);
        }
    });
});

world.add(blades, springs, forces);


var root = new Context('body');
var scene = new WorldView(root.addChild());
