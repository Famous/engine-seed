'use strict';

var SceneView = require('./SceneView');

/**
 * @class Scene
 * @constructor
 *
 */
function Scene () {
    this.views = [];
}

Scene.renderWith = SceneView;
Scene.publish = 'views';

/**
 * Adds a view to the Scene.
 *
 * @method addView
 * @chainable
 *
 * @param {Object} view
 * @return {Scene} this
 */
Scene.prototype.addView = function addView(view) {
    this.views.push(view);
    return this;
};

/**
 * Removes a view from the Scene.
 *
 * @method removeView
 * @chainable
 *
 * @param {Object} view
 * @return {Scene} this
 */
Scene.prototype.removeView = function removeView(view) {
    var index = this.views.indexOf(view);
    this.views.splice(index, 1);
    return this;
};

module.exports = Scene;
