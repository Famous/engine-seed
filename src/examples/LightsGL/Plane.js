'use strict';

/**
 * Module dependencies
 */
var Origin = require('famous-components').Origin;
var Rotation = require('famous-components').Rotation;
var Position = require('famous-components').Position;
var Align = require('famous-components').Align;
var Origin = require('famous-components').Origin;
var MountPoint = require('famous-components').MountPoint;
var Size = require('famous-components').Size;
var Mesh = require('famous-webgl-renderables').Mesh;
var Geometry = require('famous-webgl-geometries').Plane;
var Famous = require('famous-core').Famous;
var Clock = Famous.getClock();

/**
 * Plane view constructing a basic WebGL mesh
 */
function Plane(node) {
    this.dispatch = node.getDispatch();
    this.position = new Position(this.dispatch);
    this.mesh = new Mesh(this.dispatch);

    /**
     * Set the geometry to any of the given primitives: e.g. we have the Icosahedron required in above
     * Set its color with (rgb, hsl, hex, color, hsv):
     * Example: setColor('red'), setColor('#ff0000'), setColor(255, 0, 0)
     *          setColor('hsl', 0, 100, 50), setColor('hex', '#ff0000'), setColor('rgb', 255, 0, 0), etc.
     */
    this.mesh.setGeometry(new Geometry());
    this.mesh.setBaseColor('#222');

    this.position.setZ(-800);
}


/**
 * Expose
 */
module.exports = Plane;
