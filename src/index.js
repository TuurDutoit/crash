(function(factory) {
    "use strict";
    
    if(typeof define === "function" && define["amd"]) {
        define(["RBush","SAT"], factory);
    }
    else if(typeof exports === "object") {
        module.exports = factory(require("rbush"), require("sat"));
    }
    else {
        window.Crash = factory(window.rbush, window.SAT);
    }
    
}(function(RBush, SAT) {
    "use strict";
    
    
    
    
    
    
    
    
    /*************
     * VARIABLES *
     * UTILITIES *
     *************/
    
    
    var RESPONSE = new SAT.Response();
    var BREAK = false;
    
    var extend = function(child, base) {
        child.prototype = new Base();
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
    
    
    var exports = {
        RBush:       RBush,
        SAT:         SAT,
        Vector:      SAT.Vector,
        V:           SAT.Vector,
        cancel:      cancel,
        maxChecks:   100,
        RESPONSE:    RESPONSE,
        onCollision: function(a, b, res, cancel) {
            // Fill in...
        },
        
        rbush: null,
        __notYetInserted: [],
        __moved: [],
        
        updateAABB: updateAABB,
        updateAABBBox: updateAABBBox,
        updateAABBCircle: updateAABBCircle,
        updateAABBPoint: updateAABBPoint,
        updateAABBPolygon: updateAABBPolygon
    }
    
    
    
    
    exports.init = function(maxEntries) {
        this.rbush = RBush(maxEntries || 9, [".aabb.x1", ".aabb.y1", ".aabb.x2", ".aabb.y2"]);
        
        for(var i = 0, len = this.__notYetInserted.length; i < len; i++) {
            this.rbush.insert(this.__notYetInserted[i]);
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
    
    exports.remove = function(collider) {
        if(this.rbush) {
            this.rbush.remove(collider);
        }
        else {
            var index = this.__notYetInserted.indexOf(collider);
            if(index > -1) {
                this.__notYetInserted.splice(index, 1);
            }
        }
        
        return this;
    }
    
    
    exports.moved = function(collider) {
        if(this.__moved.indexOf(collider) === -1) {
            this.__moved.push(collider);
        }
        
        return this;
    }
    
    exports.update = function(collider) {
        updateAABB(collider);
        rbush.remove(collider);
        rbush.insert(collider);
        
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
    
    
    exports.testAll = function(a, res) {
        var res = res || RESPONSE;
        var possible = this.rbush.search(a);
        
        loop:
        for(var i = 0, len = possible.length; i < len; i++) {
            var b = possible[i];
            var str = getTestString(a.type, b.type);
            res.clear();
            
            if(SAT[str](a.sat, b.sat, res)) {
                this.onCollision(a, b, res, cancel);
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
            var collider = this.__moved.pop();
            this.update(collider);
            this.testAll(collider, res);
            
            collider.lastPos.x = collider.sat.pos.x;
            collider.lastPos.y = collider.sat.pos.y;
            i++;
        }
        
        return this;
    }
    
    
    
    
    
    
    
    
    /***********
     * CLASSES *
     ***********/
    
    var Collider = exports.Collider = function Collider(type, sat, data, insert) {
        this.type = type;
        this.sat = sat;
        this.data = data;
        this.lastPos = new SAT.Vector();
        
        updateAABB(this);
        
        if(insert) {
            exports.insert(this);
        }
        
        return this;
    }
    
    Collider.prototype.insert = function() {
        exports.insert(this);
        
        return this;
    }
    
    Collider.prototype.remove = function() {
        exports.remove(this);
        
        return this;
    }
    
    Collider.prototype.update = function() {
        exports.update(this);
        
        return this;
    }
    
    Collider.prototype.updateAABB = function() {
        updateAABB(this);
        
        return this;
    }
    
    Collider.prototype.moved = function() {
        exports.moved(this);
        
        return this;
    }
    
    Collider.prototype.setData = function(data) {
        this.data = data;
        
        return this;
    }
    
    Collider.prototype.getData = function() {
        return this.data;
    }
    
    Collider.prototype.moveTo = function(x, y) {
        this.sat.pos.x = x;
        this.sat.pos.y = y;
        this.moved();
        
        return this;
    }
    
    Collider.prototype.moveBy = Collider.prototype.move = function(x, y) {
        this.sat.pos.x += x;
        this.sat.pos.y += y;
        this.moved();
        
        return this;
    }
    
    
    
    
    
    
    var Polygon = exports.Polygon = function Polygon(pos, points, data, insert) {
        var sat = new SAT.Polygon(pos, points);
        Collider.call(this, "polygon", sat, data, insert);
        
        return this;
    }
    
    extend(Polygon, Collider);
    
    Polygon.prototype.setPoints = function(points) {
        this.sat.setPoints(points);
        this.moved();
        
        return this;
    }
    
    Polygon.prototype.setAngle = function(angle) {
        this.sat.setAngle(angle);
        this.moved();
        
        return this;
    }
    
    Polygon.prototype.setOffset = function(offset) {
        this.sat.setOffset(offset);
        this.moved();
        
        return this;
    }
    
    Polygon.prototype.rotate = function(angle) {
        this.sat.rotate(angle);
        this.moved();
        
        return this;
    }
    
    
    
    
    var Circle = exports.Circle = function Circle(pos, r, data, insert) {
        var sat = new SAT.Circle(pos, r);
        Collider.call(this, "circle", sat, data, insert);
        
        return this;
    }
    
    extend(Circle, Collider);
    
    
    
    
    
    var Point = exports.Point = function Point(pos, data, insert) {
        var sat = (new SAT.Box(pos, 1, 1)).toPolygon();
        Collider.call(this, "point", sat, data, insert);
        
        return this;
    }
    
    extend(Point, Collider);
    
    
    
    
    
    var Box = exports.Box = function Box(pos, w, h, data, insert) {
        var sat = (new SAT.Box(pos, w, h)).toPolygon();
        Collider.call(this, "box", sat, data, insert);
        
        return this;
    }
    
    extend(Box, Collider);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return exports;
    
    
    
    
    
}));