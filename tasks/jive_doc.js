/*
 * grunt-jive-doc
 * https://github.com/adipatl/grunt-jive-doc
 *
 * Copyright (c) 2018 Adipat Larprattanakul
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('jive_doc', 'Grunt plugin for JIVE Document API', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var opts = this.options({
            clientId: '2',
            clientSecret: '',
            refreshToken: '',
            tokenUrl: '',
            url: '',
            file: '',
            // Opts data >> same as https://developers.jivesoftware.com/api/v3/cloud/rest/DocumentEntity.html
            jive_opts: {
                content:
                    {
                        type: "text/html",
                        text: "Hello World"
                    },
                subject: "New Document",
                type: "document"
            }
        });

        if (!opts.clientId.length) {
            grunt.fail.fatal('JIVE Client ID is not specified');
            return;
        }

        if (!opts.clientSecret.length) {
            grunt.fail.fatal('JIVE Client Secret is not specified');
            return;
        }

        if (!opts.refreshToken.length) {
            grunt.fail.fatal('JIVE Refresh Token is not specified');
            return;
        }

        if (!opts.tokenUrl.length) {
            grunt.fail.fatal('JIVE Token URL is not specified');
            return;
        }

        if (!opts.url.length) {
            grunt.fail.fatal('JIVE URL is not specified');
            return;
        }

        if (opts.file.length) {
            if (require('fs').existsSync(opts.file) === false) {
                grunt.fail.fatal('Given File Path (' + opts.file + ') is not existed');
            }
        }

        // get token from curl
        var done = this.async();

        var request = require('request');
        var authString = "Basic " + new Buffer(opts.clientId + ":" + opts.clientSecret).toString("base64");
        var bodyString = 'grant_type=refresh_token&refresh_token=' + opts.refreshToken;
        request.post({
            headers: {
                'content-type' : 'application/x-www-form-urlencoded',
                'Authorization': authString
            },
            url: opts.tokenUrl,
            body: bodyString
        }, function(error, response, body){
            grunt.log.debug('error: ' + error);
            grunt.log.debug('response status code: ' + response.statusCode);
            grunt.log.debug('response status message: ' + response.statusMessage);
            grunt.log.debug('token response: ' + body);

            var tokenObj;
            if (body) {
                try {
                    tokenObj = JSON.parse(body);
                } catch(e) {
                    grunt.fail.fatal("Invalid response from authenticating with given refresh token");
                    grunt.log.debug(e);
                }
            }

            var accessToken = tokenObj.access_token;

            var fileContent = opts.file.length ? grunt.file.read(opts.file) : "";
            if (fileContent.length) {
                if (!opts.jive_opts.content) {
                    opts.jive_opts.content = {};
                    opts.jive_opts.content.text = "";
                }

                opts.jive_opts.content.text = fileContent;
            }

            var bodyRequest = JSON.stringify(opts.jive_opts);

            request.post({
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                url: opts.url + 'contents',
                body: bodyRequest
            }, function(err, r, body){
                grunt.log.debug('error: ' + error);
                grunt.log.debug('response status code: ' + response.statusCode);
                grunt.log.debug('response status message: ' + response.statusMessage);
                grunt.log.debug('token response: ' + body);
                if (body) {
                    var result = JSON.parse(body);
                    if (result) {
                        if (result.error) {
                            grunt.fail.fatal("\nJIVE Error Code: " + result.error.status + "\n" + "JIVE Error Message: " + result.error.message);
                        }

                        if (result.resources && result.resources.html && result.resources.html.ref) {
                            grunt.log.ok('JIVE Document is created at ' + result.resources.html.ref);
                        }
                    }
                }
                done();
            });

        });

        grunt.log.debug(JSON.stringify(opts));

    });

};
