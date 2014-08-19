'use strict';

var gutil    = require('gulp-util');
var through2 = require('through2');
var exec     = require('child_process').exec;

var voice;
var say   = ['ho','yo','wow','yeah'];

module.exports = function ( options ) {

    if( options ){
        say   = options.list  ? options.list : say;
        voice = options.voice ? options.voice : voice;
    }

    function transform( file, encoding, callback ){
        callback();
    }

    function flush(callback){
        var what = say[ Math.round( Math.random()*(say.length-1) ) ];
        if( voice ){
            exec( ['say -v',voice,what].join(" ") );
        }else{
            exec( ['say',what].join(" ") );
        }
        callback();
    }

    return through2.obj(transform,flush);

};
