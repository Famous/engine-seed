import {Clock, Node, RenderProxy} from 'famous-core';
import {Size, Align, MountPoint} from 'famous-components';
import {HTMLElement} from 'famous-dom-renderables';

var GLOBAL_DISPATCH = Clock.dispatch;

class Root {

    constructor (selector) {
        this.proxy = new RenderProxy(this);
        this.node = new Node(this.proxy, GLOBAL_DISPATCH);
        this.selector = selector;
        this.dirty = true;
        this.dirtyQueue = [];
        GLOBAL_DISPATCH.message('NEED_SIZE_FOR').message(selector);
        GLOBAL_DISPATCH.targetedOn(selector, 'resize', this._receiveContextSize.bind(this));
        Clock.update(this);
    }

    addChild () {
        return this.node.addChild();
    }

    update () {
        this.node.update();
    }

    getRenderPath () {
        return this.selector;
    }

    receive (command) {
        if (this.dirty) this.dirtyQueue.push(command);
        else GLOBAL_DISPATCH.message(command);
        return this;
    }

    _receiveContextSize (sizeReport) {
        this.node
            .getDispatch()
            .getContext()
            .setAbsolute(sizeReport.size[0], sizeReport.size[1], 0);
        if (this.dirty) {
            this.dirty = false;
            for (var i = 0, len = this.dirtyQueue.length ; i < len ; i++) this.receive(this.dirtyQueue.shift());
        }
    }

}


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

var root = new Root('body');
var el = new MyEl(root.addChild());