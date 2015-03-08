var Mesh = require('famous-webgl-renderables').Mesh;
var Size = require('famous-components').Size;
var Position = require('famous-components').Position;
var Rotation = require('famous-components').Rotation;
var Align = require('famous-components').Align;
var Origin = require('famous-components').Origin;
var PointLight = require('famous-webgl-renderables').PointLight;

GeometryView.subscribe = {
	rotate: '*'
}

function GeometryView(node, model) {
    this.mesh = new Mesh(node);
    this.size = new Size(node);
    this.position = new Position(node);
    this.rotation = new Rotation(node);
    this.align = new Align(node);

    this.align.set(0.5, 0.5);

    this.size.setAbsolute(200, 200, 200);
    this.mesh.setGeometry(model.geometry);
    this.mesh.baseColor(model.material);

    this.light = new PointLight(node);
}

GeometryView.prototype.rotate = function rotate() {
	var time = Date.now();

	this.rotation.set(Math.sin(time * 0.001), Math.sin(time * 0.001), Math.cos(time * 0.001));
}

module.exports = GeometryView;