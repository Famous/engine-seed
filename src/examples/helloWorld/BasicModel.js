var BasicView = require('./BasicView');

function BasicModel(options) {
    this.content = options.content || 'BOOM';
    this.backgroundColor = options.backgroundColor || 'red';
    this.borderRadius = options.borderRadius || 0;
}

BasicModel.renderWith = BasicView;

module.exports = BasicModel;
