'use strict';

/**
 * Module dependencies
 */
import {Context, Famous} from 'famous-core';
import {Size, Position, Rotation, Origin, Align, MountPoint} from 'famous-components';
import {Mesh, PointLight, AmbientLight} from 'famous-webgl-renderables';
import {GeodesicSphere, DynamicGeometry} from 'famous-webgl-geometries';
import {Material} from 'famous-webgl-materials';
let Clock = Famous.getClock();


/**
 * FlatSphere view constructing a basic WebGL mesh
 */
function FlatSphere(node) {
    this.dispatch = node.getDispatch();
    this.position = new Position(this.dispatch);
    this.rotation = new Rotation(this.dispatch);
    this.align = new Align(this.dispatch);
    this.origin = new Origin(this.dispatch);
    this.mountPoint = new MountPoint(this.dispatch);
    this.size = new Size(this.dispatch);
    this.mesh = new Mesh(this.dispatch);

    /**
     * Set Ambient light (a light that emits equally in the scene)
     */
    this.ambience = new AmbientLight(this.dispatch);
    this.ambience.setColor('#444400');

    /**
     * Set the geometry to any of the given primitives: e.g. we have the Icosahedron required in above
     * Set its color with (rgb, hsl, hex, color, hsv):
     * Example: setColor('red'), setColor('#ff0000'), setColor(255, 0, 0)
     *          setColor('hsl', 0, 100, 50), setColor('hex', '#ff0000'), setColor('rgb', 255, 0, 0), etc.
     */
    this.mesh.setGeometry(new GeodesicSphere());
    this.mesh.setBaseColor('white');

    this.align.set(0.5, 0.5, 0.5);
    this.mountPoint.set(0.5, 0.5, 0.5);
    this.origin.set(0.5, 0.5, 0.5);
    this.size.setAbsolute(100, 100, 100);

    /**
     * Call the update method on every 'tick'
     */
    Clock.update(this);
}


/**
 * Orbint the mesh around the sun
 */
FlatSphere.prototype.update = function() {
    var delta = Date.now() * 0.00009;
    this.rotation.setY(delta);
    this.position.setX(Math.cos(delta) * 450);
    this.position.setY(Math.sin(delta) * 450);
};


/**
 * Expose
 */
module.exports = FlatSphere;
