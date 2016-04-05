# Instagramas v1.0.0

_This is a work in progress use at own risk_

Instagramas will render a list of your latest instagrams. This version comes packed with jQuery's ajax module from version 1.11.1 (details ```"1.11.1 -css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-dimensions,-offset,-deprecated,-event-alias,-wrap"```).
The bundle will execute with ```jQuery.noConflict``` function to leave ```window.$``` namespace free for any other version you are currently running. This particular version will be hosted in ```window.jQuery``` so is accesible by Instagramas.js

## Properties

List of properties:

*data-access-token*
Mandatory Instagram API Access Token
    ```data-access-token _string_```

*data-show-tags*
Optional when show tags is true will render a list of tags
    ```data-show-tags _bool_```

*data-show-tags-count*
Optional integer that defines how many tags will render
    ```data-show-tags-count _int_```

*data-show-likes*
Optional when show likes is true will render likes counter
    ```data-show-likes _bool_```

*data-render-type*
Optional render type defines the size of the Instagram, is thumbnail by default
    ```data-render-type _string_ "thumbnail|low_resolution|standard_resolution"```

*data-count*
Optional how many Instagram will show, 5 by default
    ```data-count _int_```

### Usage

Minimal
```html
<div
    class="instagramas"
    data-access-token="INSERT_ACCESS_TOKEN_HERE"
></div>
```

Full
```html
<div
    class="instagramas"
    data-show-tags="true"
    data-show-tags-count="1"
    data-show-likes="true"
    data-render-type="thumbnail"
    data-access-token="INSERT_ACCESS_TOKEN_HERE"
    data-count="21"
></div>
```

See test page for more examples.

### Author

    Natan Santolo (@natos)

### Unlicense

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>