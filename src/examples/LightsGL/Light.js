'use strict';

/**
 * Module dependencies
 */
var Position = require('famous-components').Position;
var PointLight = require('famous-webgl-renderables').PointLight;
var Align = require('famous-components').Align;
var Origin = require('famous-components').Origin;
var MountPoint = require('famous-components').MountPoint;
var Size = require('famous-components').Size;
var Mesh = require('famous-webgl-renderables').Mesh;
var Geometry = require('famous-webgl-geometries').Sphere;
var Famous = require('famous-core').Famous;
var Clock = Famous.getClock();


/**
 * Lights view containing the point light component.
 * You can also add a mesh to the node, if you'd like for the
 * light to be seen in the scene graph.
 */
function Light(node, color, direction) {
    this.dispatch = node.getDispatch();
    this.position = new Position(this.dispatch);
    this.align = new Align(this.dispatch);
    this.origin = new Origin(this.dispatch);
    this.mountPoint = new MountPoint(this.dispatch);
    this.size = new Size(this.dispatch);
    this.mesh = new Mesh(this.dispatch);
    this.mesh.setGeometry(new Geometry({ detail: 100 }));
    this.direction = direction;
    this.tempo = Math.random() * 0.001;
    this.radius = 500;
    this.color = color || '#ff0';

    /**
     * Place a mesh where the light source is so that you can see
     * the light source. FlatShading is set to true, so that the mesh
     * is not affected by the light in the scene.
     */
    this.mesh.setFlatShading(true);
    this.mesh.setBaseColor(this.color);
    this.size.setAbsolute(50, 50, 50);

    /**
     * Create a point (light emits in all directions from the given point).
     * You can move the light around and set its color with (rgb, hsl, hex, color, hsv):
     * Example: setColor('red'), setColor('#ff0000'), setColor(255, 0, 0)
     *          setColor('hsl', 0, 100, 50), setColor('hex', '#ff0000'), setColor('rgb', 255, 0, 0), etc.
     */
    this.pointLight = new PointLight(this.dispatch);
    this.pointLight.setColor(this.color);

    this.align.set(0.5, 0.5, 0.5);
    this.mountPoint.set(0.5, 0.5, 0.5);
    this.origin.set(0.5, 0.5, 0.5);

    /**
     * Determine the various movements based on the directions input
     */
    this.update = (this.direction === 'horizontal') ? horizontal.bind(this) : vertical.bind(this);

    /**
     * Call update on every engine tick
     */
    Clock.update(this);
}

/**
 * Spin the light horizontally
 */
function horizontal() {
    var delta = Date.now() * this.tempo;
    this.position.setX(Math.cos(delta) * this.radius);
    this.position.setZ(Math.sin(delta) * this.radius);
};

/**
 * Spin the light vertically
 */
function vertical() {
    var delta = Date.now() * this.tempo;
    this.position.setY(Math.cos(delta) * this.radius);
    this.position.setZ(Math.sin(delta) * this.radius);
};

/**
 * Expose
 */
module.exports = Light;
