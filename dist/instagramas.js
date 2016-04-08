/*! instagramas 1.1.1 2016-04-08 */
(function(a, b) {
    var c = window, d = document;
    var e = "https://api.instagram.com/v1/users/self/media/recent/?";
    var f = {
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
            defaultValue: 5
        }
    };
    var g = {
        tag: '<span class="instagrama-tag">{{tag}}</span>',
        loader: '<div class="spinner"><div class="dot1"></div><div class="dot2"></div></div>'
    };
    var h = {
        _: function(a) {
            var b = {};
            for (var c = 0; c < a.length; c += 1) {
                b[a[c]] = d.createElement(a[c]);
            }
            return b;
        }([ "div", "figure", "figcaption", "img", "a" ]),
        "new": function(a) {
            return h._[a].cloneNode(false);
        }
    };
    function i(a) {
        return typeof a === "boolean" || typeof a === "object" && typeof a.valueOf() === "boolean";
    }
    var j = function(a) {
        var b = this;
        var c = a.getAttribute("data-access-token");
        if (c === undefined || c === null) {
            throw "Instagramas missing access token: Instagramas needs access token to fetch information from instragram.";
        } else {
            a.removeAttribute("data-access-token");
        }
        b.element = a;
        b.children = [];
        b.childrenLoaded = 1;
        for (var d in f) {
            b[f[d].attributeName] = i(f[d].defaultValue) ? a.getAttribute(d) === "true" || f[d].defaultValue : a.getAttribute(d) || f[d].defaultValue;
        }
        var j = e + "count=" + b.count + "&amp;" + "access_token=" + c;
        b.loader = h.new("div");
        b.loader.className = "loader";
        b.loader.innerHTML = g.loader;
        b.element.appendChild(b.loader);
        b.element.setAttribute("data-state", "initiated");
        b.get(j, b.create);
    };
    j.prototype.childLoaded = function() {
        var a = this;
        if (a.children.length === a.childrenLoaded) {
            a.childrenLoaded = null;
            delete a.childrenLoaded;
            return a.ready();
        }
        a.childrenLoaded += 1;
        return a;
    };
    j.prototype.ready = function() {
        var a = this;
        a.element.setAttribute("data-state", "ready");
        a.element.removeChild(a.loader);
        return a;
    };
    j.prototype.get = function(a, b) {
        var c = this;
        c.element.setAttribute("data-state", "get:in-progress");
        function d(a) {
            c.element.setAttribute("data-state", "get:success");
            b.call(c, a);
        }
        return jsonp.get(a, d);
    };
    j.prototype.create = function(a) {
        var b = this;
        var c;
        if (!a.data) {
            return;
        }
        for (c = 0; c < a.data.length; c += 1) {
            b.children.push(new k(a.data[c], b));
        }
        b.element.setAttribute("data-state", "created");
    };
    var k = function(a, b) {
        if (!a) {
            return this;
        }
        var c = this;
        c.parent = b;
        c.data = a;
        c.render();
        return c;
    };
    k.prototype.render = function() {
        var a = this, b, c, d, e, f, i, j, k = "", l = 0;
        b = h.new("figure");
        b.className = "instagrama-" + a.data.type;
        e = h.new("a");
        e.target = "_blank";
        e.className = "instagrama";
        e.href = a.data.link;
        b.appendChild(e);
        j = h.new("img");
        j.alt = a.data.caption.text;
        j.src = a.data.images[a.parent.renderType].url;
        j.onload = function() {
            a.parent.childLoaded.apply(a.parent, arguments);
        };
        e.appendChild(j);
        if (a.parent.showLikes) {
            d = h.new("figcaption");
            d.className = "instagrama-likes";
            d.innerHTML = a.data.likes.count;
            e.appendChild(d);
        }
        if (a.parent.showTags) {
            i = a.parent.showTagsCount || a.data.tags.length;
            for (f = 0; f < i; f += 1) {
                if (!a.data.tags[f]) {
                    continue;
                }
                k += g.tag.replace("{{tag}}", a.data.tags[f]);
            }
            c = h.new("figcaption");
            c.className = "instagrama-tags";
            c.innerHTML = k;
            e.appendChild(c);
        }
        a.parent.element.appendChild(b);
        return a;
    };
    var l = d.querySelectorAll(".instagramas");
    if (l !== undefined || l !== null) {
        var m = c._instagramas_namespace || "_Instagramas";
        c[m] = {
            collection: []
        };
        d.addEventListener("DOMContentLoaded", function r() {
            for (var a = 0; a < l.length; a += 1) {
                c[m].collection.push(new j(l[a]));
            }
        });
    }
    var n = 0;
    function o(a, b) {
        var c = [];
        for (var d in a) {
            if (a.hasOwnProperty(d)) {
                var e = b ? b + "[" + d + "]" : d, f = a[d];
                c.push(typeof f == "object" ? o(f, e) : encodeURIComponent(e) + "=" + encodeURIComponent(f));
            }
        }
        return c.join("&");
    }
    function p(a) {
        var b = document.createElement("script"), c = 0;
        b.src = a;
        b.async = true;
        b.onload = b.onreadystatechange = function() {
            if (!c && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                c = true;
                b.onload = b.onreadystatechange = null;
                if (b && b.parentNode) {
                    b.parentNode.removeChild(b);
                }
            }
        };
        document.getElementsByTagName("head")[0].appendChild(b);
    }
    function q(a, b, c) {
        var d = "";
        if (typeof b === "function" && typeof c === "undefined") {
            c = b;
        } else {
            d = o(b);
        }
        n += 1;
        var e = "phealer" + "_" + new Date().valueOf() + n;
        window[e] = function(a) {
            c && c(a);
            try {
                delete window[e];
            } catch (b) {}
            window[e] = null;
        };
        p(a + d + "&amp;callback=" + e);
    }
    window.jsonp = {
        get: q
    };
    b["true"] = a;
})({}, function() {
    return this;
}());
//# sourceMappingURL=instagramas.min.js.map