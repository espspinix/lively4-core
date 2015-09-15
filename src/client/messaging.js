define(function(require, exports, module) {
    "use strict";

    var also = function(obj, prop, cb) {
        var previousFunction = obj[prop];
        if(previousFunction) {
            obj[prop] = function() {
                previousFunction.apply(obj, arguments);
                cb.apply(obj, arguments);
            }
        } else {
            obj[prop] = cb;
        }
    };

    module.exports = {
        /**
         * Send a message to the ServiceWorker and waits for an answer
         * @param message
         * @returns {Promise} A Promise resolving with the answer from the ServiceWorker
         */
        postMessage: function(message) {
            return new Promise(function(resolve, reject) {
                var channel = new MessageChannel();
                function handleMessage(e) {
                    console.log(e);
                    console.log('WHHHHHHAAAAAAAAAATTTTT???????');
                    resolve(e);
                }

                also(window, 'onerror', function(error) {
                    console.error(error);
                });
                also(window, 'onmessage', handleMessage);
                also(navigator.serviceWorker, 'onmessage', handleMessage);
                also(channel.port1, 'onmessage', handleMessage);

                console.log(channel);
                console.log(channel.port1);
                console.log(navigator);
                console.log(navigator.serviceWorker);
                console.log(navigator.serviceWorker.controller);
                navigator.serviceWorker.controller.postMessage(message, [channel.port2])
            });
        }
    };
});
