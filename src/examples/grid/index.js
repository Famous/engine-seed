import {Size, Position} from 'famous-components';
import {Context} from 'famous-core';
import {HTMLElement} from 'famous-dom-renderables';
import {Grid} from './grid';

var root = new Context('body');

var grid = new Grid(root.addChild(), {
    dimensions: [2, 2],
    verticalGutter: 10,
    horizontalGutter: 20,
    padding: 50
});


var colors = ['red', 'blue', 'green', 'yellow'];
var el;
for (var i = 0; i < 4; i++) {
    el = new HTMLElement(grid.get(i).getDispatch());
    el.property('backgroundColor', colors[i]);
}
