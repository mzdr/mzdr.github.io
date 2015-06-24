/*! perspectify.js 1.0.0 @herrprein */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['perspectify'], function (perspectify) {
            return (root.returnExportsGlobal = factory(perspectify));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('perspectify'));
    } else {
        // Browser globals
        root.returnExportsGlobal = factory(root.perspectify);
    }
}(this, function (perspectify) {

    /**
     * [shiftProperty description]
     *
     * @type {String}
     */
    var shiftProperty = 'transform';

    /**
     * Get vendor prefix for shifting property.
     *
     * @type {HTMLElement}
     */
    var tmpElement = document.createElement('div');

    ['transform', 'msTransform', 'MozTransform', 'WebkitTransform', 'OTransform'].some(function (prefix) {
        if (prefix in tmpElement.style) {
            return shiftProperty = prefix;
        }
    });

    /**
     * [getNode description]
     * @param  {[type]} data [description]
     * @return {HTMLElement|null}      [description]
     */
    var getNode = function (data) {
        if (typeof data === 'string') {
            return document.querySelector(data);
        } else if (false === (data instanceof HTMLElement)) {
            return null;
        }

        return data;
    };

    /**
     * Perspectify a given node or selector element.
     *
     * @param {string|HTMLElement} node Primary node to perspectify.
     * @param {string|HTMLElement} supportingNode Supporting node to enhance the effects.
     */
    var perspectify =  function (node, supportingNode) {

        /**
         * Mouse X position.
         *
         * @type {Number}
         */
        var mouseX = 0;

        /**
         * Mouse Y position.
         *
         * @type {Number}
         */
        var mouseY = 0;

        /**
         * Amount of rotation.
         *
         * @type {Number}
         */
        var rotate = 25;

        if ((node = getNode(node)) === null) {
            return;
        }

        supportingNode = getNode(supportingNode);

        window.addEventListener('mousemove', function (event) {
            mouseX = event.pageX;
            mouseY = event.pageY;
            rotateX = (window.innerWidth / 2 - mouseX) / window.innerWidth * rotate;
            rotateY = -(window.innerHeight / 2 - mouseY) / window.innerHeight * rotate;

            node.style.perspectiveOrigin = '50% 50%';
            node.style[shiftProperty] = 'translate(-50%, -50%) perspective(1960px) rotateY(' + rotateX + 'deg) rotateX(' + rotateY + 'deg)';

            if (supportingNode) {
                supportingNode.style.backgroundPosition = rotateX + 'px ' + rotateY + 'px';
            }
        });
    }

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return { perspectify: perspectify };
}));
