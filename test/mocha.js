if(typeof require === "function") {
    var expect = require("expect.js");
    var sinon = require("sinon");
    var Crash = require("../crash.js");
}



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

    describe("maxChecks", function() {
        it("should be defined", function() {
            expect(Crash.maxChecks).to.be.ok();
        });
        it("should be a number", function() {
            expect(Crash.maxChecks).to.be.a("number");
        });
        it("should equal 100 (default)", function() {
            expect(Crash.maxChecks).to.equal(100);
        });
    });
    
    describe("rbush", function() {
        it("should be null (default)", function() {
            expect(Crash.rbush).to.be(null);
        }); 
    });

    describe("RESPONSE", function() {
        it("should be defined", function() {
            expect(Crash.RESPONSE).to.be.ok();
        });
        it("should be a Response", function() {
            expect(Crash.RESPONSE).to.be.a(Crash.Response);
        });
    });
    
    describe("BREAK", function() {
        it("should be false by default", function() {
            expect(Crash.BREAK).to.be(false);
        });
    });
    
    describe("__listeners", function() {
        it("should expose __listeners", function() {
            expect(Crash.__listeners).to.be.ok();
        });
        it("should be an array", function() {
            expect(Crash.__listeners).to.eql([]);
        });
    });

    describe("__notYetInserted", function() {
        it("should be defined", function() {
            expect(Crash.__notYetInserted).to.be.ok();
        });
        it("should be an array", function() {
            expect(Crash.__notYetInserted).to.be.an("array");
        });
    });

    describe("__moved", function() {
        it("should be defined", function() {
            expect(Crash.__moved).to.be.ok();
        });
        it("should be an array", function() {
            expect(Crash.__moved).to.be.an("array");
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
    });

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /***********
     * METHODS *
     ***********/
    
    
    describe("init", function() {
        it("should be defined", function() {
            expect(Crash.init).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.init).to.be.a("function");
        });
        it("should create Crash.rbush", function() {
            Crash.init();
            expect(Crash.rbush).to.be.ok();
            expect(Crash.rbush).to.be.a(Crash.RBush);
        });
        it("should set the right maxEntries", function() {
            Crash.init(5);
            expect(Crash.rbush._maxEntries).to.be(5);
        });
        it("should set maxEntries to 9 by default", function() {
            Crash.init();
            expect(Crash.rbush._maxEntries).to.be(9);
        });
    });
    
    describe("insert", function() {
        it("should be defined", function() {
            expect(Crash.insert).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.insert).to.be.a("function");
        });
        it("should add the collider to __notYetInserted when rbush is not defined", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.rbush = null;
            Crash.__notYetInserted = [];
            Crash.insert(collider);
            
            expect(Crash.__notYetInserted).to.eql([collider]);
        });
        it("should add the collider to rbush when it is defined", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.__notYetInserted = [];
            Crash.reset();
            Crash.insert(collider);
            
            expect(Crash.rbush.all()).to.eql([collider]);
        });
    });
    
    describe("remove", function() {
        it("should be defined", function() {
            expect(Crash.remove).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.remove).to.be.a("function");
        });
        it("should remove the collider from rbush if it is defined", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.reset();
            Crash.insert(collider);
            Crash.remove(collider);
            
            expect(Crash.rbush.all()).to.be.empty();
        });
        it("should remove the collider from __notYetInserted if rbush is not defined", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.rbush = null;
            Crash.__notYetInserted = [collider];
            Crash.remove(collider);
            
            expect(Crash.__notYetInserted).to.be.empty();
        });
        it("should not crash when the collider has not been inserted", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.rbush = null;
            Crash.__notYetInserted = [collider];
            var fn = function() {
                Crash.remove(collider);
            }
            
            expect(fn).to.not.throwError();
        });
    });
    
    describe("all", function() {
        it("should be defined", function() {
            expect(Crash.all).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.all).to.be.a("function");
        });
        it("should return __notYetInserted if rbush is not defined", function() {
            Crash.rbush = null;
            
            expect(Crash.all()).to.be(Crash.__notYetInserted);
        });
        it("should return rbush.all() if rbush is defined", function() {
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
        it("should not crash if rbush is not defined", function() {
            Crash.rbush = null;
            var c1 = new Crash.Point(new Crash.V);
            var fn = function() {
                Crash.search(c1);
            }
            
            expect(fn).to.not.throwError();
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
            Crash.__notYetInserted = ["content"];
            Crash.clear();

            expect(Crash.all()).to.be.empty();
            expect(Crash.__moved).to.be.empty();
            expect(Crash.__notYetInserted).to.be.empty();
        });
        it("should not crash if rbush is not defined", function() {
            Crash.rbush = null;
            var fn = function() {
                Crash.clear();
            }
            
            expect(fn).to.not.throwError();
        });
    });
    
    describe("moved", function() {
        it("should be defined", function() {
            expect(Crash.moved).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.moved).to.be.a("function");
        });
        it("should add the collider to __moved", function() {
            var collider = new Crash.Point(new Crash.V);
            Crash.moved(collider);
            
            expect(Crash.__moved).to.contain(collider);
        });
        it("should not add the collider twice", function() {
            var collider = new Crash.Point(new Crash.V);
            Crash.__moved = [];
            Crash.moved(collider);
            Crash.moved(collider);
            
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
        it("should not crash when rbush is not defined", function() {
            Crash.rbush = null;
            var collider = new Crash.Point(new Crash.V);
            var fn = function() {
                Crash.update(collider);
            }
            
            expect(fn).to.not.throwError();
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
            var collider = new Crash.Polygon(new Crash.V, [new Crash.V(0,0), new Crash.V(5,0), new Crash.V(3,2)]);
            Crash.updateAABBPolygon(collider);
          
            expect(collider.aabb).to.eql({x1:0, y1:0, x2:5, y2: 2});
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
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.updateAABBCircle(collider);

            expect(collider.aabb).to.eql({x1:-5, y1:-5, x2:5, y2: 5});
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
            var collider = new Crash.Point(new Crash.V);
            Crash.updateAABBPoint(collider);

            expect(collider.aabb).to.eql({x1:0, y1:0, x2:0, y2: 0});
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
            var collider = new Crash.Box(new Crash.V, 5, 2);
            Crash.updateAABBBox(collider);

            expect(collider.aabb).to.eql({x1:0, y1:0, x2:5, y2: 2});
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
        it("should update the collider", function() {
            Crash.reset();
            var collider = new Crash.Point(new Crash.V, true);
            sinon.spy(Crash, "update");
            Crash.testAll(collider);
            
            expect(Crash.update.called).to.be.ok();
            expect(Crash.update.callCount).to.be(1);
            
            Crash.update.restore();
        });
        it("should call update before search", function() {
            Crash.reset();
            var collider = new Crash.Point(new Crash.V, true);
            sinon.spy(Crash, "update");
            sinon.spy(Crash.rbush, "search");
            Crash.testAll(collider);
            
            expect(Crash.update.calledBefore(Crash.rbush.search)).to.be.ok();
            
            Crash.update.restore();
            Crash.rbush.search.restore();
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
        it("should not call __onCollision if the overlap is too small", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true);
            var c2 = new Crash.Box(new Crash.V(4.9, 0), 5, 5, true);
            sinon.spy(Crash, "__onCollision");
            Crash.testAll(c1);
            
            expect(Crash.__onCollision.called).to.be(false);
            
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
        it("should not do more checks than prescribed by maxChecks", function() {
            Crash.reset();
            var c1 = new Crash.Circle(new Crash.V, 5, true).moved();
            var c2 = new Crash.Point(new Crash.V(1, 0), true);
            Crash.onCollision(function(a, b, res, cancel) {
                //causes an endless loop, if not stopped by maxChecks
                a.moved();
            });
            var spy = sinon.spy(Crash, "testAll");
            Crash.maxChecks = 5;
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































/*************
 * COLLIDERS *
 *************/


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