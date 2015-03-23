//opaque within translucent

//translucent within translucent

var Mesh = require('famous-webgl-renderables').Mesh;
var Box = require('famous-webgl-geometries').Box;
var Context = require('famous-api').Context;

var Size = require('famous-components').Size;
var Position = require('famous-components').Position;
var Rotation = require('famous-components').Rotation;
var Origin = require('famous-components').Origin;
var Opacity = require('famous-components').Opacity;

var material = require('famous-webgl-materials').Material;
function Ball(node) {
    for (var i=  0; i < 30; i++) {
        rotator(new makeLife(node).rotation);
    }

    var outside = new makeLife(node);
    outside.size.setAbsolute(innerHeight, innerHeight, innerHeight);
    outside.position.set(0, 0, 0);
    outside.opacity.set(.7);
};


function makeLife (node) {
        this.dispatch = node.addChild().getDispatch();

        this.mesh = new Mesh(this.dispatch);
        this.mesh.setGeometry(new Box);
        this.mesh.setBaseColor(material.normal('images/famous_logo.png'));
        this.mesh.setFlatShading(true);

        this.size = new Size(this.dispatch);
        this.position = new Position(this.dispatch);
        this.opacity = new Opacity(this.dispatch);
        this.rotation = new Rotation(this.dispatch);

        
        this.opacity.set(.5);
        this.rotation.set(Math.random() , Math.random() , Math.random());
    
        this.size.setAbsolute(200, 200, 200);
        this.position.set(Math.random() * innerWidth, Math.random() * innerHeight, Math.random() * 100);
    return this;
}

module.exports = Ball;



function rotator (r) {
    setInterval(function () {
        r.setX(r.getX() + .01);
        r.setY(r.getY() + .01);
        r.setZ(r.getZ() + .01);
    }, 16);
}
