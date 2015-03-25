import {Size, Position} from 'famous-components';

export class Grid {
    constructor(node, options) {
        this.root = node;
        this.dimensions = options.dimensions;
        this.children = [];
        this.parentSize = [0, 0];

        this.root.getDispatch().onSizeChange(function(size) {
            size = size.get();
            this.parentSize[0] = size[0];
            this.parentSize[1] = size[1];

            if(size[0] > 300) {
                _relayoutGrid.call(this);
            }
            else {
                _relayoutSequential.call(this);
            }
        }.bind(this));

        _createChildren.call(this);
    }

    get(index) {
        return this.children[index].node;
    }

    setOptions(options) {
        var relayout = false;
        if (options.verticalGutters !== this.verticalGutters) {
            this.verticalGutters = options.verticalGutters;
            relayout = true;
        }

        if (options.horizontalGutters !== this.horizontalGutters) {
            this.horizontalGutters = options.horizontalGutters;
            relayout = true;
        }

        if (relayout) _relayout.call(this);
    }
}

function _createChildren() {
    for (var i = 0; i < this.dimensions[1]; i++) {
        for (var j = 0; j < this.dimensions[0]; j++) {
            var node = this.root.addChild();

            this.children.push({
                node: node,
                size: new Size(node.getDispatch()),
                pos: new Position(node.getDispatch())
            });
        }   
    }
}

function _relayoutGrid() {
    for (var i = 0; i < this.dimensions[1]; i++) {
        for (var j = 0; j < this.dimensions[0]; j++) {
            this.children[i * this.dimensions[1] + j].size.setProportional(1/this.dimensions[1], 1/this.dimensions[0]);
            this.children[i * this.dimensions[1] + j].pos.set(1/this.dimensions[1] * j * this.parentSize[0], 1/this.dimensions[0] * i * this.parentSize[1]);
        }
    }
}

function _relayoutSequential() {
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].size.setProportional(1, 1/this.children.length, 0, {duration: 1000, curve: 'linear'});
        this.children[i].pos.set(0,i * this.parentSize[1]/this.children.length, 0, {duration: 1000, curve: 'linear'});
    }
}