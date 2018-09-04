if(typeof require === "function") {
    var expect = require("expect.js");
    var sinon = require("sinon");
    var CrashCtor = require("../crash.js");
    var Crash = new CrashCtor();
}






/***************
 * CONSTRUCTOR *
 ***************/

// Checks if the constructor does what it's supposed to do
// Also, some methods of Crash (those that don't require 'this'), are exposed on the constructor itself
// They should be the same exact functions as on the prototype and will thus be tested further down
// That is why we just check for equality with their counterparts on the prototype


describe("constructor", function() {
    it("should be a function", function() {
        expect(CrashCtor).to.be.a("function");
    });

    describe("options", function() {
        it("should not crash when no options are passed in", function() {
            var fn = function() {
                return new CrashCtor();
            }

            expect(fn).to.not.throwError();
        });
        it("should create an __options object", function() {
            var c = new CrashCtor();

            expect(c.__options).to.be.a("object");
        });

        describe("maxEntries", function() {
            it("should set maxEntries correctly", function() {
                var c = new CrashCtor({maxEntries: 10});

                expect(c.__options.maxEntries).to.be(10);
            });
            it("should set maxEntries to 9 by default", function() {
                var c = new CrashCtor();

                expect(c.__options.maxEntries).to.be(9);
            });
        });

        describe("maxChecks", function() {
            it("should set maxChecks correctly", function() {
                var c = new CrashCtor({maxChecks: 50});

                expect(c.__options.maxChecks).to.be(50);
            });
            it("should set maxChecks correctly when 0", function() {
                var c = new CrashCtor({maxChecks: 0});

                expect(c.__options.maxChecks).to.be(0);
            });
            it("should set maxChecks to 100 by default", function() {
                var c = new CrashCtor();

                expect(c.__options.maxChecks).to.be(100);
            });
        });

        describe("overlapLimit", function() {
            it("should set overlapLimit correctly when it's a number", function() {
                var c = new CrashCtor({overlapLimit: 2});

                expect(c.__options.overlapLimit).to.be(2);
            });
            it("should set overlapLimit correctly when 0", function() {
                var c = new CrashCtor({overlapLimit: 0});

                expect(c.__options.overlapLimit).to.be(0);
            });
            it("should set overlapLimit correctly when false", function() {
                var c = new CrashCtor({overlapLimit: false});

                expect(c.__options.overlapLimit).to.be(false);
            });
            it("should set overlapLimit to 0.5 by default", function() {
                var c = new CrashCtor();

                expect(c.__options.overlapLimit).to.be(0.5);
            });
        });
    });

    describe("setup", function() {
        it("should initialize rbush", function() {
            var c = new CrashCtor({maxEntries: 10});
            
            expect(c.rbush).to.be.ok();
            expect(c.rbush).to.be.a("object");
            expect(c.rbush._maxEntries).to.be(10);
        });
        it("should set MAX_CHECKS", function() {
            var c = new CrashCtor({maxChecks: 50});
            
            expect(c.MAX_CHECKS).to.be.ok();
            expect(c.MAX_CHECKS).to.be(50);
        });
        it("should set OVERLAP_LIMIT", function() {
            var c = new CrashCtor({overlapLimit: 2});
            
            expect(c.OVERLAP_LIMIT).to.be.ok();
            expect(c.OVERLAP_LIMIT).to.be(2);
        });
        it("should initialize a new Response for RESPONSE", function() {
            var c = new CrashCtor();
            
            expect(c.RESPONSE).to.be.ok();
            expect(c.RESPONSE).to.be.a(CrashCtor.Response);
        });
        it("should set BREAK to false", function() {
            var c = new CrashCtor();
            
            expect(c.BREAK).to.be(false);
        });
        it("should set __moved to an empty array", function() {
            var c = new CrashCtor();
            
            expect(c.__moved).to.be.ok();
            expect(c.__moved).to.eql([]);
        });
        it("should set __listeners to an empty array", function() {
            var c = new CrashCtor();
            
            expect(c.__listeners).to.be.ok();
            expect(c.__listeners).to.eql([]);
        });
        it("should call createColliders", function() {
            sinon.spy(CrashCtor.prototype, "createColliders");
            var c = new CrashCtor();

            expect(CrashCtor.prototype.createColliders.called).to.be.ok();
            expect(CrashCtor.prototype.createColliders.callCount).to.be(1);
            expect(CrashCtor.prototype.createColliders.calledWith(c)).to.be.ok();

            CrashCtor.prototype.createColliders.restore();
        });
    });

    describe("properties", function() {
        it("should have RBush", function() {
            expect(CrashCtor.RBush).to.be(CrashCtor.prototype.RBush);
        });
        it("should have SAT", function() {
            expect(CrashCtor.SAT).to.be(CrashCtor.prototype.SAT);
        });
        it("should have Vector", function() {
            expect(CrashCtor.Vector).to.be(CrashCtor.prototype.Vector);
        });
        it("should have V", function() {
            expect(CrashCtor.V).to.be(CrashCtor.prototype.V);
        });
        it("should have Response", function() {
            expect(CrashCtor.Response).to.be(CrashCtor.prototype.Response);
        });
        it("should have extend", function() {
            expect(CrashCtor.extend).to.be(CrashCtor.prototype.extend);
        });
        it("should have getTestString", function() {
            expect(CrashCtor.getTestString).to.be(CrashCtor.prototype.getTestString);
        });
        it("should have updateAABB", function() {
            expect(CrashCtor.updateAABB).to.be(CrashCtor.prototype.updateAABB);
        });
        it("should have updateAABBPolygon", function() {
            expect(CrashCtor.updateAABBPolygon).to.be(CrashCtor.prototype.updateAABBPolygon);
        });
        it("should have updateAABBCircle", function() {
            expect(CrashCtor.updateAABBCircle).to.be(CrashCtor.prototype.updateAABBCircle);
        });
        it("should have updateAABBPoint", function() {
            expect(CrashCtor.updateAABBPoint).to.be(CrashCtor.prototype.updateAABBPoint);
        });
        it("should have updateAABBBox", function() {
            expect(CrashCtor.updateAABBBox).to.be(CrashCtor.prototype.updateAABBBox);
        });
        it("should have test", function() {
            expect(CrashCtor.test).to.be(CrashCtor.prototype.test);
        });
        it("should have createColliders", function() {
            expect(CrashCtor.createColliders).to.be(CrashCtor.prototype.createColliders);
        });
    });
});
    
    
    
    
    
    
    

