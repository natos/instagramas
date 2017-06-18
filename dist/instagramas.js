/*! instagramas 1.2.0 2017-06-18 */
(function(exports, global) {
    var $w = window, $d = document;
    var API_PREFIX = "https://api.instagram.com/v1/users/self/media/recent/?";
    var data = {
        "data-show-tags": {
            attributeName: "showTags",
            defaultValue: false
        },
        "data-show-tags-count": {
            attributeName: "showTagsCount",
            defaultValue: 1
        },
        "data-show-likes": {
            attributeName: "showLikes",
            defaultValue: false
        },
        "data-render-type": {
            attributeName: "renderType",
            defaultValue: "thumbnail"
        },
        "data-count": {
            attributeName: "count",
            defaultValue: 5,
            maxValue: 20
        }
    };
    var placeholderSize = {
        thumbnail: "150",
        low_resolution: "320",
        standard_resolution: "640"
    };
    var template = {
        tag: '<span class="instagrama-tag">{{tag}}</span>'
    };
    var HTMLElement = {
        _: function(c) {
            var o = {};
            for (var i = 0; i < c.length; i += 1) {
                o[c[i]] = $d.createElement(c[i]);
            }
            return o;
        }([ "div", "figure", "figcaption", "img", "a" ]),
        "new": function(e) {
            return HTMLElement._[e].cloneNode(false);
        }
    };
    function isBoolean(b) {
        return typeof b === "boolean" || typeof b === "object" && typeof b.valueOf() === "boolean";
    }
    var count = 0, done = 0;
    function serialize(obj, prefix) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }
    function load(url) {
        var script = document.createElement("script"), done = 0;
        script.src = url;
        script.async = true;
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    function get(url, params, callback) {
        var query = "";
        if (typeof params === "function" && typeof callback === "undefined") {
            callback = params;
        } else {
            query = serialize(params);
        }
        count += 1;
        var fname = "phealer" + "_" + new Date().valueOf() + count;
        window[fname] = function(response) {
            callback && callback(response);
            try {
                delete window[fname];
            } catch (e) {}
            window[fname] = null;
        };
        load(url + query + "&amp;callback=" + fname);
    }
    var Instagramas = function(element) {
        var $this = this;
        var access_token = element.getAttribute("data-access-token");
        if (access_token === undefined || access_token === null) {
            throw "Instagramas missing access token: Instagramas needs access token to fetch information from instragram.";
        } else {
            element.removeAttribute("data-access-token");
        }
        $this.element = element;
        $this.children = [];
        $this.childrenLoaded = 1;
        for (var member in data) {
            $this[data[member].attributeName] = isBoolean(data[member].defaultValue) ? element.getAttribute(member) === "true" || data[member].defaultValue : element.getAttribute(member) || data[member].defaultValue;
        }
        $this.count = parseInt($this.count > data["data-count"].maxValue ? data["data-count"].maxValue : $this.count, 10);
        var source = API_PREFIX + "count=" + $this.count + "&amp;" + "access_token=" + access_token;
        $this.create().get(source, $this.create);
    };
    Instagramas.prototype.childLoaded = function() {
        var $this = this;
        console.log("childLoaded", typeof $this.childrenLoaded, $this.childrenLoaded, "this.count", typeof $this.count, $this.count);
        if ($this.count === $this.childrenLoaded) {
            console.log("done! childrenLoaded for ", $this);
            $this.childrenLoaded = null;
            delete $this.childrenLoaded;
            return $this.ready();
        }
        $this.childrenLoaded += 1;
        return $this;
    };
    Instagramas.prototype.ready = function() {
        this.element.setAttribute("data-state", "ready");
        return this;
    };
    Instagramas.prototype.get = function(source, callback) {
        var $this = this;
        $this.element.setAttribute("data-state", "get:in-progress");
        function success(response) {
            $this.element.setAttribute("data-state", "get:success");
            callback.call($this, response);
        }
        get(source, success);
        return $this;
    };
    Instagramas.prototype.create = function(response) {
        var i;
        for (i = 0; i < this.count; i += 1) {
            var data = response && response.data && response.data[i];
            if (this.children[i] && data) {
                this.children[i].load(data);
            } else {
                this.children.push(new Instagrama(this));
            }
        }
        this.element.setAttribute("data-state", "created");
        return this;
    };
    var Instagrama = function($parent) {
        if (!$parent) {
            return this;
        }
        this.parent = $parent;
        this.element = {};
        this.render();
        return this;
    };
    Instagrama.prototype.load = function($data) {
        if (!$data) {
            return this;
        }
        this.data = $data;
        this.render();
        return this;
    };
    Instagrama.prototype.hasData = function() {
        return typeof this.data !== "undefined" && this.data;
    };
    Instagrama.prototype.render = function() {
        var $this = this;
        if (!$this.element.figure) {
            $this.element.figure = HTMLElement.new("figure");
            $this.element.figure.className = "instagrama-" + $this.parent.renderType;
            $this.element.a = HTMLElement.new("a");
            $this.element.a.target = "_blank";
            $this.element.a.className = "instagrama";
            $this.element.figure.appendChild($this.element.a);
        }
        $this.drawImage().drawLikes().drawTags();
        $this.parent.element.appendChild($this.element.figure);
        if ($this.hasData()) {
            $this.element.a.href = $this.data.link;
        }
        return $this;
    };
    Instagrama.prototype.drawImage = function() {
        var $this = this, size = 0;
        if (!$this.element.img) {
            $this.element.img = HTMLElement.new("img");
            $this.element.img.className = "placeholder";
            size = placeholderSize[$this.parent.renderType];
            if (size) {
                $this.element.img.style = [ "width:", size, "px;height:", size, "px;" ].join();
            }
            $this.element.a.appendChild($this.element.img);
        }
        if ($this.hasData()) {
            $this.element.img.setAttribute("id", "i" + $this.data.id);
            $this.element.img.setAttribute("alt", $this.data.caption.text);
            $this.element.img.setAttribute("src", $this.data.images[$this.parent.renderType].url);
            $this.element.img.onload = function() {
                $this.parent.childLoaded.apply($this.parent, arguments);
            };
        }
        return $this;
    };
    Instagrama.prototype.drawLikes = function() {
        if (!this.parent.showLikes) {
            return this;
        }
        var $this = this, likes = 0;
        if (!$this.element.likescaption) {
            $this.element.likescaption = HTMLElement.new("figcaption");
            $this.element.likescaption.className = "instagrama-likes";
            $this.element.a.appendChild($this.element.likescaption);
        }
        if ($this.hasData()) {
            $this.element.likescaption.innerHTML = $this.data.likes.count;
        }
        return $this;
    };
    Instagrama.prototype.drawTags = function() {
        if (!this.parent.showTags) {
            return this;
        }
        var $this = this;
        if (!$this.element.tagscaption) {
            $this.element.tagscaption = HTMLElement.new("figcaption");
            $this.element.tagscaption.className = "instagrama-tags";
            $this.element.a.appendChild($this.element.tagscaption);
        }
        if ($this.hasData()) {
            var tags = "", i, t = $this.parent.showTagsCount || $this.data.tags.length;
            for (i = 0; i < t; i += 1) {
                if (!$this.data.tags[i]) {
                    continue;
                }
                tags += template.tag.replace("{{tag}}", $this.data.tags[i]);
            }
            $this.element.tagscaption.innerHTML = tags;
        }
        return $this;
    };
    var context = this;
    function _r(f) {
        /in/.test(document.readyState) ? setTimeout(function() {
            _r.call(context, f);
        }, 9) : f.call(context);
    }
    var instagramas = $d.querySelectorAll(".instagramas");
    if (instagramas !== undefined || instagramas !== null) {
        var namespace = $w._instagramas_namespace || "_Instagramas";
        $w._instagramas_namespace = namespace;
        $w[namespace] = {
            collection: []
        };
        _r(function start() {
            for (var i = 0; i < instagramas.length; i += 1) {
                $w[namespace].collection.push(new Instagramas(instagramas[i]));
            }
        });
    }
    global["true"] = exports;
})({}, function() {
    return this;
}());
//# sourceMappingURL=instagramas.min.js.map