/*
 * css-spliter
 *
 *
 * Copyright (c) 2016 xiaoweili@tencent.com
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');

var CssMediaSpliter = function(option) {
  var mediaCss = {}, cleanCss, cssName,

  readCss = function(input, src) {
    var reg = new RegExp(/[\n]/g);
    cleanCss = input.replace(reg, '');
    cssName = path.basename(src, '.css');
    return getMediaRule();
  },

  getMediaRule = function() {
    var reg = new RegExp(/(@media)([\s\S]*?)(}[\n]*})/g), key, rule = cleanCss.match(reg);
    for(var i = 0; i < rule.length; i++) {
      key = _getKey(rule[i]);
      //不是屏幕适配不处理，规则小于1k不处理
      if(key.indexOf('width') <= 0 || rule[i].length < 1024) {
        continue;
      }
      cleanCss = cleanCss.replace(rule[i], '');
      mediaCss[key] = mediaCss[key] ? mediaCss[key] + rule[i] : rule[i];
    }
    //console.log(cleanCss);
    mediaCss[cssName] = cleanCss;
    return mediaCss;
    function _getKey(str) {
      return cssName + '--' + str.substring(0, str.indexOf('{')).
          replace(/\s/g, '_').
          replace(/:/g, '=').
          replace(/,/g, 'or').
          replace(/[()@]/g, '');
    }
  };

  return {
    readCss: readCss
  }

};
module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('css_media_spliter', function () {
    var option = this.options({}), input, filepath, cssMediaSpliter = new CssMediaSpliter(), cssRule;
    grunt.file.defaultEncoding = 'utf8';
    this.files.forEach(function(file) {
      file.src.forEach(function(src) {
        input = grunt.file.read(src);
        cssRule = cssMediaSpliter.readCss(input, src);
        for(var key in cssRule) {
          filepath = option.dist + key + '.css';
          grunt.file.write(filepath, cssRule[key]);
        }
      });
    });
  });
};
