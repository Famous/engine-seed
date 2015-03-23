var HTMLElement = require('famous-dom-renderables').HTMLElement;
var Size = require('famous-components').Size;
var Position = require('famous-components').Position;
var Rotation = require('famous-components').Rotation;
var Origin = require('famous-components').Origin;

var m = require('famous-webgl-materials').Material;

var UIEvents = require('famous-handlers').UIEvents;

var tree = require('./layout');

var t = tree().size([1000, 500]);
var setBaseColorOnMesh;

function graphView(model, index) {
    var child = this.addChild();
    var node = child.getDispatch();
    this.model = model;
    this.el = new HTMLElement(node);
 
    this.size = new Size(node);
    this.size.setAbsolute(150, 150);

    this.rotation = new Rotation(node);

    this.position = new Position(node);
    this.position.set(index * 200);

    this.el = new HTMLElement(node);
    this.el.property('backgroundColor', 'blue'); 
    this.el.content(this.model.name);

    node.registerTargetedEvent('click', function () {
        setBaseColorOnMesh(model);
    }.bind(this)
                              );

    this.el.on('click');
};

function buildVisualizer(node, view, callback) {
    var mesh = view.mesh;
    var material = mesh._expressions.baseColor;

    var list = [];
    material.traverse(function (node) { list.push(node) });

    list.forEach(graphView, node);

    setBaseColorOnMesh = mesh.setBaseColor.bind(mesh);
}    


module.exports = buildVisualizer;
