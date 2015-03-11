var Mesh = require('famous-webgl-renderables').Mesh;
var Sphere = require('famous-webgl-geometries').Sphere;
var DynamicGeometry = require('famous-webgl-geometries').DynamicGeometry;
var Context = require('famous-api').Context;

var Size = require('famous-components').Size;
var Position = require('famous-components').Position;
var Rotation = require('famous-components').Rotation;
var Origin = require('famous-components').Origin;

var m = require('famous-webgl-materials').Material;
var Visualizer = require('./visualizer');

var g = new DynamicGeometry();
g.fromGeometry(new Sphere({ detail: 100 }));
for(var displacement = []; displacement.length < g.getLength();) displacement.push(Math.random());
g.setVertexBuffer('displacement', displacement, 1);
var a = m.registerExpression('sun', { glsl:'normal * vec3(displacement);' });
var x = m.sun(null, {attributes: {displacement: 1 }});

function Ball(node) {
    this.dispatch = node.getDispatch();

    this.mesh = new Mesh(this.dispatch);
    this.mesh.setGeometry(g);
    this.mesh.positionOffset(x);
    this.mesh.baseColor(m.normal());

    this.size = new Size(this.dispatch);
    this.rotation = new Rotation(this.dispatch);
    this.size.setAbsolute(500, 500, 500);
};

module.exports = Ball;

