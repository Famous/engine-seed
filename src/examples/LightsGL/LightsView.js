'use strict';

var Origin = require('famous-components').Origin;
var Position = require('famous-components').Position;
var Align = require('famous-components').Align;
var Size = require('famous-components').Size;
var Mesh = require('famous-webgl-renderables').Mesh;
var Geometry = require('famous-webgl-geometries').Box;
var PointLight = require('famous-webgl-renderables').PointLight;

function LightsView(node, model) {
    this.position = new Position(node);
    this.size = new Size(node);
    this.mesh = new Mesh(node);
    this.align = new Align(node);
    this.pointLight = new PointLight(node);
    this.pointLight.setColor(1, 1, 1);

    this.mesh.setGeometry(new Geometry());
    this.mesh.baseColor([0.7, 0.3, 0.25]);

    this.size.setAbsolute(10, 10, 10);
    this.position.set(400, 300, 0);
}

LightsView.subscribe = {
    orbit: ['*']
};

LightsView.prototype.orbit = function() {
    var delta = Date.now() * 0.0008;
    // this.position.set(Math.cos(delta) * 300, Math.sin(delta) * 300, 0);
};

module.exports = LightsView;
