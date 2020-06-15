# vue-long-press-directive

Long press directive plugin for Vue.js. See the [live demo](https://jcharante.com/vue-long-press-directive/demo) (default setting of 2000ms).

    npm install @jcharante/vue-long-press-directive

## Usage

Register the plugin with Vue. It's possible to specify the press duration in the options object.

```javascript
var Vue = require('vue')
var longpress = require('@jcharante/vue-long-press-directive')

Vue.use(longpress, { duration: 1000 })
```

The directive can now be used in a template.

```html
<button v-long-press='onlongpress'>Press and hold</button>
```

If you want to pass arguments, you're going to need to wrap the function so it doesn't get called immediately.

```html
<button v-long-press="(() => { onlongpress(1) })">Button 1</button>
<button v-long-press="(() => { onlongpress(2) })">Button 2</button>
```

DO NOT DO

```html
<button v-long-press="onlongpress(1)">Button 1</button>
```

because your function will get called a bunch of times without being long pressed.
