'use strict';

/**
 * Module dependencies
 */
var Position = require('famous-components').Position;
var PointLight = require('famous-webgl-renderables').PointLight;


/**
 * Lights view containing the point light component.
 * You can also add a mesh to the node, if you'd like for the
 * light to be seen in the scene graph.
 */
function LightsView(node, model) {
    this.position = new Position(node);

    /**
     * Create a point (light emits in all directions from the given point).
     * You can move the light around and set its color (normalized RGB: e.g. (1, 1, 1) is white)
     */
    this.pointLight = new PointLight(node);
    this.pointLight.setColor(1, 1, 1);
    this.position.set(300, 600, 500);
}


/**
 * Expose
 */
module.exports = LightsView;
