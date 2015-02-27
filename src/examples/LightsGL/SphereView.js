'use strict';

var Origin = require('famous-components').Origin;
var Rotation = require('famous-components').Rotation;
var Position = require('famous-components').Position;
var Align = require('famous-components').Align;
var Size = require('famous-components').Size;
var Mesh = require('famous-webgl-renderables').Mesh;
var Geometry = require('famous-webgl-geometries').Icosahedron;

function SphereView(node, model) {
    this.position = new Position(node);
    this.rotation = new Rotation(node);
    this.align = new Align(node);
    this.size = new Size(node);
    this.mesh = new Mesh(node);

    this.mesh.setGeometry(new Geometry());
    this.mesh.baseColor([0.7, 0.3, 0.25]);

    this.align.set(0.5, 0.5, 0.5);
    var width = model.size[0];
    var height = model.size[1];
    var depth = model.size[2];
    this.size.setAbsolute(width, height, depth);
}

SphereView.subscribe = {
    spin: ['*']
};

SphereView.prototype.spin = function() {
    var delta = Date.now() * 0.0003;
    this.rotation.setY(delta);
    this.position.setX(Math.sin(delta) * 900);
};

module.exports = SphereView;
