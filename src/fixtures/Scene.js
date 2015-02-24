'use strict';

var SceneView = require('./SceneView');

function Scene () {
    this.views = [];
}

Scene.renderWith = SceneView;
Scene.publish = 'views';
    
Scene.prototype.addView = function addView(view) {
    this.views.push(view);
};

module.exports = Scene;
