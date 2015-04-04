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
    
    var extend = function(child, Base) {
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
    
    
    

    
    
    
    
    
    
    
    /***********
     * EXPORTS *
     ***********/
    
    
    var exports = {
        RBush:       RBush,
        SAT:         SAT,
        Vector:      SAT.Vector,
        V:           SAT.Vector,
        Response:    SAT.Response,
        cancel:      cancel,
        maxChecks:   100,
        RESPONSE:    RESPONSE,
        rbush: null,
        __listeners: [],
        __notYetInserted: [],
        __moved: []
    }
    
    
    
    
    exports.init = function(maxEntries) {
        this.rbush = new RBush((maxEntries || 9), [".aabb.x1", ".aabb.y1", ".aabb.x2", ".aabb.y2"]);
        
        for(var i = 0, len = this.__notYetInserted.length; i < len; i++) {
            this.rbush.insert(this.__notYetInserted.pop());
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
    
    exports.all = function() {
        return this.rbush ? this.rbush.all() : this.__notYetInserted;
    }
    
    exports.search = function(collider) {
        // search() usually takes an array of AABB coordinates.
        // I have opened an issue to ask for a way to search for items:
        // https://github.com/mourner/rbush/issues/32
        // In the meantime, we're translating to the correct format (creating a new Array for every call!)
        
        //return this.rbush.search(collider);
        if(this.rbush) {
            var res = this.rbush.search([collider.aabb.x1, collider.aabb.y1, collider.aabb.x2, collider.aabb.y2]);
            var index = res.indexOf(collider);
            if(index > -1) {
                res.splice(index, 1);
            }
            
            return res;
        }
    }
    
    exports.clear = function() {
        if(this.rbush) {
            this.rbush.clear();
        }
        this.__moved = [];
        this.__notYetInserted = [];
        
        return this;
    }
    
    
    exports.moved = function(collider) {
        if(this.__moved.indexOf(collider) === -1) {
            this.__moved.push(collider);
        }
        
        return this;
    }
    
    exports.update = function(collider) {
        this.updateAABB(collider);
        this.remove(collider);
        this.insert(collider);
        
        return this;
    }
    
    exports.onCollision = function(listener) {
        this.__listeners.push(listener);
        
        return this;
    }
    
    exports.offCollision = function(listener) {
        var index = this.__listeners.indexOf(listener);
        if(index > -1) {
            this.__listeners.splice(index, 1);
        }
        
        return this;
    }
    
    exports.__onCollision = function(a, b, res) {
        for(var i = 0, len = this.__listeners.length; i < len; i++) {
            this.__listeners[i](a, b, res, cancel);
        }
        
        return this;
    }
    
    
    
    
    
    
    
    
    /****************
    * AABB UPDATES *
    ****************/
    
    
    exports.updateAABB = function(collider) {
        switch(collider.type) {
            case "polygon":
                return exports.updateAABBPolygon(collider);
                break;
            case "box":
                return exports.updateAABBBox(collider);
                break;
            case "circle":
                return exports.updateAABBCircle(collider);
                break;
            case "point":
                return exports.updateAABBPoint(collider);
                break;
        }
    }
    
    exports.updateAABBPolygon = function(collider) {
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
        
        aabb.x1 = pos.x + xMin;
        aabb.y1 = pos.y + yMin;
        aabb.x2 = pos.x + xMax;
        aabb.y2 = pos.y + yMax;
    }
    
    exports.updateAABBBox = function(collider) {
        var points = collider.sat.calcPoints;
        var aabb = collider.aabb;
        
        aabb.x1 = points[0].x;
        aabb.y1 = points[0].y;
        aabb.x2 = points[2].x;
        aabb.y2 = points[2].y;
    }
    
    exports.updateAABBCircle = function(collider) {
        var aabb = collider.aabb;
        var r = collider.sat.r;
        var center = collider.sat.pos;

        aabb.x1 = center.x - r;
        aabb.y1 = center.y - r;
        aabb.x2 = center.x + r;
        aabb.y2 = center.y + r;
    }
    
    exports.updateAABBPoint = function(collider) {
        var aabb = collider.aabb;
        var pos = collider.sat.pos;
        
        aabb.x1 = aabb.x2 = pos.x;
        aabb.y1 = aabb.y2 = pos.x;
    }
    
    
    
    
    
    
    
    
    /*********
     * TESTS *
     *********/
    
    exports.test = function(a, b, res) {
        var res = res || RESPONSE;
        var str = getTestString(a, b);
        
        res.clear();
        return SAT[str](a.sat, b.sat, res);
    }
    
    
    exports.testAll = function(a, res) {
        var res = res || RESPONSE;
        var possible = this.search(a);
        this.update(a);
        
        loop:
        for(var i = 0, len = possible.length; i < len; i++) {
            var b = possible[i];
            var str = getTestString(a.type, b.type);
            res.clear();
            
            if(b !== a && SAT[str](a.sat, b.sat, res)) {
                // Fix collisions with infinitely small overlaps causing way too many loops
                if(Math.abs(res.overlap) > .5) {
                    this.__onCollision(a, b, res);
                    if(BREAK) {
                        break loop;
                    }
                }
            }
        }
        
        a.lastPos.x = a.sat.pos.x;
        a.lastPos.y = a.sat.pos.y;
        
        BREAK = false;
        
        return this;
    }
    
    
    exports.check = function(res) {
        var i = 0;
        while(this.__moved.length && i < this.maxChecks) {
            var collider = this.__moved.pop();
            this.testAll(collider, res);
            i++;
        }
        
        return this;
    }
    
    
    
    
    
    
    
    
    /***********
     * CLASSES *
     ***********/
    
    var Collider = exports.Collider = function Collider(type, sat, insert, data) {
        this.type = type;
        this.sat = sat;
        this.data = data;
        this.lastPos = new SAT.Vector();
        this.aabb = {};
        
        exports.updateAABB(this);
        
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
        exports.updateAABB(this);
        
        return this;
    }
    
    Collider.prototype.moved = function() {
        exports.moved(this);
        
        return this;
    }
    
    Collider.prototype.search = function() {
        return exports.search(this);
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
    
    
    
    
    
    
    var Polygon = exports.Polygon = function Polygon(pos, points, insert, data) {
        var sat = new SAT.Polygon(pos, points);
        Collider.call(this, "polygon", sat, insert, data);
        
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
    
    
    
    
    var Circle = exports.Circle = function Circle(pos, r, insert, data) {
        var sat = new SAT.Circle(pos, r);
        Collider.call(this, "circle", sat, insert, data);
        
        return this;
    }
    
    extend(Circle, Collider);
    
    
    
    
    
    var Point = exports.Point = function Point(pos, insert, data) {
        var sat = (new SAT.Box(pos, 1, 1)).toPolygon();
        Collider.call(this, "point", sat, insert, data);
        
        return this;
    }
    
    extend(Point, Collider);
    
    
    
    
    
    var Box = exports.Box = function Box(pos, w, h, insert, data) {
        var sat = (new SAT.Box(pos, w, h)).toPolygon();
        Collider.call(this, "box", sat, insert, data);
        
        return this;
    }
    
    extend(Box, Collider);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return exports;
    
    
    
    
    
}));