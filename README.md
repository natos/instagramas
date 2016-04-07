# Instagramas v1.1.1

Instagramas will render a list of your latest instagrams.

![Instagramas](https://raw.githubusercontent.com/natos/instagramas/master/test/instagramas.png)

## Properties

List of properties:

* ```data-access-token {string}```  *Mandatory* Instagram API Access Token

* ```data-show-tags {bool}```   Optional when show tags is true will render a list of tags, false by default

* ```data-show-tags-count {int}```  Optional integer that defines how many tags will render, all by default

* ```data-show-likes {bool}```    Optional when show likes is true will render likes counter, false by default

* ```data-render-type {string}``` Optional values ```"thumbnail|low_resolution|standard_resolution"```, thumbnail by default

* ```data-count {int}```  Optional how many Instagram will show, 5 by default

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

[See test page for more examples](http://natos.github.io/instagramas/).

### Author

    natansantolo.com

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
