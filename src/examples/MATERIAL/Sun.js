/**
 * Module dependencies
 */
import {Context, Famous} from 'famous-core';
import {Size, Position, Rotation, Origin, Align} from 'famous-components';
import {Mesh} from 'famous-webgl-renderables';
import {Sphere, DynamicGeometry} from 'famous-webgl-geometries';
import {Material} from 'famous-webgl-materials';
let Clock = Famous.getClock();
let Visualizer = require('./visualizer');


/**
 * Create a dynamic geometry from a sphere
 */
var sunGeometry = new DynamicGeometry();
sunGeometry.fromGeometry(new Sphere({ detail: 100 }));


/**
 * Fill displacement buffer with the same number of values
 * as the indices of the geometry.
 */
var displacement = [];
var vertexLength = sunGeometry.getLength();
for(var i = 0; i < vertexLength; i++) {
    displacement.push(Math.random());
}

/**
 * Insert the displacement values into the buffer
 */
sunGeometry.setVertexBuffer('a_Displacement', displacement, 1);


/**
 * Custom expression for the vertex shader
 */
var shader =
    `vec3 sunDisplacement() {
        v_Displacement = a_Displacement;
        return normals * vec3(a_Displacement * 10.0 * u_Amplitude);
    }`;


/**
 * Register the custom expression inside of the material graph
 */
Material.registerExpression('sunVertex', {
    glsl: 'sunDisplacement();',
    defines: shader
});


/**
 * Set the various variables' default values and types
 * E.g. 1 is the value as well as it being a float (scalar)
 *      [1, 1] represents a vec2(1.0, 1.0)
 */

var sunVertex = Material.sunVertex(null, {
    attributes: {
        a_Displacement: 1
    },
    uniforms: {
        u_Amplitude: 1
    },
    varyings: {
        v_Displacement: 1
    }
});


/**
 * Custom expression for the fragment shader.
 * The amplitude uniform (u_Amplitude) is being used
 * to clamp the color values.
 */
Material.registerExpression('sunFragment', {
    glsl:
        `vec3(
            clamp(v_Displacement * u_Amplitude * 3.0, 0.0, 1.0),
            clamp(v_Displacement * u_Amplitude * 3.0 - 1.0, 0.0, 1.0),
            clamp(v_Displacement * u_Amplitude * 3.0 - 2.0, 0.0, 1.0)
        );`
});


/**
 * Variables for helping animate the geometry on every 'tick'
 */
var frame = 0;
var amplitude = 0;

/**
 * Sun constructor
 */
class Sun {

    constructor (node) {
        this.dispatch = node.getDispatch();
        this.mesh = new Mesh(this.dispatch);
        this.rotation = new Rotation(this.dispatch);
        this.size = new Size(this.dispatch);
        this.align = new Align(this.dispatch);
        this.origin = new Origin(this.dispatch);

        this.mesh.setGeometry(sunGeometry);
        this.mesh.setPositionOffset(sunVertex);
        this.mesh.setBaseColor(Material.sunFragment());
        this.size.setAbsolute(100, 100, 100);
        this.align.set(0.5, 0.5, 0.5);
        this.origin.set(0.5, 0.5, 0.5);

        /**
         * Animate the sun on every engine 'tick'
         */
        Clock.update(this);
    }

    /**
     * Rotate and expand/contract the geometry
     */
    update() {
        var delta = Date.now() * 0.0003;
        this.rotation.setY(delta);
        amplitude = (0.05 * Math.sin(frame * 0.25) + 0.5);
        sunVertex.setUniform('u_Amplitude', amplitude);
        frame += 0.1;
    }
}


/**
 * Expose
 */
module.exports = Sun;

