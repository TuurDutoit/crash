var expect = require("expect.js");
var Crash = require("../src/index.js");



describe("Crash", function() {
    
    describe("attributes", function() {
        it("should expose RBush", function() {
            expect(Crash.RBush).to.be.ok();
            expect(Crash.RBush).to.be.a("function");
        });
        
        it("should expose SAT", function() {
            expect(Crash.SAT).to.be.ok();
            expect(Crash.SAT).to.be.an("object");
        });
        
        it("should expose Vector, which should equal SAT.Vector", function() {
            expect(Crash.Vector).to.be.ok();
            expect(Crash.Vector).to.equal(Crash.SAT.Vector);
        });
        
        it("should expose V, which should equal SAT.Vector", function() {
            expect(Crash.V).to.be.ok();
            expect(Crash.V).to.equal(Crash.SAT.Vector);
        });
        
        it("should expose Response, which should equal SAT.Response", function() {
            expect(Crash.Response).to.be.ok();
            expect(Crash.Response).to.equal(Crash.SAT.Response);
        });
        
        it("should expose a cancel() function", function() {
            expect(Crash.cancel).to.be.ok();
            expect(Crash.cancel).to.be.a("function");
        });
        
        it("should expose maxChecks, which should be 100 by default", function() {
            expect(Crash.maxChecks).to.be.ok();
            expect(Crash.maxChecks).to.be.a("number");
            expect(Crash.maxChecks).to.equal(100);
        });
        
        it("should expose RESPONSE, which should be a Response", function() {
            expect(Crash.RESPONSE).to.be.ok();
            expect(Crash.RESPONSE).to.be.a(Crash.Response);
        });
        
        it("should expose onCollision", function() {
            expect(Crash.onCollision).to.be.ok();
            expect(Crash.onCollision).to.be.a("function");
        });
        
        it("should expose rbush, which is null by default", function() {
            expect(Crash.rbush).to.be(null);
        });
        
        it("should expose __notYetInserted, which should be an Array", function() {
            expect(Crash.__notYetInserted).to.be.ok();
            expect(Crash.__notYetInserted).to.be.an("array");
        });
        
        it("should expose __moved, which should be an Array", function() {
            expect(Crash.__moved).to.be.ok();
            expect(Crash.__moved).to.be.an("array");
        });
    });
    
});