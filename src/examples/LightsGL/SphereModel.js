var SphereView = require('./SphereView');

function SphereModel(options) {
    this.size = options.size || [200, 200, 200];
}

SphereModel.renderWith = SphereView;

module.exports = SphereModel;