describe("createColliders", function() {
    var obj = {};
    CrashCtor.createColliders(obj);

    expect(obj.Collider).to.be.a("function");
    expect(obj.Polygon).to.be.a("function");
    expect(obj.Circle).to.be.a("function");
    expect(obj.Point).to.be.a("function");
    expect(obj.Box).to.be.a("function");
});









describe("Crash", function() {
    
    
    
    
    
    
    
    /**************
     * ATTRIBUTES *
     **************/
    

    describe("RBush", function() {
        it("should be defined", function() {
            expect(Crash.RBush).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.RBush).to.be.a("function");
        });
    });

    describe("SAT", function() {
        it("should be defined", function() {
            expect(Crash.SAT).to.be.ok();
        });
        it("should be an object", function() {
            expect(Crash.SAT).to.be.an("object");
        });
    });

    describe("Vector", function() {
        it("should be defined", function() {
            expect(Crash.Vector).to.be.ok();
        });
        it("should equal SAT.Vector", function() {
            expect(Crash.Vector).to.equal(Crash.SAT.Vector);
        });
    });

    describe("V", function() {
        it("should be defined", function() {
            expect(Crash.V).to.be.ok();
        });
        it("should equal SAT.Vector", function() {
            expect(Crash.V).to.equal(Crash.SAT.Vector);
        });
    });

    describe("Response", function() {
        it("should be defined", function() {
            expect(Crash.Response).to.be.ok();
        });
        it("should equal SAT.Response", function() {
            expect(Crash.Response).to.equal(Crash.SAT.Response);
        });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*************
     * UTILITIES *
     *************/
    
    
    describe("extend", function() {
        it("should be defined", function() {
            expect(Crash.extend).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.extend).to.be.a("function");
        });
        it("should extend the prototype chain", function() {
            var Base = function() {};
            var child = function(){};
            Crash.extend(child, Base);
            
            expect(new child).to.be.a(Base);
        });
    });
    
    describe("reset", function() {
        it("should be defined", function() {
            expect(Crash.reset).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.reset).to.be.a("function");
        });
        it("should call clear", function() {
            sinon.spy(Crash, "clear");
            Crash.reset();
            
            expect(Crash.clear.called).to.be.ok();
            expect(Crash.clear.callCount).to.be(1);
            
            Crash.clear.restore();
        });
        it("should reset __listeners", function() {
            Crash.onCollision(function(){});
            Crash.reset();
            
            expect(Crash.__listeners).to.eql([]);
        });
        it("should reset BREAK", function() {
            Crash.BREAK = true;
            Crash.reset();
            
            expect(Crash.BREAK).to.be(false);
        });
        it("should reset MAX_CHECKS", function() {
            Crash.MAX_CHECKS = 500;
            Crash.reset();
            
            expect(Crash.MAX_CHECKS).to.be(Crash.__options.maxChecks);
        });
        it("should reset OVERLAP_LIMIT", function() {
            Crash.OVERLAP_LIMIT = 0.01;
            Crash.reset();
            
            expect(Crash.OVERLAP_LIMIT).to.be(Crash.__options.overlapLimit);
        });
        it("should call RESPONSE.clear", function() {
            sinon.spy(Crash.RESPONSE, "clear");
            Crash.reset();
            
            expect(Crash.RESPONSE.clear.called).to.be.ok();
            expect(Crash.RESPONSE.clear.callCount).to.be(1);
            
            Crash.RESPONSE.clear.restore();
        });
    });
    
    describe("onCollision", function() {
        it("should be defined", function() {
            expect(Crash.onCollision).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.onCollision).to.be.a("function");
        });
        it("should add the listener to __listeners", function() {
            var fn = function(){};
            Crash.__listeners = [];
            Crash.onCollision(fn);
            
            expect(Crash.__listeners).to.contain(fn);
            expect(Crash.__listeners).to.have.length(1);
        });
    });
    
    describe("offCollision", function() {
        it("should be defined", function() {
            expect(Crash.offCollision).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.offCollision).to.be.a("function");
        });
        it("should add the listener to __listeners", function() {
            var fn = function(){};
            Crash.__listeners = [];
            Crash.onCollision(fn);
            Crash.offCollision(fn);
            
            expect(Crash.__listeners).to.be.empty();
        });
    });
    
    describe("__onCollision", function() {
        it("should be defined", function() {
            expect(Crash.__onCollision).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.__onCollision).to.be.a("function");
        });
        it("should call all the listeners with the right arguments", function() {
            var c1 = new Crash.Point(new Crash.V);
            var c2 = new Crash.Point(new Crash.V);
            var res = new Crash.Response();
            var fn1 = sinon.spy();
            var fn2 = sinon.spy();
            Crash.__listeners = [fn1, fn2];
            Crash.__onCollision(c1, c2, res);
            
            expect(fn1.called).to.be.ok();
            expect(fn1.callCount).to.be(1);
            expect(fn1.calledWith(c1, c2, res, Crash.cancel)).to.be.ok();
            expect(fn2.called).to.be.ok();
            expect(fn2.callCount).to.be(1);
            expect(fn2.calledWith(c1, c2, res, Crash.cancel)).to.be.ok();
            expect(fn2.calledAfter(fn1)).to.be.ok();
        });
    });
    
    describe("cancel", function() {
        it("should be defined", function() {
            expect(Crash.cancel).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.cancel).to.be.a("function");
        });
        it("should set BREAK to true", function() {
            Crash.BREAK = false;
            Crash.cancel();
            
            expect(Crash.BREAK).to.be(true);
            
            Crash.BREAK = false;
        });
        it("should return false", function() {
            expect(Crash.cancel()).to.be(false);
            
            Crash.BREAK =false;
        });
    });
    
    describe("getTestString", function() {
        it("should be defined", function() {
            expect(Crash.cancel).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.cancel).to.be.a("function");
        });
        it("should return the right test strings", function() {
            expect(Crash.getTestString("polygon","polygon")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("polygon","box")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("polygon","point")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("polygon","circle")).to.be("testPolygonCircle");
            expect(Crash.getTestString("box","polygon")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("box","box")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("box","point")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("box","circle")).to.be("testPolygonCircle");
            expect(Crash.getTestString("point","polygon")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("point","box")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("point","point")).to.be("testPolygonPolygon");
            expect(Crash.getTestString("point","circle")).to.be("testPolygonCircle");
            expect(Crash.getTestString("circle","polygon")).to.be("testCirclePolygon");
            expect(Crash.getTestString("circle","box")).to.be("testCirclePolygon");
            expect(Crash.getTestString("circle","point")).to.be("testCirclePolygon");
            expect(Crash.getTestString("circle","circle")).to.be("testCircleCircle");
        });
    });

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /***********
     * METHODS *
     ***********/
    
    
    describe("insert", function() {
        it("should be defined", function() {
            expect(Crash.insert).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.insert).to.be.a("function");
        });
        it("should add the collider to rbush", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.reset();
            Crash.insert(collider);
            
            expect(Crash.rbush.all()).to.eql([collider]);
        });
	it("should reliably insert many colliders", function() {
	    Crash.reset();
	    var colliders = [];
	    for (var i = 0; i < 50; i ++) {
		var collider = new Crash.Circle(new Crash.V, i + 1);
		Crash.insert(collider);
		colliders.push(collider);
	    }

	    
	    var arrayCompare = function(a, b)  {
		if (a.length !== b.length) return false;
		for (var ae of a) if (!b.includes(ae)) return false;
		return true;
	    }
	    
	    var rbush_array = Crash.rbush.all();
	    expect(arrayCompare(colliders, rbush_array)).to.equal(true);
		
	});
	    
    });

    
    describe("remove", function() {
        it("should be defined", function() {
            expect(Crash.remove).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.remove).to.be.a("function");
        });
        it("should remove the collider from rbush", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.reset();
            Crash.insert(collider);
            Crash.remove(collider);
            
            expect(Crash.rbush.all()).to.be.empty();
        });
	it("should reliably remove many colliders from rbush", function() {
            Crash.reset();
	    var colliders = [];
	    for (var i = 0; i < 50; i ++) {
		var collider = new Crash.Circle(new Crash.V, i + 1);
		Crash.insert(collider);
		colliders.push(collider);
	    }
	    colliders.forEach(function(value, index) {
		Crash.remove(value);
	    })

            expect(Crash.rbush.all()).to.be.empty();
	});
        it("should not crash when the collider has not been inserted", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            var fn = function() {
                Crash.remove(collider);
            }
            
            expect(fn).to.not.throwError();
        });
    });

    describe("moveTo", function() {
	it("should correctly handle moving colliders when rbush has many entries", function() {
	    Crash.reset();
	    var colliders = [];
	    for (var i = 0; i < 9; i ++) {
		// data is just for sorting
		var collider = new Crash.Circle(new Crash.V, i + 10, false, i + 10);
		colliders.push(collider);
		Crash.insert(collider);

	    }
	    
	    var moved_collider = new Crash.Circle(new Crash.V, 5, false, 0);
	    colliders.push(moved_collider);
	    Crash.insert(moved_collider);
	    moved_collider.moveTo(100, 100);
	    moved_collider.moveTo(-50,20);
//	    moved_collider.moveTo(0,0);
	    
	    var sort = function(a, b) {return a.data - b.data}
	    
	    var from_rbush = Crash.rbush.all().sort(sort);
	    colliders.sort(sort);
	    var rbush_data = from_rbush.map(function(c) {return c.data});
	    var colliders_data = colliders.map(function(c) {return c.data});

	    expect(from_rbush).to.eql(colliders);
//	    expect(rbush_data).to.eql(colliders_data);
	    
	});

    });

    describe("all", function() {
        it("should be defined", function() {
            expect(Crash.all).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.all).to.be.a("function");
        });
        it("should return rbush.all()", function() {
            Crash.reset();
            
            expect(Crash.all()).to.eql(Crash.rbush.all());
        });
    });
    
    describe("search", function() {
        it("should be defined", function() {
            expect(Crash.search).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.search).to.be.a("function");
        });
        it("should return all the possibly colliding colliders", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Point(new Crash.V(1, 1), true);
            var c3 = new Crash.Box(new Crash.V(-5, -5), 10, 10, true);
            var c4 = new Crash.Circle(new Crash.V(0, 6), 3, true);
            var res = Crash.search(c1);
            
            expect(res).to.contain(c2);
            expect(res).to.contain(c3);
            expect(res).to.contain(c4);
        });
        it("should not return colliders that could not possibly be colliding", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            
            // colliding with c1
            var c2 = new Crash.Point(new Crash.V(1, 1), true);
            var c3 = new Crash.Box(new Crash.V(-5, -5), 10, 10, true);
            var c4 = new Crash.Circle(new Crash.V(0, 6), 3, true);
            
            // not colliding with c1
            var c5 = new Crash.Point(new Crash.V(50, 50), true);
            var c6 = new Crash.Box((new Crash.V(100, 100), 5, 5, true));
            var c7 = new Crash.Circle(new Crash.V(-75, 0), 3);
            
            var res = Crash.search(c1);
            
            expect(res).to.not.contain(c5);
            expect(res).to.not.contain(c6);
            expect(res).to.not.contain(c7);
        });
        it("should not return the collider you searched for", function() {
            Crash.reset();
            var collider = new Crash.Circle(new Crash.V, 5, true);
            
            expect(Crash.search(collider)).to.not.contain(collider);
        });
    });
    
    describe("clear", function() {
        it("should be defined", function() {
            expect(Crash.clear).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.clear).to.be.a("function");
        });
        it("should clear everything", function() {
            Crash.reset();
            Crash.insert(new Crash.Point(new Crash.V));
            Crash.__moved = ["content"];
            Crash.clear();

            expect(Crash.all()).to.be.empty();
            expect(Crash.__moved).to.be.empty();
        });
    });
    
    describe("addToMoved", function() {
        it("should be defined", function() {
            expect(Crash.addToMoved).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.addToMoved).to.be.a("function");
        });
        it("should add the collider to __moved", function() {
            var collider = new Crash.Point(new Crash.V);
            Crash.addToMoved(collider);
            
            expect(Crash.__moved).to.contain(collider);
        });
        it("should not add the collider twice", function() {
            var collider = new Crash.Point(new Crash.V);
            Crash.__moved = [];
            Crash.addToMoved(collider);
            Crash.addToMoved(collider);
            
            expect(Crash.__moved).to.have.length(1);
        });
    });
    
    describe("update", function() {
        it("should be defined", function() {
            expect(Crash.update).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.update).to.be.a("function");
        });
        it("should call updateAABB", function() {
            Crash.reset();
            var collider = new Crash.Point(new Crash.V);
            sinon.spy(Crash, "updateAABB");
            Crash.update(collider);
            
            expect(Crash.updateAABB.called).to.be.ok();
            expect(Crash.updateAABB.callCount).to.be(1);
            expect(Crash.updateAABB.calledWith(collider)).to.be.ok();
            
            Crash.updateAABB.restore();
        });
        it("should call rbush.remove", function() {
            Crash.reset();
            var collider = new Crash.Point(new Crash.V);
            sinon.spy(Crash, "remove");
            Crash.update(collider);
            
            expect(Crash.remove.called).to.be.ok();
            expect(Crash.remove.callCount).to.be(1);
            expect(Crash.remove.calledWith(collider)).to.be.ok();
            
            Crash.remove.restore();
        });
        it("should call rbush.insert", function() {
            Crash.reset();
            var collider = new Crash.Point(new Crash.V);
            sinon.spy(Crash, "insert");
            Crash.update(collider);
            
            expect(Crash.insert.called).to.be.ok();
            expect(Crash.insert.callCount).to.be(1);
            expect(Crash.insert.calledWith(collider)).to.be.ok();
            
            Crash.insert.restore();
        });
    });
    
    describe("moved", function() {
        it("should be defined", function() {
            expect(Crash.moved).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.moved).to.be.a("function");
        });
        it("should call update", function() {
            var collider = new Crash.Point(new Crash.V, true);
            sinon.spy(Crash, "update");
            Crash.moved(collider);
            
            expect(Crash.update.called).to.be.ok();
            expect(Crash.update.callCount).to.be(1);
            expect(Crash.update.calledWith(collider)).to.be.ok();
            
            Crash.update.restore();
        });
        it("should call addToMoved", function() {
            var collider = new Crash.Point(new Crash.V, true);
            sinon.spy(Crash, "addToMoved");
            Crash.moved(collider);
            
            expect(Crash.addToMoved.called).to.be.ok();
            expect(Crash.addToMoved.callCount).to.be(1);
            expect(Crash.addToMoved.calledWith(collider)).to.be.ok();
            
            Crash.addToMoved.restore();
        });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /****************
     * AABB UPDATES *
     ****************/
    
    
    describe("updateAABB", function() {
        it("should be defined", function() {
            expect(Crash.updateAABB).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.updateAABB).to.be.a("function");
        });
        it("should call updateAABBPolygon when passed a Polygon", function() {
            var collider = new Crash.Polygon(new Crash.V, [new Crash.V, new Crash.V(5, 0), new Crash.V(2, 3)]);
            var cache = Crash.updateAABBPolygon;
            var spy = Crash.updateAABBPolygon = sinon.spy();
            Crash.updateAABB(collider);
            Crash.updateAABBPolygon = cache;
            
            expect(spy.called).to.be.ok();
            expect(spy.callCount).to.be(1);
        });
        it("should call updateAABBCircle when passed a Circle", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            var cache = Crash.updateAABBCircle;
            var spy = Crash.updateAABBCircle = sinon.spy();
            Crash.updateAABB(collider);
            Crash.updateAABBCircle = cache;
            
            expect(spy.called).to.be.ok();
            expect(spy.callCount).to.be(1);
        });
        it("should call updateAABBBox when passed a Box", function() {
            var collider = new Crash.Box(new Crash.V, 5, 5);
            var cache = Crash.updateAABBBox;
            var spy = Crash.updateAABBBox = sinon.spy();
            Crash.updateAABB(collider);
            Crash.updateAABBBox = cache;
            
            expect(spy.called).to.be.ok();
            expect(spy.callCount).to.be(1);
        });
        it("should call updateAABBPoint when passed a Point", function() {
            var collider = new Crash.Point(new Crash.V);
            var cache = Crash.updateAABBPoint;
            var spy = Crash.updateAABBPoint = sinon.spy();
            Crash.updateAABB(collider);
            Crash.updateAABBPoint = cache;
            
            expect(spy.called).to.be.ok();
            expect(spy.callCount).to.be(1);
        });
    });
    
    describe("updateAABBPolygon", function() {
        it("should be defined", function() {
            expect(Crash.updateAABBPolygon).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.updateAABBPolygon).to.be.a("function");
        });
        it("should update the AABB correctly", function() {
            var collider = new Crash.Polygon(new Crash.V(1,1), [new Crash.V(0,0), new Crash.V(5,0), new Crash.V(3,2)]);
            Crash.updateAABBPolygon(collider);
          
            expect(collider.aabb).to.eql({x1:1, y1:1, x2:6, y2: 3});
        });
    });

    describe("updateAABBCircle", function() {
        it("should be defined", function() {
            expect(Crash.updateAABBCircle).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.updateAABBCircle).to.be.a("function");
        });
        it("should update the AABB correctly", function() {
            var collider = new Crash.Circle(new Crash.V(1,1), 5);
            Crash.updateAABBCircle(collider);

            expect(collider.aabb).to.eql({x1:-4, y1:-4, x2:6, y2: 6});
        });
    });

    describe("updateAABBPoint", function() {
        it("should be defined", function() {
            expect(Crash.updateAABBPoint).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.updateAABBPoint).to.be.a("function");
        });
        it("should update the AABB correctly", function() {
            var collider = new Crash.Point(new Crash.V(1,1));
            Crash.updateAABBPoint(collider);

            expect(collider.aabb).to.eql({x1:1, y1:1, x2:1, y2: 1});
        });
    });

    describe("updateAABBBox", function() {
        it("should be defined", function() {
            expect(Crash.updateAABBBox).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.updateAABBBox).to.be.a("function");
        });
        it("should update the AABB correctly", function() {
            var collider = new Crash.Box(new Crash.V(1,1), 5, 2);
            Crash.updateAABBBox(collider);

            expect(collider.aabb).to.eql({x1:1, y1:1, x2:6, y2: 3});
        });
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*********
     * TESTS *
     *********/
    
    
    describe("test", function() {
        it("should be defined", function() {
            expect(Crash.test).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.test).to.be.a("function");
        });
        it("should return true when the colliders collide", function() {
            var a = new Crash.Circle(new Crash.V, 5);
            var b = new Crash.Point(new Crash.V(1,0));
            
            expect(Crash.test(a, b)).to.be(true);
        });
        it("should return false when the colliders don't collide", function() {
            var a = new Crash.Circle(new Crash.V, 5);
            var b = new Crash.Point(new Crash.V(10,0));
            
            expect(Crash.test(a, b)).to.be(false);
        });
        it("should should update the Response correctly", function() {
            var a = new Crash.Circle(new Crash.V, 5);
            var b = new Crash.Point(new Crash.V(1,0));
            var res = new Crash.Response();
            Crash.test(a, b, res);
            
            expect(res.a).to.be(a.sat);
            expect(res.b).to.be(b.sat);
            expect(res.overlap).to.be(4);
        });
        it("should use RESPONSE when no Response has been passed", function() {
            var a = new Crash.Circle(new Crash.V, 5);
            var b = new Crash.Point(new Crash.V(1,0));
            var res = Crash.RESPONSE;
            Crash.test(a, b);
            
            expect(res.a).to.be(a.sat);
            expect(res.b).to.be(b.sat);
            expect(res.overlap).to.be(4);
        });
    });

    describe("testAll", function() {
        it("should be defined", function() {
            expect(Crash.testAll).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.testAll).to.be.a("function");
        });
        it("should call __onCollision for all collisions", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true, "c1");
            var c2 = new Crash.Box(new Crash.V(2,0), 10, 10, true, "c2");
            var c3 = new Crash.Point(new Crash.V(0, 4), true, "c3");
            var res = new Crash.Response();
            var spy = sinon.spy(Crash, "__onCollision");
            Crash.testAll(c1, res);
            
            expect(spy.called).to.be.ok();
            expect(spy.callCount).to.be(2);
            expect(spy.calledWith(c1, c2, res)).to.be.ok();
            expect(spy.calledWith(c1, c3, res)).to.be.ok();
            
            Crash.__onCollision.restore();
        });
        it("should update the Response correctly", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            var res = new Crash.Response();
            Crash.testAll(c1, res);
            
            expect(res.a).to.be(c1.sat);
            expect(res.b).to.be(c2.sat);
            expect(res.overlap).to.be(4);
        });
        it("should not call __onCollision if the overlap is smaller than OVERLAP_LIMIT", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Box(new Crash.V(4.9, 0), 5, 5, true);
            sinon.spy(Crash, "__onCollision");
            Crash.testAll(c1);
            
            expect(Crash.__onCollision.called).to.be(false);
            
            Crash.__onCollision.restore();
        });
        it("should call __onCollision if OVERLAP_LIMIT is falsy", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Box(new Crash.V(4.9, 0), 5, 5, true);
            Crash.OVERLAP_LIMIT = false;
            sinon.spy(Crash, "__onCollision");
            Crash.testAll(c1);
            
            expect(Crash.__onCollision.called).to.be(true);
            
            Crash.__onCollision.restore();
        });
        it("should break the loop if BREAK is true", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            var c3 = new Crash.Box(new Crash.V(1, 1), 5, 5, true);
            var listener = function() {
                Crash.BREAK = true;
            }
            var spy = sinon.spy(listener);
            Crash.onCollision(spy);
            Crash.testAll(c1);
            
            expect(spy.called).to.be.ok();
            expect(spy.callCount).to.be(1);
        });
        it("should set BREAK to true when finished", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            Crash.onCollision(function() {
                Crash.BREAK = true;
            });
            Crash.testAll(c1);
            
            expect(Crash.BREAK).to.be(false);
        });
        it("should set lastPos on the collider", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            Crash.onCollision(function(a, b, res, cancel) {
                a.sat.pos.x -= res.overlapV.x;
                a.sat.pos.y -= res.overlapV.y;
            });
            Crash.testAll(c1);
            
            expect(c1.lastPos).to.be.ok();
            expect(c1.lastPos).to.be.an("object");
            expect(c1.lastPos).to.have.property("x", -4);
            expect(c1.lastPos).to.have.property("y", 0);
        });
        it("should return true in normal circumstances", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            
            expect(Crash.testAll(c1)).to.be(true);
        });
        it("should return false when the loop has been stopped", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            Crash.onCollision(function() {
                Crash.BREAK = true;
            });
            
            expect(Crash.testAll(c1)).to.be(false);
        });
    });
    
    describe("check", function() {
        it("should be defined", function() {
            expect(Crash.check).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.check).to.be.a("function");
        });
        it("should call testAll as long as there are colliders in __moved", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true).moved();
            var c2 = new Crash.Point(new Crash.V(1, 0), true).moved();
            var res = new Crash.Response();
            var spy = sinon.spy(function(a, b, res, cancel) {
                a.sat.pos.x -= res.overlapV.x;
                a.sat.pos.y -= res.overlapV.y;
                a.moved();
            });
            Crash.onCollision(spy);
            sinon.spy(Crash, "testAll");
            Crash.check(res);
            
            expect(Crash.testAll.called).to.be.ok();
            expect(Crash.testAll.callCount).to.be(3);
            expect(Crash.testAll.getCall(0).args).to.eql([c2, res]);
            expect(Crash.testAll.getCall(1).args).to.eql([c2, res]);
            expect(Crash.testAll.getCall(2).args).to.eql([c1, res]);
            
            expect(spy.called).to.be.ok();
            expect(spy.callCount).to.be(1);
            expect(spy.calledWith(c2, c1, res, Crash.cancel)).to.be.ok();
            
            Crash.testAll.restore();
        });
        it("should not do more checks than prescribed by MAX_CHECKS", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true).moved();
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            Crash.onCollision(function(a, b, res, cancel) {
                //causes an endless loop, if not stopped by MAX_CHECKS
                a.moved();
            });
            var spy = sinon.spy(Crash, "testAll");
            Crash.MAX_CHECKS = 5;
            Crash.check();
            
            expect(Crash.testAll.callCount).to.be(5);
            
            Crash.testAll.restore();
        });
    });
    
    describe("checkAll", function() {
        it("should be defined", function() {
            expect(Crash.checkAll).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.checkAll).to.be.a("function");
        });
        it("should call testAll for all colliders", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            sinon.spy(Crash, "testAll");
            Crash.checkAll();
            
            expect(Crash.testAll.callCount).to.be(2);
            
            Crash.testAll.restore();
        });
        it("should call check", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            sinon.spy(Crash, "check");
            Crash.checkAll();
            
            expect(Crash.check.called).to.be.ok();
            expect(Crash.check.callCount).to.be(1);
            
            Crash.check.restore();
        });
    });
});































