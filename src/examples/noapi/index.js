import {Clock, Node, RenderProxy, Context} from 'famous-core';
import {Size, Align, MountPoint} from 'famous-components';
import {HTMLElement} from 'famous-dom-renderables';

class MyEl {
    constructor (node) {
        this.node = node;
        var dispatch = node.getDispatch();
        this.mp = new MountPoint(dispatch);
        this.align = new Align(dispatch);
        this.size = new Size(dispatch);
        this.el = new HTMLElement(dispatch);

        this.mp.set(0.5, 0.5);
        this.align.set(0.5, 0.5);
        this.size.setProportional(0.5, 0.5, null, {duration : 1000});

        this.el.property('background-color', 'red');
    }
}

var root = new Context('body');
var el = new MyEl(root.addChild());