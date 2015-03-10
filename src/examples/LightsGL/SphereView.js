'use strict';

/**
 * Module dependencies
 */
var Origin = require('famous-components').Origin;
var Rotation = require('famous-components').Rotation;
var Position = require('famous-components').Position;
var Align = require('famous-components').Align;
var Size = require('famous-components').Size;
var Mesh = require('famous-webgl-renderables').Mesh;
var Geometry = require('famous-webgl-geometries').Sphere;


/**
 * Sphere view constructing a basic WebGL mesh
 */
function SphereView(node, model) {
    this.position = new Position(node);
    this.rotation = new Rotation(node);
    this.align = new Align(node);
    this.size = new Size(node);
    this.mesh = new Mesh(node);

    /**
     * Set the geometry to any of the given primitives: e.g. we have the Icosahedron required in above
     * Set its color with (rgb, hsl, hex, color, hsv):
     * Example: setColor('red'), setColor('#ff0000'), setColor(255, 0, 0)
     *          setColor('hsl', 0, 100, 50), setColor('hex', '#ff0000'), setColor('rgb', 255, 0, 0), etc.
     */
    this.mesh.setGeometry(new Geometry({ detail: 100 }));
    this.mesh.baseColor('#ff0000');

    this.align.set(0.5, 0.5, 0.5);
    var width = model.size[0];
    var height = model.size[1];
    var depth = model.size[2];
    this.size.setAbsolute(width, height, depth);
}


/**
 * Call the move method on every engine tick
 */
SphereView.subscribe = {
    move: ['*']
};


/**
 * Move the mesh around in the scene
 */
SphereView.prototype.move = function() {
    var delta = Date.now() * 0.0003;
    this.rotation.setY(delta);
    this.position.setX(Math.sin(delta) * 900);
};


/**
 * Expose
 */
module.exports = SphereView;
