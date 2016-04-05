/**
 * Instagrams.js
 *
 * Renders latest instagramas
 * @require jquery
 */

(function(window, document) {

    'use strict';

    // local copy of jQuery
    var $ = window.jQuery.noConflict();

    if (!$) {
        throw("Instagramas missing dependency: Instagramas needs jQuery.");
    }

    var defaults = {
        showTags: false,
        showLikes: false,
        render: "thumbnail",
        count: 5
    }

    /**
     * @class Instagramas
     * @param DOMElement Container of Instagramas
     * @return Instagramas
     */

    var Instagramas = function(element) {
        var $this = this;
        $this.element = element;
        $this.children = [];
        $this.childrenLoaded = 1;
        $this.showTags = element.getAttribute('data-show-tags') === "true" || defaults.showTags;
        $this.showTagsCount = element.getAttribute('data-show-tags-count');
        $this.showLikes = element.getAttribute('data-show-likes') === "true" || defaults.showLikes;
        $this.renderType = element.getAttribute('data-render-type') || defaults.render;
        $this.count = element.getAttribute('data-count') || defaults.count;
        $this.accessToken = element.getAttribute('data-access-token');
        if ($this.accessToken === undefined || $this.accessToken === null) {
            throw ("Instagramas missing accessToken: Instagramas needs accessToken to fetch instragrams.");
            return $this;
        }
        // clean access token data
        element.removeAttribute('data-access-token');

        $this.source = 'https://api.instagram.com/v1/users/self/media/recent/?'
            + 'count=' + $this.count + '&amp;'
            + 'access_token=' + $this.accessToken;

        $this.loader = document.createElement('div');
        $this.loader.className = 'loader';
        $this.loader.innerHTML = '<div class="spinner"><div class="dot1"></div><div class="dot2"></div></div>';

        $this.element.appendChild($this.loader);
        $this.element.setAttribute('data-state', 'initiated');

        $this.get().success(function(response) {
          $this.create.call($this, response);
        });
    };
    /**
     * @method childLoaded
     * @return this
     */
    Instagramas.prototype.childLoaded = function() {
        var $this = this;
        if ($this.children.length === $this.childrenLoaded) {
            $this.childrenLoaded = null;
            return $this.ready();
        }
        $this.childrenLoaded += 1;
        return $this;
    };
    /**
     * @method ready
     * @return this
     */
    Instagramas.prototype.ready = function() {
        var $this = this;
            $this.element.setAttribute('data-state', 'ready');
            $this.element.removeChild($this.loader);
        return $this;
    }
    /**
     * @method get
     * @return promise
     */
    Instagramas.prototype.get = function() {
        var $this = this;
        $this.element.setAttribute('data-state', 'get:in-progress');
        return $.ajax({
            url: $this.source,
            method: 'get',
            dataType: 'jsonp',
            success: function(response) {
                $this.element.setAttribute('data-state', 'get:success');
            },
            error: function(error) {
                $this.element.setAttribute('data-state', 'get:error');
                throw (error);
            }
        });
    }

    Instagramas.prototype.create = function(response) {
        var $this = this;
        var i;
        if (!response.data) { return; }
        for (i = 0; i < response.data.length; i += 1) {
            $this.children.push(new Instagrama(response.data[i], $this));
        }
        $this.element.setAttribute('data-state', 'created');
    };


    /**
     * @class Instagrama
     * @param $data API Response
     * @return Instagrama
     */

    var Instagrama = function($data, $parent) {

        if (!$data) {
            return this;
        }

        var $this = this;
        $this.parent = $parent;
        $this.data = $data;
        $this.render();

        return $this;
    };

    Instagrama.prototype.render = function() {

        var $this = this,
            figure,
            tagscaption,
            likescaption,
            a, i, t, img,
            tags = '',
            likes = 0;

        figure = document.createElement('figure');
        figure.className = 'instagrama-' + $this.data.type;

        a = document.createElement('a');
        a.target = '_blank';
        a.className = 'instagrama';
        a.href = $this.data.link;
        figure.appendChild(a);

        img = document.createElement('img');
        img.alt = $this.data.caption.text;
        img.src = $this.data.images[$this.parent.renderType].url;
        // img.src = $this.data.images.low_resolution.url;
        img.onload = function() {
          $this.parent.childLoaded.apply($this.parent, arguments);
        };
        a.appendChild(img);

        // likes
        if ($this.parent.showLikes) {
            likescaption = document.createElement('figcaption');
            likescaption.className = 'instagrama-likes';
            likescaption.innerHTML = $this.data.likes.count;
            a.appendChild(likescaption);
        }

        // collect tags
        if ($this.parent.showTags) {
            var tagTemplate = '<span class="instagrama-tag">{{tag}}</span>';
            var t = $this.parent.showTagsCount || $this.data.tags.length;
            for (i = 0; i < t; i += 1) {
                if (!$this.data.tags[i]) {
                    continue;
                }
                tags += tagTemplate.replace('{{tag}}', $this.data.tags[i]);
            }

            tagscaption = document.createElement('figcaption');
            tagscaption.className = 'instagrama-tags';
            tagscaption.innerHTML = tags;
            a.appendChild(tagscaption);
        }

        $this.parent.element.appendChild(figure);

        return $this;
    };

    var instagramas = document.querySelectorAll('.instagramas');
    if (instagramas === undefined || instagramas === null) {
        return;
    }

    window.instagramas = {
        collection: []
    };

    /** start */

    document.addEventListener("DOMContentLoaded", function start() {
        for (var i = 0; i < instagramas.length; i += 1) {
            window.instagramas.collection.push(new Instagramas(instagramas[i]));
        }
    });

}(window, document));