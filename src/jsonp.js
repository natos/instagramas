/*!
 * jsonp.js
 */

(function(window, document) {

    'use strict';

    var count = 0;

    function serialize(obj, prefix) {

        var str = [];
        for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push(typeof v == "object" ?
                    serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    function load(url) {

        var script = document.createElement('script'),
        done = 0;
        script.src = url;
        script.async = true;
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if ( script && script.parentNode ) {
                    script.parentNode.removeChild( script );
                }
            }
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function get(url, params, callback) {
        var query = '';
        if (typeof params === 'function' && typeof callback === 'undefined') {
            callback = params;
        } else {
            query = serialize(params);
        }
        count += 1;
        var fname = 'phealer' + '_' + new Date().valueOf() + count;
        window[fname] = function (response) {
            callback && callback(response);
            try {
                delete window[fname];
            } catch (e) {}
            window[fname] = null;
        }
        load(url + query + "&amp;callback=" + fname);
    }

    window.jsonp = {
        get: get
    };

}(window, document));