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

var world = new PhysicsEngine({
    origin: new math.Vec3(600,400,0)
});

function WorldView(dispatch, model) {
    this.el = new HTMLElement(dispatch);
}
WorldView.prototype.tick = function() {
    world.update(Date.now());
};
var impulse = new math.Vec3();
WorldView.prototype.wheel = function(ev) {
    impulse.set(ev.deltaY*ghost.mass/50, -ev.deltaX*ghost.mass/50, 0);
    ghost.applyAngularImpulse(impulse);
};
WorldView.handlers = [UIEvents([
    {
        name: 'wheel',
        methods: ['preventDefault'],
        properties: ['deltaX', 'deltaY']
    }
])];
WorldView.subscribe = {tick: '*'};

PhysicsEngine.publish = 'bodies';
PhysicsEngine.renderWith = WorldView;

function BoxView(dispatch, model) {
    this.body = model;
    this.position = new Position(dispatch);
    this.rotation = new Rotation(dispatch);
    this.origin = new Origin(dispatch);
    this.mountPoint = new MountPoint(dispatch);
    this.size = new Size(dispatch);

    var s = model.size;
    this.size.setAbsolute(s[0],s[1],s[2]);
    this.origin.set(0.5,0.5,0.5);
    this.mountPoint.set(0.5,0.5,0.5);

    this.el = new HTMLElement(dispatch);
    this.el.property('background', model.color);
    this.el.property('color', 'white');
    this.el.property('textAlign', 'center');
    this.el.property('lineHeight', s[1]+'px');
    this.el.content(model.content+'');
}

BoxView.prototype.update = function() {
    world.getTransform(this.body, this.position, this.rotation);
};

BoxView.prototype.setContent = function (model) {
    this.el.content(model.content + '');
}

BoxView.subscribe = {update: '*', setContent: ['content']};

physics.Box.renderWith = BoxView;
physics.Particle.renderWith = BoxView;

var w = 1400;
var h = 800;

var ghost = new physics.Box({
    size: [w/70,h/70,h/70],
    mass: 1e8,
    restrictions: ['xyz', '']
});
ghost.content = '';
ghost.color = 'black'

world.add(ghost);

var radius = 2500;
ghost.setPosition(0,0,-radius);

var blades = [];
var springs = [];
var forces = [];
var num = 500;
var span = 20;

var qs = [];
var rs = [];

var base = Math.floor(360 * Math.random());
for (var i = 0; i < num; i++) {
    var size = [400,25,50];

    var theta = -i * 2 * Math.PI / num;
    var r = new math.Vec3(0,0,radius);
    r.rotateX(theta)

    var q = new math.Quaternion(Math.cos(theta/2),Math.sin(theta/2),0,0);

    rs.push(r);
    qs.push(q);

    var blade = new physics.Particle({
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
    strength: 2
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

var famous = new Clock();
famous.publish(world, 'body');
