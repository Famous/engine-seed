import {Famous, Context} from 'famous-core';
import {HTMLElement} from 'famous-dom-renderables';

var root = new Context('body');
var node = root.addChild();
var el = new HTMLElement(node.getDispatch());

var windowProxy = Famous.proxy('window');

windowProxy.invoke('addEventListener', ['mousemove', function(ev) {
    el.property('background-color', 'rgb(' + (ev.x % 255) + ', ' + (ev.y % 255) + ', ' + 0 + ')');
}]);

windowProxy.invoke('addEventListener', ['click', function(ev) {
    windowProxy.invoke('alert', ['Click!']);
}]);
