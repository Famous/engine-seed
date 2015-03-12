'use strict';

import { DynamicGeometry, OBJLoader } from 'famous-webgl-geometries';
import { Material } from 'famous-webgl-materials';
import { Context } from 'famous-core';
import OBJView from './OBJView';

OBJLoader.load('obj/simple_plane.obj', function(buffers) {
    geometry.setVertexPositions(buffers.vertices);
	geometry.setNormals(buffers.normals);
	geometry.setTextureCoords(buffers.textureCoords);
	geometry.setIndices(buffers.indices);
});

var root = new Context('body');
var geometry = new DynamicGeometry();

new OBJView(root.addChild(), {
	geometry: geometry,
	material: Material.add([Material.normal(), Material.image([], { image: 'images/famous_logo.png' })])
});