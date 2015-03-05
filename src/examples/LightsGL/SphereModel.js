/**
 * Module dependencies
 */
var SphereView = require('./SphereView');


/**
 * The sphere model passing in an options.size method or the default 200
 */
function SphereModel(options) {
    this.size = options.size || [200, 200, 200];
}

SphereModel.renderWith = SphereView;


/**
 * Expose
 */
module.exports = SphereModel;
