# grunt-jive-doc

Grunt plugin for JIVE Document API. 

Supported features
- Create new document via [JIVE Contents API](https://developers.jivesoftware.com/api/v3/cloud/rest/DocumentEntity.html)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jive-doc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jive-doc');
```

## The "jive_doc" task

### Overview
In your project's Gruntfile, add a section named `jive_doc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jive_doc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Pre-requisite
To use this library, you need to obtain Client Id, Client Secret and Refresh Token from your JIVE Admins before

### Options

#### options.clientId
Type: `String`
Default value: `''`

JIVE OAUTH2 Client ID

#### options.clientSecret
Type: `String`
Default value: `''`

JIVE OAUTH2 Client Secret

#### options.refreshToken
Type: `String`
Default value: `''`

JIVE OAUTH2 Refresh Token

#### options.tokenUrl
Type: `String`
Default value: `''`

JIVE Token URL for obtaining the access token

#### options.url
Type: `String`
Default value: `''`

JIVE API URL

#### options.file [Optional]
Type: `String`
Default value: `''`

Path to file to upload to jive

#### options.jive_opts [Optional]
Type: `Object`
Default value: ``

JIVE Fields - same as [JIVE Fields](https://developers.jivesoftware.com/api/v3/cloud/rest/DocumentEntity.html)

### Usage Examples

#### Create new document from html content

```js
grunt.initConfig({
    jive_doc: {
        default_options: {
            options: {
                clientId: '[CLIENT ID]',
                clientSecret: '[CLIENT SECRET]',
                refreshToken: '[REFRESH TOKEN]',
                tokenUrl: '[TOKEN URL]',
                url: '[JIVE URL]',
                jive_opts: {
                    content : {
                        type : "text/html",
                        text : "<p>Some interesting document text</p>"
                    },
                    subject: "Hello World",
                    type: "document"
                }
            }
        }
    },
});
```

#### Create new document from html file

```js
grunt.initConfig({
    jive_doc: {
        default_options: {
            options: {
                clientId: '[CLIENT ID]',
                clientSecret: '[CLIENT SECRET]',
                refreshToken: '[REFRESH TOKEN]',
                tokenUrl: '[TOKEN URL]',
                url: '[JIVE URL]',
                file: 'hello_world.html',
                jive_opts: {
                    subject: "Hello World",
                    type: "document"
                }
            }
        }
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 First version
