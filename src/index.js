(function(factory) {
    "use strict";
    
    if(typeof define === "function" && define["amd"]) {
        define(["RBush","SAT","EventEmitter"], factory);
    }
    else if(typeof exports === "object") {
        module.exports = factory(require("rbush"), require("sat"), require("last-eventemitter"));
    }
    else {
        window.Crash = factory(window.rbush, window.SAT, window.EventEmitter);
    }
    
}(function(RBush, SAT, EventEmitter) {
    "use strict";
    
    
    
    /*************
     * VARIABLES *
     * UTILITIES *
     *************/
    
    var RESPONSE = new SAT.Response();
    var BREAK = false;
    
    var extend = function(child, base) {
        child.prototype = new base();
    }
    
    var getTestString = function(type1, type2) {
        return type1 === "circle" ? (
            type2 === "circle" ? "testCircleCircle" : "testCirclePolygon"
        ) : (
            type2 === "circle" ? "testPolygonCircle" : "testPolygonPolygon"
        )
    }
    
    var cancel = function() {
        BREAK = true;
        return false;
    }
    
    
      /****************
       * AABB UPDATES *
       ****************/
    
    
    var updateAABB = function(collider) {
        switch(collider.type) {
            case "polygon":
                return updateAABBPolygon(collider);
                break;
            case "box":
                return updateAABBBox(collide);
                break;
            case "circle":
                return updateAABBCircle(collider);
                break;
            case "point":
                return updateAABBPoint(collider);
                break;
        }
    }
    
    var updateAABBPolygon = function(collider) {
        var aabb = collider.aabb;
        var pos = collider.sat.pos;
        var points = collider.sat.calcPoints;
        var len = points.length;
        var xMin = points[0].x;
        var yMin = points[0].y;
        var xMax = points[0].x;
        var yMax = points[0].y;
        for (var i = 1; i < len; i++) {
            var point = points[i];
            if (point.x < xMin) {
                xMin = point.x;
            }
            else if (point.x > xMax) {
                xMax = point.x;
            }
            if (point.y < yMin) {
                yMin = point.y;
            }
            else if (point.y > yMax) {
                yMax = point.y;
            }
        }
        
        aabb.x1 = pos + xMin;
        aabb.y1 = pos + yMin;
        aabb.x2 = pos + xMax;
        aabb.y2 = pos + yMax;
    }
    
    var updateAABBBox = function(collider) {
        var points = collider.sat.calcPoints;
        var aabb = collider.aabb;
        
        aabb.x1 = points[0].x;
        aabb.y1 = points[0].y;
        aabb.x2 = points[2].x;
        aabb.y2 = points[2].y;
    }
    
    var updateAABBCircle = function(collider) {
        var aabb = collider.aabb;
        var r = collider.sat.r;
        var center = collider.sat.pos;

        aabb.x1 = center.x - r;
        aabb.y1 = center.y - r;
        aabb.x2 = center.x + r;
        aabb.y2 = center.y + r;
    }
    
    var updateAABBPoint = function(collider) {
        var aabb = collider.aabb;
        var pos = collider.sat.pos;
        
        aabb.x1 = aabb.x2 = pos.x;
        aabb.y1 = aabb.y2 = pos.x;
    }
    
    
    
    
    
    /***********
     * EXPORTS *
     ***********/
    
    
    var exports = new EventEmitter();
    
    exports.RBush = RBush;
    exports.SAT = SAT;
    exports.EventEmitter = EventEmitter;
    exports.Vector = exports.V = SAT.Vector;
    exports.RESPONSE = RESPONSE;
    exports.cancel = cancel;
    exports.maxChecks = 100;
    
    exports.rbush = null;
    exports.__notYetInserted = [];
    exports.__moved = [];
    
    
    exports.init = function(maxEntries) {
        this.rbush = RBush(maxEntries || 9, [".aabb.x1", ".aabb.y1", ".aabb.x2", ".aabb.y2"]);
        
        for(var i = 0, len = this.__notYetInserted.length; i < len; i++) {
            this.insert(this.__notYetInserted[i]);
        }
        
        return this;
    }
    
    
    exports.insert = function(collider) {
        if(this.rbush) {
            this.rbush.insert(collider);
        }
        else {
            this.__notYetInserted.push(collider);
        }
        
        return this;
    }
    
    
    exports.moved = function(collider) {
        if(this.__moved.indexOf(collider) > -1) {
            this.__moved.push(collider);
        }
        
        return this;
    }
    
    
    
    
    
    
    /*********
     * TESTS *
     *********/
    
    exports.test = function(a, b, res) {
        var str = getTestString(a, b);
        
        if(res) {
            res.clear();
            return SAT[str](a.sat, b.sat, res);
        }
        else {
            return SAT[str](a.sat, b.sat);
        }
    }
    
    
    exports.TestAll = function(a, res) {
        var res = res || RESPONSE;
        var possible = this.rbush.search(a);
        
        loop:
        for(var i = 0, len = possible.length; i < len; i++) {
            var b = possible[i];
            var str = getTestString(a.type, b.type);
            res.clear();
            
            if(SAT[str](a.sat, b.sat, res)) {
                exports.emit("collision", a, b, res, cancel);
                if(BREAK) {
                    break loop;
                }
            }
        }
        
        BREAK = false;
        
        return this;
    }
    
    
    exports.check = function(res) {
        var i = 0;
        while(this.__moved.length && i < this.maxChecks) {
            this.testAll(this.__moved.pop(), res);
        }
        
        return this;
    }
    
    
    
    
    
    
    /***********
     * CLASSES *
     ***********/
    
    var Collider = exports.Collider = function(type, sat, data, insert) {
        EventEmitter.call(this);
        
        this.type = type;
        this.sat = sat;
        
        if(data !== undefined) {
            this.data = data;
        }
        
        updateAABB(this);
        
        if(insert) {
            exports.insert(this);
        }
        
        return this;
    }
    
    extend(Collider, EventEmitter);
    
    
    
    
    
    
    
    
    return exports;
    
    
    
    
    
}));