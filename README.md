# grunt-captain

> Static site generator for prototyping front-end projects

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

### Overview
In your project's Gruntfile, add a section named `captain` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  captain: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.data
Type: `Object`
Default value: `{}`

A global data object which is passed to all page templates.


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

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
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Jan Panschab. Licensed under the MIT license.