/************
 * COLLIDER *
 ************/


describe("Collider", function() {
    var Collider, SatCollider;
    
    before(function() {
        Crash.reset();
        SatCollider = new Crash.SAT.Circle(new Crash.V, 5);
        Collider = new Crash.Collider("circle", SatCollider, true, "First Circle");
    });
    
    
    
    
    
    /***************
     * CONSTRUCTOR *
     ***************/
    
    
    describe("constructor", function() {
        
        it("should call updateAABB", function() {
            sinon.spy(Crash, "updateAABB");
            var collider = new Crash.Collider("circle", SatCollider);
            
            expect(Crash.updateAABB.called).to.be.ok();
            expect(Crash.updateAABB.callCount).to.be(1);
            expect(Crash.updateAABB.calledWith(collider)).to.be.ok();
            
            Crash.updateAABB.restore();
        });
        
        it("should insert the collider when insert is truthy", function() {
            sinon.spy(Crash, "insert");
            var c1 = new Crash.Collider("circle", SatCollider, true);
            var c2 = new Crash.Collider("circle", SatCollider, 1);
            
            expect(Crash.insert.called).to.be.ok();
            expect(Crash.insert.callCount).to.be(2);
            expect(Crash.insert.calledWith(c1)).to.be.ok();
            expect(Crash.insert.calledWith(c2)).to.be.ok();
            
            Crash.insert.restore();
        });
        
        it("should not insert the collider when insert is falsy", function() {
            sinon.spy(Crash, "insert");
            var c1 = new Crash.Collider("circle", SatCollider, false);
            var c2 = new Crash.Collider("circle", SatCollider, 0);
            
            expect(Crash.insert.called).to.not.be.ok();
            expect(Crash.insert.calledWith(c1)).to.not.be.ok();
            expect(Crash.insert.calledWith(c2)).to.not.be.ok();
            
            Crash.insert.restore();
        });
        
        
        describe("type", function() {
            it("should be defined", function() {
                expect(Collider.type).to.be.ok();
            });
            it("should be a string", function() {
                expect(Collider.type).to.be.a("string");
            });
            it("should equal the type argument", function() {
                expect(Collider.type).to.be("circle");
            });
        });

        describe("sat", function() {
            it("should be defined", function() {
                expect(Collider.sat).to.be.ok();
            });
            it("should be a SAT Collider", function() {
                expect(Collider.sat).to.have.key("pos");
                expect(Collider.sat.pos).to.be.a(Crash.Vector);
            });
            it("should equal the sat argument", function() {
                expect(Collider.sat).to.be(SatCollider);
            });
        });

        describe("data", function() {
            it("should equal the data argument", function() {
                expect(Collider.data).to.be("First Circle");
            });
        });

        describe("pos", function() {
            it("should be defined", function() {
                expect(Collider.pos).to.be.ok();
            });
            it("should be a Vector", function() {
                expect(Collider.pos).to.be.a(Crash.Vector);
            });
            it("should equal sat.pos", function() {
                expect(Collider.pos).to.be(Collider.sat.pos);
            });
        });

        describe("lastPos", function() {
            it("should be defined", function() {
                expect(Collider.lastPos).to.be.ok();
            });
            it("should be a Vector", function() {
                expect(Collider.lastPos).to.be.a(Crash.Vector);
            });
            it("should a clone of pos", function() {
                expect(Collider.lastPos).to.eql(Collider.pos);
            });
        });

        describe("lastCheckedPos", function() {
            it("should be defined", function() {
                expect(Collider.lastCheckedPos).to.be.ok();
            });
            it("should be a Vector", function() {
                expect(Collider.lastCheckedPos).to.be.a(Crash.Vector);
            });
            it("should a clone of pos", function() {
                expect(Collider.lastCheckedPos).to.eql(Collider.pos);
            });
        });

        describe("aabb", function() {
            it("should be defined", function() {
                expect(Collider.aabb).to.be.ok();
            });
            it("should be a Vector", function() {
                expect(Collider.aabb).to.be.an("object");
            });
            it("should be set correctly", function() {
                expect(Collider.aabb).to.eql({x1:-5, y1:-5, x2:5, y2:5});
            });
        });
    });
    
    
    
    
    
    
    
    /*************
     * PROTOTYPE *
     *************/
    
    
    describe("insert", function() {
        it("should be defined", function() {
            expect(Collider.insert).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.insert).to.be.a("function");
        });
        it("should call Crash.insert", function() {
            sinon.spy(Crash, "insert");
            Collider.insert();
            
            expect(Crash.insert.called).to.be.ok();
            expect(Crash.insert.callCount).to.be(1);
            expect(Crash.insert.calledWith(Collider)).to.be.ok();
            
            Crash.insert.restore();
        });
    });
    
    describe("remove", function() {
        it("should be defined", function() {
            expect(Collider.remove).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.remove).to.be.a("function");
        });
        it("should call Crash.remove", function() {
            sinon.spy(Crash, "remove");
            Collider.remove();
            
            expect(Crash.remove.called).to.be.ok();
            expect(Crash.remove.callCount).to.be(1);
            expect(Crash.remove.calledWith(Collider)).to.be.ok();
            
            Crash.remove.restore();
        });
    });
    
    describe("update", function() {
        it("should be defined", function() {
            expect(Collider.update).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.update).to.be.a("function");
        });
        it("should call Crash.update", function() {
            sinon.spy(Crash, "update");
            Collider.update();
            
            expect(Crash.update.called).to.be.ok();
            expect(Crash.update.callCount).to.be(1);
            expect(Crash.update.calledWith(Collider)).to.be.ok();
            
            Crash.update.restore();
        });
    });
    
    describe("updateAABB", function() {
        it("should be defined", function() {
            expect(Collider.updateAABB).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.updateAABB).to.be.a("function");
        });
        it("should call Crash.updateAABB", function() {
            sinon.spy(Crash, "updateAABB");
            Collider.updateAABB();
            
            expect(Crash.updateAABB.called).to.be.ok();
            expect(Crash.updateAABB.callCount).to.be(1);
            expect(Crash.updateAABB.calledWith(Collider)).to.be.ok();
            
            Crash.updateAABB.restore();
        });
    });
    
    describe("moved", function() {
        it("should be defined", function() {
            expect(Collider.moved).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.moved).to.be.a("function");
        });
        it("should call Crash.moved", function() {
            sinon.spy(Crash, "moved");
            Collider.moved();
            
            expect(Crash.moved.called).to.be.ok();
            expect(Crash.moved.callCount).to.be(1);
            expect(Crash.moved.calledWith(Collider)).to.be.ok();
            
            Crash.moved.restore();
        });
    });
    
    describe("search", function() {
        it("should be defined", function() {
            expect(Collider.search).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.search).to.be.a("function");
        });
        it("should call Crash.search", function() {
            sinon.spy(Crash, "search");
            Collider.search();
            
            expect(Crash.search.called).to.be.ok();
            expect(Crash.search.callCount).to.be(1);
            expect(Crash.search.calledWith(Collider)).to.be.ok();
            
            Crash.search.restore();
        });
    });
    
    describe("setData", function() {
        it("should be defined", function() {
            expect(Collider.setData).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.setData).to.be.a("function");
        });
        it("should set the data attribute", function() {
            var old = Collider.data;
            Collider.setData("new data");
            
            expect(Collider.data).to.be("new data");
            
            Collider.data = old;
        });
    });
    
    describe("getData", function() {
        it("should be defined", function() {
            expect(Collider.getData).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.getData).to.be.a("function");
        });
        it("should return the data attribute", function() {
            expect(Collider.getData()).to.be(Collider.data);
        });
    });
    
    describe("moveTo", function() {
        it("should be defined", function() {
            expect(Collider.moveTo).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.moveTo).to.be.a("function");
        });
        it("should update the position correctly", function() {
            var oldPos = Collider.pos.clone();
            Collider.moveTo(100, 100);
            
            expect(Collider.pos.x).to.be(100);
            expect(Collider.pos.y).to.be(100);
            
            Collider.moveTo(oldPos.x, oldPos.y);
        });
        it("should call moved", function() {
            sinon.spy(Crash, "moved");
            var oldPos = Collider.pos.clone();
            Collider.moveTo(100, 100);
            
            expect(Crash.moved.called).to.be.ok();
            expect(Crash.moved.callCount).to.be(1);
            expect(Crash.moved.calledWith(Collider)).to.be.ok();
            
            Crash.moved.restore();
            Collider.moveTo(oldPos.x, oldPos.y);
        });
    });
    
    describe("moveBy", function() {
        it("should be defined", function() {
            expect(Collider.moveBy).to.be.ok();
        });
        it("should be a function", function() {
            expect(Collider.moveBy).to.be.a("function");
        });
        it("should update the position correctly", function() {
            var oldPos = Collider.pos.clone();
            Collider.moveBy(100, 100);
            
            expect(Collider.pos.x).to.be(100);
            expect(Collider.pos.y).to.be(100);
            
            Collider.moveTo(oldPos.x, oldPos.y);
        });
        it("should call moved", function() {
            sinon.spy(Crash, "moved");
            var oldPos = Collider.pos.clone();
            Collider.moveBy(100, 100);
            
            expect(Crash.moved.called).to.be.ok();
            expect(Crash.moved.callCount).to.be(1);
            expect(Crash.moved.calledWith(Collider)).to.be.ok();
            
            Crash.moved.restore();
            Collider.moveTo(oldPos.x, oldPos.y);
        });
    });
});











