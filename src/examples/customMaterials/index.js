'use strict';

var Clock = require('famous-core').Clock;
var Scene = require('../../fixtures/Scene');
var GeometryView = require('./GeometryView');
var Geometry = require('famous-webgl-geometries');
var Material = require('famous-webgl-materials').Material;

var scene  = new Scene();
var famous = new Clock();
var geometry = new Geometry.GeodesicSphere();

Material.registerExpression('myExpression', { glsl: 'myCustomValue;' });

var customMaterial = Material.myExpression([], { 'myCustomValue': [1, 1, 1] });

setInterval(function() {
	customMaterial.setUniform('myCustomValue', [Math.random(), Math.random(), Math.random()]);
}, 100);

var CustomModel = {
	geometry: geometry,
	material: customMaterial
};

CustomModel.constructor.renderWith = GeometryView;

famous.publish(CustomModel, 'body');