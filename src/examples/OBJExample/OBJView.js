import { Mesh } from 'famous-webgl-renderables';
import { Size, MountPoint, Rotation, Origin, Align } from 'famous-components';
import { Famous } from 'famous-core';

class OBJView {
    constructor(node, options) {
        var dispatch = node.getDispatch();

        this.mesh = new Mesh(dispatch);
        this.size = new Size(dispatch);
        this.rotation = new Rotation(dispatch);
        this.origin = new Origin(dispatch);
        this.align = new Align(dispatch);
        this.mountPoint = new MountPoint(dispatch);

        this.align.set(0.5, 0.5, 0);
        this.mountPoint.set(0.5, 0.5, 0.5);
        this.origin.set(0.5, 0.5, 0.5);

        this.size.setAbsolute(500, 500, 500);

        this.mesh.setGeometry(options.geometry);
        this.mesh.setBaseColor(options.material);

        Famous.getClock().update(this);
    }

    update() {
        var time = Date.now();

        this.rotation.set(
            Math.sin(time * 0.001) * 0.2,
            Math.sin(time * 0.001) * 0.2,
            Math.cos(time * 0.001) * 0.2
        );
    }
}

module.exports = OBJView;