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
    });
    
});