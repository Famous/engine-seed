import { Context } from 'famous-core';
import { Size, Align, MountPoint } from 'famous-components';
import { Mesh } from 'famous-webgl-renderables';
import { Plane } from 'famous-webgl-geometries';
import { TextureRegistry, Material } from 'famous-webgl-materials';

var GRID = [5, 5];

TextureRegistry.register('myCustomTexture', 'images/famous_logo.png');

class PlaneView {
    constructor (node, options) {
        this.node = node;
        var dispatch = node.getDispatch();

        this.mp = new MountPoint(dispatch);
        this.align = new Align(dispatch);
        this.size = new Size(dispatch);
        this.mesh = new Mesh(dispatch);

        this.mp.set(options.mountPoint[0], options.mountPoint[1]);
        this.align.set(options.align[0], options.align[1]);
        this.size.setProportional(options.proportions[0], options.proportions[1], null);

        this.mesh.setGeometry('Plane', {detail: 30});
        this.mesh.setBaseColor(Material.image([], { image: TextureRegistry.get('myCustomTexture') }));
    }
}

var root = new Context('body');

for (var i = 0; i < GRID[0]; i++) {
    for (var j = 0; j < GRID[1]; j++) {
        var index = i * GRID[0] + j;
        new PlaneView(root.addChild(), {
            align: [(index % GRID[0] / GRID[0]) / 1, (Math.floor(index / GRID[0]) / GRID[1]) / 1],
            mountPoint: [0, 0, 0],
            proportions: [1 / GRID[0] - 0.01, 1 / GRID[1] - 0.01]
        });
    }
};
