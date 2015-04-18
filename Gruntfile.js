'use strict';

module.exports = function (grunt) {
  var loadGruntConfig = require('load-grunt-config');
  var pkg = grunt.file.readJSON('package.json');

  if (grunt.option('time')) {
    require('time-grunt')(grunt);
  }

  loadGruntConfig(grunt, {
    jitGrunt: {
      staticMappings: {
        devUpdate: 'grunt-dev-update',
        'bump-only': 'grunt-bump',
        'bump-commit': 'grunt-bump'
      }
    },
    data: {
      pkg: pkg,
      bower: grunt.file.readJSON('bower.json'),

      /**
       * Dumb little function to generate a foo.min.xxx filename from foo.xxx
       * @param {string} filepath Filepath
       * @returns {string} Minified filepath
       */
      min: function min(filepath) {
        var path = require('path');
        var ext = path.extname(filepath);
        return path.basename(filepath, ext) + '.min' + ext;
      },
      author: typeof pkg.author === 'string' ? pkg.author :
        [pkg.author.name, pkg.author.email].join(' ')
    }
  });
};