/***********
 * POLYGON *
 ***********/


describe("Polygon", function() {
    var Polygon;
    
    before(function() {
        Crash.reset();
        Polygon = new Crash.Polygon(new Crash.V, [new Crash.V, new Crash.V(5,0), new Crash.V(2,3)], false, "First Polygon");
    });
    
    describe("constructor", function() {
        it("should inherit from Collider", function() {
            expect(Polygon).to.be.a(Crash.Collider);
        });
        it("should call Collider", function() {
            sinon.spy(Crash, "insert");
            var pos = new Crash.V;
            var polygon = new Crash.Polygon(pos, [new Crash.V, new Crash.V(5,0), new Crash.V(2,3)], true, "Second Polygon");
            
            expect(polygon.type).to.be("polygon");
            expect(polygon.pos).to.be(pos);
            expect(polygon.data).to.be("Second Polygon");
            expect(Crash.insert.called).to.be.ok();
            expect(Crash.insert.callCount).to.be(1);
            expect(Crash.insert.calledWith(polygon)).to.be.ok();
            
            Crash.insert.restore();
        });
    });
    
    describe("setPoints", function() {
        it("should be defined", function() {
            expect(Polygon.setPoints).to.be.ok();
        });
        it("should be a function", function() {
            expect(Polygon.setPoints).to.be.a("function");
        });
        it("should call sat.setPoints", function() {
            var old = Polygon.sat.points;
            var points = [new Crash.V(1,1), new Crash.V(5,3), new Crash.V(10,4), new Crash.V(2,2)];
            sinon.spy(Polygon.sat, "setPoints");
            Polygon.setPoints(points);
            
            expect(Polygon.sat.setPoints.called).to.be.ok();
            expect(Polygon.sat.setPoints.callCount).to.be(1);
            expect(Polygon.sat.setPoints.calledWith(points)).to.be.ok();
            
            Polygon.sat.setPoints.restore();
            Polygon.setPoints(old);
        });
        it("should call moved", function() {
            var old = Polygon.sat.points;
            var points = [new Crash.V(1,1), new Crash.V(5,3), new Crash.V(10,4), new Crash.V(2,2)];
            sinon.spy(Crash, "moved");
            Polygon.setPoints(points);
            
            expect(Crash.moved.called).to.be.ok();
            expect(Crash.moved.callCount).to.be(1);
            expect(Crash.moved.calledWith(Polygon)).to.be.ok();
            
            Crash.moved.restore();
            Polygon.setPoints(old);
        });
    });
    
    describe("setAngle", function() {
        it("should be defined", function() {
            expect(Polygon.setAngle).to.be.ok();
        });
        it("should be a function", function() {
            expect(Polygon.setAngle).to.be.a("function");
        });
        it("should call sat.setAngle", function() {
            var old = Polygon.sat.angle;
            sinon.spy(Polygon.sat, "setAngle");
            Polygon.setAngle(20);
            
            expect(Polygon.sat.setAngle.called).to.be.ok();
            expect(Polygon.sat.setAngle.callCount).to.be(1);
            expect(Polygon.sat.setAngle.calledWith(20)).to.be.ok();
            
            Polygon.sat.setAngle.restore();
            Polygon.setAngle(old);
        });
        it("should call moved", function() {
            var old = Polygon.sat.angle;
            sinon.spy(Crash, "moved");
            Polygon.setAngle(20);
            
            expect(Crash.moved.called).to.be.ok();
            expect(Crash.moved.callCount).to.be(1);
            expect(Crash.moved.calledWith(Polygon)).to.be.ok();
            
            Crash.moved.restore();
            Polygon.setAngle(old);
        });
    });
    
    describe("setOffset", function() {
        it("should be defined", function() {
            expect(Polygon.setOffset).to.be.ok();
        });
        it("should be a function", function() {
            expect(Polygon.setOffset).to.be.a("function");
        });
        it("should call sat.setOffset", function() {
            var old = Polygon.sat.offset;
            sinon.spy(Polygon.sat, "setOffset");
            Polygon.setOffset(20);
            
            expect(Polygon.sat.setOffset.called).to.be.ok();
            expect(Polygon.sat.setOffset.callCount).to.be(1);
            expect(Polygon.sat.setOffset.calledWith(20)).to.be.ok();
            
            Polygon.sat.setOffset.restore();
            Polygon.setOffset(old);
        });
        it("should call moved", function() {
            var old = Polygon.sat.offset;
            sinon.spy(Crash, "moved");
            Polygon.setOffset(20);
            
            expect(Crash.moved.called).to.be.ok();
            expect(Crash.moved.callCount).to.be(1);
            expect(Crash.moved.calledWith(Polygon)).to.be.ok();
            
            Crash.moved.restore();
            Polygon.setOffset(old);
        });
    });
    
    describe("rotate", function() {
        it("should be defined", function() {
            expect(Polygon.rotate).to.be.ok();
        });
        it("should be a function", function() {
            expect(Polygon.rotate).to.be.a("function");
        });
        it("should call sat.rotate", function() {
            sinon.spy(Polygon.sat, "rotate");
            Polygon.rotate(20);
            
            expect(Polygon.sat.rotate.called).to.be.ok();
            expect(Polygon.sat.rotate.callCount).to.be(1);
            expect(Polygon.sat.rotate.calledWith(20)).to.be.ok();
            
            Polygon.sat.rotate.restore();
            Polygon.rotate(-20);
        });
        it("should call moved", function() {
            sinon.spy(Crash, "moved");
            Polygon.rotate(20);
            
            expect(Crash.moved.called).to.be.ok();
            expect(Crash.moved.callCount).to.be(1);
            expect(Crash.moved.calledWith(Polygon)).to.be.ok();
            
            Crash.moved.restore();
            Polygon.rotate(-20);
        });
    });
    
});










