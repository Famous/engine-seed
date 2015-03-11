var HTMLElement = require('famous-dom-renderables').HTMLElement;
var Size = require('famous-components').Size;
var Position = require('famous-components').Position;
var Rotation = require('famous-components').Rotation;
var Origin = require('famous-components').Origin;

var m = require('famous-webgl-materials').Material;

m.Material.renderWith = function (node, model) {
    this.el = new HTMLElement(node);
    this.model = model;

    this.size = new Size(node);
    this.size.setAbsolute(150, 150);

    this.rotation = new Rotation(node);

    this.position = new Position(node);
    this.position.set(Math.random() * 500);

    this.el = new HTMLElement(node);
    this.el.property('backgroundColor', 'blue'); 
    this.el.content(this.model.name);
};

function visualizer (nodeList) {
    this.nodes = nodeList;
}

visualizer.publish = 'nodes';

visualizer.renderWith = VisualizerView;

function VisualizerView(node, model) {
    this.model = model;
};

module.exports = visualizer;
