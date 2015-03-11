var Mesh = require('famous-webgl-renderables').Mesh;
var Sphere = require('famous-webgl-geometries').Sphere;
var Context = require('famous-api').Context;
var Size = require('famous-components').Size;
var Material = require('famous-webgl-materials').Material;


//how to: importing a random shader
//http://glslsandbox.com/e#23556.0
//stringify, and rename main function to something unique and give it a return value
//change the type signature to vec3
//change (fragcoord / resolution) to v_TextureCoordinate if you want the shader to wrap 
var shader =
        'float lengthsq(vec2 p) { return dot(p, p); }' + 
        'float noise(vec2 p){' +
        '    return fract(sin(fract(sin(p.x) * (abs(cos(time*0.5)))) + p.y) * 1.0-abs(sin(time*0.5)));' + 
        '}' +

        'float worley(vec2 p) {  ' + 
        '    float d = 10.0;' + 
        '    for (int xo = -1; xo <= 1; xo++) {' +
        '        for (int yo = -1; yo <= 1; yo++) {' + 
        '            vec2 test_cell = floor(p) + vec2(xo, yo);' +
        '            vec2 c = test_cell + noise(test_cell);' +
        '            d = min(d, lengthsq(p - c) + noise(test_cell) * 0.4);' +
        '        }' +
        '    }' +
        '    return d;' +
        '}' +

        'vec3 export123() {' +
        '    float t = 0.9 * worley(v_TextureCoordinate * 10.);' +
        '    return vec3(t,sqrt(t), t);' + 
        '}';

Material.registerExpression('test', {defines: shader, glsl: 'export123();'});

var backdoor = Material.test();

function BallView(node) {
    this.mesh = new Mesh(node.getDispatch());
    this.mesh.setGeometry(new Sphere({detail: 100}));
    
    this.mesh.baseColor(backdoor);

    this.size = new Size(node.getDispatch());
    this.size.setAbsolute(500, 500, 500);
};

module.exports = BallView;
