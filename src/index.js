'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');

// Boilerplate code to make your life easier

FamousEngine.init();

// Initialize the app by creating a scene

var scene = FamousEngine.createScene();

// Add a 'node' element to the scene root

var logo = scene.addChild();

// Create an [image] DOM element given the provided logo 'node'

var el = new DOMElement(logo, { tagName: 'img' });

// Set the source to the Famous logo asset.

el.setAttribute('src', './images/famous_logo.png');

// Set the size mode to 'absolute' to set with absolute pixel values: (width 250px, height 250px)

logo.setSizeMode('absolute', 'absolute', 'absolute');
logo.setAbsoluteSize(250, 250);

// Center the `node` within the parent (the screen, in this instance)

logo.setAlign(0.5, 0.5);

// Set the translational point to the center of the `node`
//
logo.setMountPoint(0.5, 0.5);

// Set the rotational origin to the center of the `node`

logo.setOrigin(0.5, 0.5);

// An object with an 'onUpdate' method that is called by the 'FamousEngine' singleton

var animation = {
    // Spin the logo on the Y-Axis

    spinLogo: function() {
        logo.setRotation(0, Date.now() * 0.0007, 0);
    },
    // Continualy call 'spinLogo' within 'this' animation object

    onUpdate: function() {
        this.spinLogo();
        FamousEngine.requestUpdateOnNextTick(animation);
    }
};

// And the magic happens...

animation.onUpdate();