/**********
 * CIRCLE *
 **********/


describe("Circle", function() {
    
    it("should inherit from Collider", function() {
        var circle = new Crash.Circle(new Crash.V, 5);
        expect(circle).to.be.a(Crash.Collider);
    });
    it("s constructor should call Collider", function() {
        sinon.spy(Crash, "insert");
        var pos = new Crash.V;
        var circle = new Crash.Circle(pos, 5, true, "First Circle");

        expect(circle.type).to.be("circle");
        expect(circle.pos).to.eql(pos);
        expect(circle.data).to.be("First Circle");
        expect(Crash.insert.called).to.be.ok();
        expect(Crash.insert.callCount).to.be(1);
        expect(Crash.insert.calledWith(circle)).to.be.ok();

        Crash.insert.restore();
    });
    
});











/*********
 * POINT *
 *********/



describe("Point", function() {
    
    it("should inherit from Collider", function() {
        var point = new Crash.Point(new Crash.V);
        expect(point).to.be.a(Crash.Collider);
    });
    it("s constructor should call Collider", function() {
        sinon.spy(Crash, "insert");
        var pos = new Crash.V;
        var point = new Crash.Point(pos, true, "First Point");

        expect(point.type).to.be("point");
        expect(point.pos).to.eql(pos);
        expect(point.data).to.be("First Point");
        expect(Crash.insert.called).to.be.ok();
        expect(Crash.insert.callCount).to.be(1);
        expect(Crash.insert.calledWith(point)).to.be.ok();

        Crash.insert.restore();
    });
    
});














/*******
 * BOX *
 *******/


describe("Box", function() {
    
    it("should inherit from Collider", function() {
        var box = new Crash.Box(new Crash.V, 5, 5);
        expect(box).to.be.a(Crash.Collider);
    });
    it("s constructor should call Collider", function() {
        sinon.spy(Crash, "insert");
        var pos = new Crash.V;
        var box = new Crash.Box(pos, 5, 5, true, "First Box");

        expect(box.type).to.be("box");
        expect(box.pos).to.eql(pos);
        expect(box.data).to.be("First Box");
        expect(Crash.insert.called).to.be.ok();
        expect(Crash.insert.callCount).to.be(1);
        expect(Crash.insert.calledWith(box)).to.be.ok();

        Crash.insert.restore();
    });
    
});
