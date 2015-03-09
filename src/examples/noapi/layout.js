import {Clock, Node, RenderProxy, Context} from 'famous-core';
import {Size, Position} from 'famous-components';
import {HTMLElement} from 'famous-dom-renderables';

class SequentialLayout {
    constructor (node) {
        this.node = node;
        this.size = new Size(node.getDispatch());

        this.node.getDispatch().onSizeChange(this.layout.bind(this))

        this.layoutNodes = [];
        this.layoutSizes = [];
        this.layoutPositions = [];
        this.children = [];
    }

    addChild () {
        var temp = this.node.addChild();
        this.layoutNodes.push(temp);
        this.layoutSizes.push(new Size(temp.getDispatch()));
        this.layoutPositions.push(new Position(temp.getDispatch()));

        temp = temp.addChild();
        this.children.push(temp);
        this.layout();
        return temp;
    }

    layout () {
        var parentSize = this.size.get();
        for (var i = 0; i < this.layoutNodes.length; i++) {
            this.layoutSizes[i].setProportional(1, 1/this.layoutNodes.length, 0);
            this.layoutPositions[i].set(0, i * (parentSize[1]/this.layoutNodes.length), 0);
        }
    }
}

var root = new Context('body');
var sequentialLayoutNode = new SequentialLayout(root.addChild());


var colors = ['red', 'blue', 'yellow'];
var node;
var el;

for (var i = 0; i < colors.length; i++) {
    node = sequentialLayoutNode.addChild();
    el = new HTMLElement(node.getDispatch());
    el.property('background-color', colors[i]);
}

