if(typeof require === "function") {
    var expect = require("expect.js");
    var sinon = require("sinon");
    var Crash = require("../crash.js");
}



describe("Crash", function() {

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

    describe("cancel", function() {
        it("should be defined", function() {
            expect(Crash.cancel).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.cancel).to.be.a("function");
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


    describe("RESPONSE", function() {
        it("should be defined", function() {
            expect(Crash.RESPONSE).to.be.ok();
        });
        it("should be a Response", function() {
            expect(Crash.RESPONSE).to.be.a(Crash.Response);
        });
    });

    describe("onCollision", function() {
        it("should expose onCollision", function() {
            expect(Crash.onCollision).to.be.ok();
        });
        it("should be a function", function() {
            expect(Crash.onCollision).to.be.a("function");
        });
    });

    describe("rbush", function() {
        it("should be null (default)", function() {
            expect(Crash.rbush).to.be(null);
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
    
    describe("updateAABB", function() {
        it("should be defined", function() {
            expect(Crash.updateAABB).to.be.ok();
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
        it("should update the AABB correctly", function() {
            var collider = new Crash.Polygon(new Crash.V, [new Crash.V(0,0), new Crash.V(5,0), new Crash.V(3,2)]);
            Crash.updateAABBPolygon(collider);
          
            expect(collider.aabb).to.eql({x1:0, y1:0, x2:5, y2: 2});
        });
    });

    describe("updateAABBCircle", function() {
        it("should update the AABB correctly", function() {
            var collider = new Crash.Circle(new Crash.V, 5);
            Crash.updateAABBCircle(collider);

            expect(collider.aabb).to.eql({x1:-5, y1:-5, x2:5, y2: 5});
        });
    });

    describe("updateAABBPoint", function() {
        it("should update the AABB correctly", function() {
            var collider = new Crash.Point(new Crash.V);
            Crash.updateAABBPoint(collider);

            expect(collider.aabb).to.eql({x1:0, y1:0, x2:0, y2: 0});
        });
    });

    describe("updateAABBBox", function() {
        it("should update the AABB correctly", function() {
            var collider = new Crash.Box(new Crash.V, 5, 2);
            Crash.updateAABBBox(collider);

            expect(collider.aabb).to.eql({x1:0, y1:0, x2:5, y2: 2});
        });
    });
});