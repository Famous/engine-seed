'use strict';

var Clock = require('famous-core').Clock;

var GeometryView = require('./GeometryView');
var LightView = require('./LightView');
var Geometry = require('famous-webgl-geometries');
var Scene = require('../../fixtures/Scene');

var Material = require('famous-webgl-materials').Material;

var famous = new Clock();
var scene = new Scene();

var geometries = [
	new Geometry.Box({ detail: 15 }),
	new Geometry.Circle({ detail: 15 }),
	new Geometry.Cylinder(),
	new Geometry.GeodesicSphere({ detail: 3 }),
	new Geometry.Icosahedron({ detail: 30 }),
	new Geometry.ParametricCone({ detail: 30 }),
	new Geometry.Plane({ detail: 30 }),
	new Geometry.Sphere({ detail: 30 }),
	new Geometry.Tetrahedron({ detail: 30 }),
	new Geometry.Torus({ detail: 30 }),
	new Geometry.Triangle({ detail: 1 })
];

var data = [];
var GRID = [4, 4];
var spacing = 175;
var size = [150, 150, 150];
var lightPos = [0, 0, 200];
var translation;
var geometryModel;

for (var i = 0; i < GRID[0]; i++) {
    for (var j = 0; j < GRID[1]; j++) {
        translation = [
            spacing * (i - (GRID[0] * 0.5)),
            spacing * (j - (GRID[1] * 0.5))
        ];

		geometryModel = new GeometryModel({
        	geometry: geometries[i * GRID[0] + j],
        	material: [1, 0, 0],
        	translation: translation,
        	size: size
        });

        scene.addView(geometryModel);
    }
}

scene.addView(new LightModel({ position: lightPos }));

famous.publish(scene, 'body');

function GeometryModel(options) {
	this.geometry = options.geometry;
	this.material = options.material;
	this.translation = options.translation;
	this.size = options.size;
}

GeometryModel.renderWith = GeometryView;

function LightModel(options) {
	this.position = options.position;
}

LightModel.renderWith = LightView;



