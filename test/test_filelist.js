/*
 * @package jsDAV
 * @subpackage DAV
 * @copyright Copyright(c) 2011 Ajax.org B.V. <info AT ajax.org>
 * @author Ruben Daniels <ruben AT c9 DOT io>
 * @license http://github.com/mikedeboer/jsDAV/blob/master/LICENSE MIT License
 */
"use strict";

var assert = require("assert");
var jsDAV  = require("./../lib/jsdav");
var jsDAV_Filelist_Plugin = require("./../lib/DAV/plugins/filelist");

jsDAV.debugMode = true;

module.exports = {
    timeout: 30000,

    setUpSuite: function(next) {
        this.plugin = new jsDAV_Filelist_Plugin({
            addEventListener : function(){}
        });
        next();
    },

    tearDownSuite: function(next) {
        
        next();
    },

    "test retrieving a file list": function(next) {
        this.plugin.doFilelist({path: "./"}, {}, function(err, out){
            assert.ok(out.indexOf("test_filelist.js") > -1);
            
            next();
        });
    },
    
    "test retrieving a file list including hidden files": function(next) {
        this.plugin.doFilelist({path: "../"}, {
            showHiddenFiles: "1"
        }, function(err, out){
            assert.ok(out.indexOf(".gitignore") > -1);
            
            next();
        });
    }
};

process.on("exit", function() {
    if (module.exports.conn)
        module.exports.conn.end();
});

!module.parent && require("./../node_modules/asyncjs/lib/test").testcase(module.exports).exec();
