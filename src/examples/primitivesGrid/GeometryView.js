var Mesh = require('famous-webgl-renderables').Mesh;
var Size = require('famous-components').Size;
var Position = require('famous-components').Position;
var Rotation = require('famous-components').Rotation;
var Origin = require('famous-components').Origin;
var Align = require('famous-components').Align;
var Scale = require('famous-components').Scale;


GeometryView.subscribe = {
	rotate: '*'
}

function GeometryView(node, model) {
    this.mesh = new Mesh(node);
    this.size = new Size(node);
    this.position = new Position(node);
    this.rotation = new Rotation(node);
    this.origin = new Origin(node);
    this.align = new Align(node);
    this.scale = new Scale(node);

    this.align.set(0.5, 0.5);

    this.position.set(
        model.translation[0],
        model.translation[1],
        100
    );

    this.size.setAbsolute(
        model.size[0],
        model.size[1],
        model.size[2]
    );

    this.mesh.setGeometry(model.geometry);
    this.mesh.baseColor(model.material);
}

GeometryView.prototype.rotate = function rotate() {
	var time = Date.now();
}

module.exports = GeometryView;