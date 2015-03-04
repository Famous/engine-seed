var Position = require('famous-components').Position;
var Size = require('famous-components').Size;
var PointLight = require('famous-webgl-renderables').PointLight;
var Geometry = require('famous-webgl-geometries');
var Mesh = require('famous-webgl-renderables').Mesh;
var Align = require('famous-components').Align;
var Material = require('famous-webgl-materials').Material;

function LightView(node, model) {
	this.position = new Position(node);
	this.size = new Size(node);

	this.mesh = new Mesh(node);
	this.align = new Align(node);
	this.mesh.setGeometry(new Geometry.Plane());
	this.mesh.baseColor([1, 0, 0]);

	this.align.set(0.5, 0.5);
	this.size.setAbsolute(100, 100, 100);

	this.model = model;

	this.position.set(
		model.position[0],
		model.position[1],
		model.position[2]
	);

	this.light = new PointLight(node);
}

LightView.subscribe = {
	setPosition: '*'
};

LightView.prototype.setPosition = function setPosition() {
	var time = Date.now();

	this.position.set(
		this.model.position[0] + Math.sin(time * 0.001) * 300,
		this.model.position[1] + Math.cos(time * 0.001) * 300,
		this.model.position[2]
	);
}

module.exports = LightView;