var Mesh = require('famous-webgl-renderables').Mesh;
var Sphere = require('famous-webgl-geometries').Sphere;
var Context = require('famous-api').Context;

var Size = require('famous-components').Size;
var Position = require('famous-components').Position;
var Rotation = require('famous-components').Rotation;
var Origin = require('famous-components').Origin;

var material = require('famous-webgl-materials').Material;

var video = document.createElement('video');
video.src = 'small.mp4'; //needs to be replaced with your own url
video.load();
video.play();
video.muted = true;

var t = material.Texture(video);

var m = material.add([t, material.uv()]);

function Ball(node) {
    this.dispatch = node.getDispatch();

    this.mesh = new Mesh(this.dispatch);
    this.mesh.setGeometry(new Sphere);

    this.mesh.setBaseColor(m);

    this.size = new Size(this.dispatch);
    this.rotation = new Rotation(this.dispatch);
    this.position = new Position(this.dispatch);
    
    this.size.setAbsolute(500, 500, 500);
    this.position.set(200, 200);
};

module.exports = Ball;

