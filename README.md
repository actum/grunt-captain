# grunt-captain

> Static site generator for prototyping front-end projects

## How it works
Captain uses [Swig](http://paularmstrong.github.io/swig/) as a template engine and adds some SSG functionality. You can pass data to the template directly from template with JSON front matter syntax or from global grunt config.

```html
{{{
    title: 'Homepage',
    homepage: true
}}}

<h1>{{ title }}</h1>
{% if homepage %}
<p>This is homepage</p>
{% endif %}
```

More about swig templates in [documentation](http://paularmstrong.github.io/swig/docs/).

You can also import data from JSON file:

```html
require('../data/require-data.json');

<h1>{{ title }}</h1>
{% if homepage %}
<p>This is homepage</p>
{% endif %}
```

All JSON data are parsed with [JSON5](http://json5.org/) package so you can use features like unquoted keys, strings can be single-quoted, objects and arrays can have trailing commas, comments.

### Utils
Util Object is injected into all templates.

#### $.pages
Type: `Array`

List of all pages path.
```html
<ul>
    {% for path in $.pages %}
    <li><a href="{{path}}">{{path}}</a></li>
    {% endfor %}
</ul>
```

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-captain --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-captain');
```

## The "captain" task
_Run this task with the `grunt catain` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) guide.

### Options

#### data
Type: `Object`
Default: `{}`

A global data object which is passed to all page templates.


### Usage Examples

#### Default Options
In this example, `.swig` templates from `tpl/page/` are compiled to `.html` files.

```js
grunt.initConfig({
  captain: {
    compile: {
      files: [{
        expand: true, // Enable dynamic expansion.
        cwd: 'tpl/page/', // Src matches are relative to this path.
        src: ['*.swig'], // Actual pattern(s) to match.
        dest: 'www/', // Destination path prefix.
        ext: '.html', // Dest filepaths will have this extension.
        extDot: 'first' // Extensions in filenames begin after the first dot
      }]
    }
  }
})
```

#### Custom Options
In this example, we set global data option `env.dev` for differences between production and development build.

```js
grunt.initConfig({
  captain: {
    options: {
      data: {
          env: {
              dev: true
          }
      }
    },
    files: [{
      expand: true, // Enable dynamic expansion.
      cwd: 'tpl/page/', // Src matches are relative to this path.
      src: ['*.swig'], // Actual pattern(s) to match.
      dest: 'www/', // Destination path prefix.
      ext: '.html', // Dest filepaths will have this extension.
      extDot: 'first' // Extensions in filenames begin after the first dot
    }]
  }
})
```

## Release History
* 2015-05-15    0.1.1   replace lodash dependency with lodash.merge
* 2015-05-19    0.2.0   added util ($) object with prefilled $.pages Array to all templates, remove caching (for watchers)

---

Task submitted by [Jan Panschab](https://github.com/janpanschab)

## License
Copyright (c) 2015 Actum. Licensed under the MIT license.
