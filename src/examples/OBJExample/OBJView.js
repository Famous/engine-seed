var Mesh = require('famous-webgl-renderables').Mesh;
var Size = require('famous-components').Size;
var Position = require('famous-components').Position;
var Rotation = require('famous-components').Rotation;
var Origin = require('famous-components').Origin;

BasicView.subscribe = {
	rotate: '*'
}

function BasicView(node, model) {
    this.mesh = new Mesh(node);
    this.size = new Size(node);
    this.position = new Position(node);
    this.rotation = new Rotation(node);
    this.origin = new Origin(node);

    this.position.set(400, 400, 0);
    this.origin.set(1, 1, 0);

    this.size.setAbsolute(50, 50, 50);
    this.mesh.setGeometry(model.geometry);
    this.mesh.baseColor(model.material);
}

BasicView.prototype.rotate = function rotate() {
	var time = Date.now();

	this.rotation.set(Math.sin(time * 0.001), Math.sin(time * 0.001), Math.cos(time * 0.001));
}

module.exports = BasicView;