var expect = require("expect.js");
var Crash = require("../src/index.js");



describe("Crash", function() {
    
    describe("attributes", function() {
        
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
    });
    
});