Crash
=====
v2.0.2

Crash performs optimized 2D collisions, powered by [RBush] and [SAT.js], written in javascript.  
It's most obvious use-case is in game engines, but it's flexible enough to be used anywhere.  
Crash is perfectly happy in the browser and on Node.js.


## Contents
* [Contents](#contents)
* [Installation](#installation)
  * [Node.js or Browserify](#nodejs-or-browserify)
  * [Require.js](#requirejs)
  * [Browser](#browser-global)
* [Getting Started](#getting-started)
  * [Adding Colliders](#adding-colliders)
  * [Testing for collisions](#testing-for-collisions)
  * [Unleashing the power of Crash](#unleashing-the-power-of-crash)
  * [What kind of sorcery is this !?](#what-kind-of-sorcery-is-this-)
  * [But what's up with that `moved()`?](#but-whats-up-with-that-moved)
* [Contributing](#contributing)
* [Overview](#overview)
* [API](#api)
  * [Crash]
  * [AABB updates][crash.updateAABB()]
  * [Collision testing][crash.test()]
  * [Colliders][crash.Collider]
  * [Other][Listener]
* [License](#license)


## Installation
Just download one of the following files from this repo.

1. [crash.js]: full source, with comments and all (14.2kB).
2. [crash.min.js]: minified, ready to be used in production (6.1kB or 1.9kB gzipped).

Or get the code from [NPM] by typing the following command in a terminal (without the `$`):
```shell
$ npm install crash-colliders
```

You can find instruction on how to load Crash in your project below.  
When you have installed Crash, head over to the [Getting Started section][getting-started].

### Node.js or Browserify
Add the following snippet to your code:
```javascript
var Crash = require("crash-colliders");
```
Now, you can use the [API] on the `Crash` variable.

### Require.js
If you're using [require.js] in your project, use the following snippet to load Crash:
```javascript
define(["path/to/crash"], function(Crash) {
    // Your code...
});
```
Now, you can use the [API] on the `Crash` variable in your module.

### Browser Global
Add the following snippet to your HTML file:
```html
<script type="text/javascript" src="path/to/crash.js"></script>
```
Now, you can use the [API] on the global `Crash` variable (`window.Crash`).




## Getting Started
Before you can do anything useful with Crash, you have to create an instance. You can do this easily by calling:

```javascript
var crash = new Crash();
```

`new Crash()` accepts one argument, an options object. This initializes some options (obviously), but discussing them would lead us too far and it's optional, so just leave it out for now to use the defaults. Check the [API] for more info.

> __Fun Fact:__ In version 1.x, Crash was just an object, ready to go. As a result, you couldn't create instances of it and you were stuck with 1 Crash object for your whole application. Starting from version 2.0.0, Crash is a constructor that creates objects that work (almost) exactly as the Crash object from 1.x. This means that you will almost always work on a Crash __instance__ and never on the Crash constructor. The constructor does expose some methods, but those are also available on the prototype.

> __Important Fun Fact:__ Every Crash instance has its own Collider classes. This is necessary to make the `Collider.insert()`, `Collider.remove()`, `Collider.update()`, etc. work.


### Adding Colliders
Now that everything is ready to roll, let's add some colliders. All colliders in Crash inherit from the `crash.Collider` class, which provides some basic methods that perform household tasks, like moving, updating its AABB and testing collisions. That would lead us too far, though, so I refer to the full [API docs][API] for more info.  
All that stuff is awesome, but a `Collider` on its own isn't very useful: it doesn't have a shape. Before you can use a Collider, you have to give it a shape, but, luckily, Crash has some built-in ones for us. Let's try them out!

```javascript
var point =   new crash.Point  (new crash.Vector(0,0));
var circle =  new crash.Circle (new crash.Vector(5,2),  10);
var box =     new crash.Box    (new crash.Vector(-40,0), 10, 15);
var polygon = new crash.Polygon(new crash.Vector(3,7),  [new crash.Vector(0,0), new crash.Vector(5,0), new crash.Vector(2,3)]);
```

Wow, what's all that!? Let's clarify this step by step.

1. Each shape has its own constructor, e.g. a point is initialized with `crash.Point` etc.
2. The first argument to each constructor is a Vector, setting the base position for the Collider. So, for a Point, this would be its position, for a Circle it would be the center and for a Box it would be the bottom-left corner.
3. Some constructors take a few extra arguments:
 * Circle: the radius
 * Box: the width and height
 * Polygon: an array of Vectors, representing its corners, relative to the base position
4. All the above arguments are required.
5. These constructors also take two more (optional) arguments:
 * insert: a boolean indicating whether the collider should be inserted into RBush. More info on this is following in the next few steps.
 * data: some data to add to the collider. You can store anything you want here, but it doesn't do anything for Crash; it's just there for your convenience.

> __Fun Fact:__ the unit you use for the numbers is completely up to you. Crash only stores the numbers, you can interpret them as you wish, so you can use pixels, millimeters or even some game-specific unit you invented!

> __Another Fun Fact:__ it doesn't matter how you define `position` (e.g. top or bottom left corner for a Box etc.), as long as you use it consistently.

> __Important Fun Fact:__ there is a very important difference between Point and Vector: a Point is a Collider, so it can be used for collision checks. A Vector, on the other hand, is just an Object with `x` and `y` properties, used to define positions in Colliders, like the center of a Circle or the corners of a Polygon.


### Testing for collisions
Now that we have some colliders, we would probably like to know if they are colliding. To do this, we use the `crash.test()` method:

```javascript
if(crash.test(circle, box)) {
    alert("Oh my, we crashed!");
}
```

This is already quite nice, but not very useful: now we know that our colliders are touching, but we don't know how to undo this crash! Enter `Response`, the all-knowing crash guru.  
First, let's create one:

```javascript
var res = new crash.Response();
```

The Response class is copied from SAT, so for further information about the kind of info it provides, I refer to the [SAT.js docs][sat-docs].

Then, let's do a subtle change to our testing code:

```javascript
if(crash.test(circle, box, res)) {
    alert("Oh my, we crashed!");
}
```

Now, we can query the Response for some useful information and undo this embarassing crash:

```javascript
if(crash.test(circle, box, res)) {
    alert("Oh my, we crashed!");
    var overlap = res.overlapV;
    circle.moveBy(-overlap.x, -overlap.y);
}
```

And just like that, our colliders aren't touching anymore!

> __Fun Fact:__ you could also use circle.test(box, res). This uses `crash.test()` under the hood, but it's a little more concise.



### Unleashing the power of Crash

Wasn't that exciting!? Just wait for what's to come!  
I assume you don't want to plow through heaps of loops and complex code to do everything we did in the previous steps for *every* frame and *every* collider.  
That's where Crash's real power comes in. Let's `insert()` our colliders and get to some serious collision checking!

```javascript
crash.insert(point);
crash.insert(circle);
crash.insert(box);
crash.insert(polygon);
```

You could have achieved the same by passing `true` for the `insert` argument of the constructors, like I mentioned at the beginning.

> __Fun Fact:__ just like you can use `Collider.test()` instead of `crash.test()`, you can use `Collider.insert()`, as a convenience method.

Now that our colliders have been inserted, we can let Crash do all the hard work: it will do all the collision checks for us! And because Crash leverages the power of RBush, only the checks that make sense will actually be performed, which saves a lot of resources.

Before we can let Crash do anything, we would like to make sure it can report to us what it's doing, so we can react to collisions. To do that, we add a listener with `crash.onCollision()`. This listener will be called every time a collision occurs.

```javascript
var listener = function(a, b, res, cancel) {
    alert("Oh my, we crashed!");
}
crash.onCollision(listener);
```

Here, `a` and `b` are the colliders that are colliding, `res` is the all-knowing Response, and `cancel` is a function that cancels all further collision checks for this collider. This may be useful if you move the collider (rendering all the subsequent checks useless, as we will have to run them again for the new position) and/or when you use `crash.check()`, which we will cover in the next step.

> __Fun Fact:__ you can easily remove a listener with `crash.offCollision(listener)`. Just make sure you saved it somewhere when you added it, so you can pass it to `offCollision()` as an argument!

And now, we're ready for some serious stuff:

```javascript
crash.testAll(circle);
```

This runs collision checks for all inserted colliders that may be colliding with our circle.
As our circle is colliding with all the other colliders, except our box, the listener we added previously will be called once for `point` and once for `polygon`, but not for `box`. For every call, `a` equals `circle`, `b` the respective collider and `res` gives us some info about the collision.

> __Fun Fact:__ Note that, like with `crash.test()`, we can pass in a Response, but we don't have to. If we don't, Crash will make one for us and pass that around to the listeners. How convenient!



### What kind of sorcery is this !?
We can even go one step further: let's make Crash do __everything__!

For this to work, we need to make sure that we call `crash.moved()` on all the colliders that have moved:

> __Fun Fact:__ you probably already guessed: you can use `Collider.moved()` instead!

```
crash.moved(point);
crash.moved(circle);
```

This way, Crash will know it only has to call `testAll` for these colliders, the ones that have moved.

And, now, ladies and gentleman, the holy grail of collision checking:

```javascript
crash.check();
```

And it's done. All checks have run, our colliders are where they should be. With just one function call. Such wow.


#### But what's up with that `moved()`?
All the built-in methods (like `moveTo`, `setOffset` and `rotate`) already call this for you, so you don't have to worry about this. You should only worry when you insert a collider for the first time. Normally, when designing your game (or anything else), you would make sure your colliders aren't already colliding when you load them. When this is the case, though, you can call `crash.checkAll()` just after you loaded your colliders. This will do the same as `check()`, but for all colliders, not just the ones that moved. Neat, isn't it?



## Contributing

All contributions are very welcome!  
Typos, bug fixes, code cleanup, documentation, tests, a website, you name it!

Questions and feature requests belong in the [issue tracker], __with the right tags__.













## Overview
### Or: about the check() loop

> In this section, I'll explain the basics of Crash, how it works, how the methods fit together and what the basic workflow is.

In this section, I'll assume you're using Crash to power a game (engine), because that's probably what the majority will be using it for, and not having to cover all the edge cases makes it easier to explain.

The very heart of Crash is its [crash.check()] loop: this is where all the magic is happening. During the update cycle of your game (engine), you can move your objects around freely (probably using some physics) and not care about collisions; just move them to where you would like them to be. You can move the Colliders either by using the move functions (`moveBy`, `rotate`,...), which is the easiest way, or by setting their `x` and `y` coordinates. If you're using the latter, you have to be cautious.  
After every move, a few things have to happen:

1. The AABB of the Collider must be updated. Use [crash.updateAABB()] to achieve this.
2. The Collider's position in RBush must be updated. Use [crash.update()] for this, but be aware that this calls also [crash.updateAABB()]! You could also manually `remove()` and re-`insert()` the collider in `rbush`, just like `update()` is doing.
3. The Collider must be added to [crash.__moved] in order for it to be collision checked during the next [crash.check()]. Use [crash.addToMoved()] to achieve this. You could also add it manually, but make sure you're no adding it twice (that would be a waste of resources).

1\. and 2. can be bundled in one [crash.update()] call, and all the above can be bundled in one [crash.moved()] call, which is the method the move functions are calling for you. This is why using the move functions is the easiest: all this is done for you.

When all your Colliders are in place, just call [crash.check()]. This will iterate over [crash.__moved] and do the following for every Collider (this happens in [crash.testAll()]). Let's call this loop A.

First, all the possible collisions are retrieved using RBush, with a [crash.search()]. Then, for every possibly colliding collider (loop B), Crash will test for a collision using SAT, and if there is, it will call [crash.__onCollision()], which in turn calls the [Listener]s, passing in the two Colliders and the Response of the collision. If, during this [crash.__onCollision()], [crash.BREAK] is set to true, loop B is stopped. This can happen when, for example, the first collider (that will be the one passed from A to B) is moved inside a [Listener]; the Collider will then be added to [crash.__moved] and thus be checked in the next iteration of loop A, making everything that happens in B useless (it will be done again in the next iteration of A, and the possible collisions may not be accurate anymore). This doesn't happen when the second Collider passed to [Listener]s (the one 'generated' by B) is moved, because it will just be added to [crash.__moved] to be handled in the next iteration of A, but doesn't render everything happening inside B useless (it's the first Collider that is our focus).  
At the end of loop B (so, for every iteration of A), the Collider passed from A to B has its `lastPos` set to a copy of its position at that moment.  
Then, [crash.testAll()] \(loop B\) returns, and the next iteration of A begins.

At the end of [crash.check()] \(loop A\), all the Colliders that have been processed have their `lastCheckedPos` set to a copy of their position at that time.


I hope this has helped to clarify some of Crash's misty bits. If it hasn't, let me know and/or take a look at the source: it's not that complex and it's not that much.






















## API



### Crash
This is the main object, returned by `require()`, injected by `defined()` or set as `window.Crash`. Anything related to Crash sits in this namespace.  
Create a new instance of Crash like this:

```javascript
var crash = new Crash(options);
```

Where `options` is an object as defined below.

### \_\_options : *object*

*Private*  
The (normalized) options passed to the constructor. Three (optional) properties are being used by Crash:

 * [maxEntries][crash.options.maxEntries]
 * [maxChecks][crash.options.maxChecks]
 * [overlapLimit][crash.options.overlapLimit]

#### maxEntries : *number* (9)
This option is passed to RBush, so I refer to the [RBush docs](rbush-docs-maxentries) for more info on this.  
Default: 9

#### maxChecks : *number* (100)
The maximum amount of times to run [crash.testAll()] during [crash.check()]. See [crash.check()] for more info.  
This sets [crash.MAX_CHECKS].  
Default: 100

#### overlapLimit : *number|false* (0.5)
The minimum amount two [crash.Collider]s should overlap to call the [Listener]s. If falsy, `overlapLimit` will not be taken into account. See [crash.testAll()] for more info.  
This sets [crash.OVERLAP_LIMIT].  
Default: 0.5

### crash.RBush : *function*
The RBush constructor, as returned by the rbush module.

### crash.SAT : *object*
The SAT object, as returned by the SAT.js module.

### crash.Vector : *constructor*
*Alias:* [crash.V]  
Represents a vector, used by the Colliders to define their positions and corners, and by SAT to perform its calculations.  
I refer to the [SAT docs][sat-docs] for the API definition.

### crash.V : *constructor*
*Alias:* [crash.Vector]  
Alias for [crash.Vector].

### crash.Response : *constructor*
Provides information about a collision, like overlap distance and direction.  
I refer to the [SAT docs][sat-docs] for the API definition.

### crash.rbush : *RBush*
The RBush instance that holds the colliders. This is (mostly) used internally to optimize collision checks.  
For further documentation, please see the [RBush docs][rbush-docs].

### crash.RESPONSE : *Response*
Used by the testing functions. When no Response has been passed to them, they use this instead.

### crash.BREAK : *boolean*
Whether to stop the currently running check loop. This is set to `true` by [crash.cancel()]. See [crash.testAll()] for more info.

### crash.MAX\_CHECKS : *number*
The maximum amount of times to run [crash.testAll()] during [crash.check()]. See [crash.check()] for more info.

### crash.OVERLAP_LIMIT : *number*
The minimum amount two [crash.Collider]s should overlap to call the [Listener]s. If falsy, `OVERLAP_LIMIT` will not be taken into account. See [crash.testAll()] for more info.

### crash.\_\_listeners : *Array.\<function\>*
*Private*  
An array of functions to call when a collision occurs. You can add to this with [crash.onCollision()].

### crash.\_\_moved : *Array.\<Collider\>*
*Private*  
An array of colliders that have moved since the last [crash.check()]. This is used internally by [crash.check()] to optimize collision checks. For more info, see [crash.check()].








### crash.insert (Collider collider) - .
__collider:__ *Collider*. The [crash.Collider] to insert.  
__*return:*__ *Crash*. For chaining.

Inserts [crash.Collider]s in [crash.rbush].
Before [crash.Collider]s turn up in [crash.search()]s or in collision checks (performed by [crash.testAll()]), you must [crash.insert()] them.  
You can use [crash.remove()] to get them out.

```javascript
var circle = new crash.Circle(new crash.V(0,0), 5);
// circle won't turn up in searches and collision checks
crash.insert(circle);
// Now it will!
```


### crash.remove (Collider collider) - .
__collider:__ *Collider*. The [crash.Collider] to remove.  
__*return:*__ *Crash*. For chaining.

Removes [crash.Collider]s from [crash.rbush].

```javascript
crash.insert(collider);
// collider will turn up in searches and collision checks
crash.remove(collider);
// now, it won't, anymore
```


### crash.all () - *Collider[]*
__*return:*__ *Array.\<Collider\>*. An array containing all the [crash.Collider]s that have been [crash.insert()]ed.

Returns all the [crash.Collider]s that have been [crash.insert()]ed.

```javascript
var allColliders = crash.all();
```


### crash.search (Collider collider) - *Collider[]*
__collider:__ *Collider*. The [crash.Collider] to base the search on.  
__*return:*__ *Array.\<Collider\>*. An array of colliders that may be colliding with `collider`.

Runs `rbush.search()` based on a [crash.Collider], which will look for all [crash.Collider]s that have (nearly) colliding axis-aligned bounding boxes (AABBs). This search is optimized by an RTree (that's a special algorithm, designed for this), implemented by RBush.

RBush usually requires an array of AABB coordinates to perform a search, so [crash.search()] translates the [crash.collider]'s `aabb` coordinates to the correct array.

The array returned by `rbush.search()` __may__ contain one or more references of `collider` (that's the one passed into the method). [crash.search()] filters out these referenc

```javascript
var possibleCollisions = crash.search(collider);
// returns an array containing closeByCollider, but not veryFarAwayCollider
```


### crash.clear() - .
__*return:*__ *Crash*. For chaining.

Clears `crash` from all [crash.Collider]s. This calls `rbush.clear()`, and clears [crash.__moved].


### crash.addToMoved (Collider collider) - .
__collider:__ *Collider*. The [crash.Collider] that should be added to [crash.__moved].  
__*return:*__ *Crash*. For chaining.

Adds a [crash.Collider] to [crash.__moved], so it gets collision checked during the next [crash.check()] round. This does not update the Collider's AABB! If you want to do both, use [crash.moved()] instead.  
Note that the built-in move methods of Colliders (`moveBy`, `rotate`,...) already call [crash.moved()] \(which calls `addToMoved()`\) for you.

```javascript
collider.pos.x += 5;
// Is not taken into account in the next check() round

crash.moved(collider);
// Now it will
```

```javascript
collider.moveBy(5,0);
// crash.moved(collider), and thus crash.addToMoved(collider), has already been called for you
```


### crash.update (Collider collider) - .
__collider:__ *Collider*. The [crash.Collider] that should be updated.  
__*return:*__ *Crash*. For chaining.

Updates the `aabb` of the [crash.Collider] \(using [crash.updateAABB()]\) and updates its position in RBush.


### crash.moved (Collider collider) - .
__collider:__ *Collider*. The [crash.Collider] that has moved.  
__*return:*__ *Crash*. For chaining.

Notifies `crash` that a [crash.Collider] has moved. This calls [crash.update()] and [crash.addToMoved()], so all the housekeeping is done in one function call.
Note that this is already taken care of for you when using the built-in move methods of the Colliders (`moveBy`, `rotate`,...).

```javascript
collider.pos.x += 5;
// Is not taken into account in the next check() round
// and the aabb is not updated

crash.moved(collider);
// Now it will
// and its aabb is updated
```

```javascript
collider.moveBy(5,0);
// crash.move(collider) has already been called for you
```


### crash.reset () - .
__*return:*__ *Crash*. For chaining.

Resets `crash` with the options passed to the constructor. This basically calls [crash.clear()] and resets some variables.  
This method is primarily used by the test suite.


### crash.cancel () - *false*
__*return:*__ *false*. Makes it easy to stop event propagation in some EventEmitters.

This method cancels the current check loop. When you call [crash.check()], a loop will start, which calls [crash.testAll()] for every collider that has moved since the last [crash.check()]. Then, [crash.testAll()] will do a [crash.search()] and perform all the necessary checks, calling [crash.__onCollision()] for every collision. Now, if you move a collider during the [crash.testAll()] loop (i.e. in a [Listener]), it will be added to [crash.__moved] and all the following collision checks become unnecessary, because they will run again in the next iteration of the [crash.check()] loop.  
That's where [crash.cancel()] comes in. When you move a collider inside a [Listener], call [crash.cancel()] (or the fourth argument of the listener, which is the exact same function) to cancel all further (unnecessary) collision checks.

```javascript
crash.onCollision(function(a, b, res, cancel) {
    a.moveBy(-res.overlapV.x, -res.overlapV.y);
    cancel();
});
```

> __Important Note:__ all the above is only valid for the *first* collider (named `a`), because that's the one that collision checks are run for. If yo move `b`, nothing has to be done.

```javascript
crash.onCollision(function(a, b, res, cancel) {
    b.moveBy(res.overlapV.x, res.overlapV.y);
});
```


### crash.getTestString (string type1, string type2) - *string*
__type1:__ *string*. The type of the first [crash.Collider].  
__type2:__ *string*. The type of the second [crash.Collider].  
__*return:*__ *string*. The appropriate SAT testing string.

Gives you the right SAT method name to test for a collision between two [crash.Collider]s. Be sure to pass [Collider.type], ans not a [crash.Collider]!

```javascript
var circle = new crash.Circle(new crash.Vector(0,0), 10);
var box = new crash.Box(new crash.Vector(5,5), 7, 15);

var string = crash.getTestString(circle.type, box.type); // 'testCirclePolygon'
```


### crash.onCollision (function listener) - .
__listener:__ *function*. The [Listener] to add to the `collision` event. See [Listener] for more info.  
__*return:*__ *Crash*. For chaining.

Adds a [Listener] to [crash.__listeners] and will be called every time a collision occurs. See [Listener] for more info.

```javascript
var listener = function(a, b, res, cancel) {
    alert("Oh my, there is a collision!");
    a.moveBy(-res.overlapV.x, -res.overlapV.y);
}
crash.onCollision(listener);
```


### crash.offCollision (function listener) - .
__listener:__ *function*. The [Listener] to remove.
__*return:*__ *Crash*. For chaining.

Removes a [Listener] from the `collision` event. So, this is the opposite of [crash.onCollision()].

```javascript
crash.offCollision(listener);
```


### crash.__onCollision (Collider a, Collider b, Response res) - .
*Private*  
__a:__ *Collider*. The [crash.Collider] that collides with `b`.  
__b:__ *Collider*. The [crash.Collider] that collides with `a`.  
__res:__ *Response*. The [crash.Response] for thsi collision.  
__*return:*__ *Crash*. For chaining.

Calls all the [Listener]s when a `collision` event occurs. It takes three arguments: the two [crash.Collider]s that are colliding and the [crash.Response] for this collision. It will take care of injecting [crash.cancel()] by itself.  
Intended for private use.


### crash.extend (function child, function base) - *undefined*
__child:__ *function*. This constructor that inherits from `parent`.  
__base:__ *function*. The constructor that is the parent of `child`.  
__*return:*__ *undefined*.

Extends the prototype chain of `base` to `child`, so child inherits from base. This is used to make the collider classes inherit from `Collider`.

```javascript
var Child = function(){}
var Parent = function(){}
crash.extend(Child, Parent);
```








### crash.updateAABB (Collider collider) - .
__collider:__ *Collider*. The [crash.Collider] whose AABB should be updated.  
__*return:*__ *Crash*. For chaining.

Calls [crash.updateAABBPolygon()], [crash.updateAABBBox()], [crash.updateAABBCircle()] or [crash.updateAABBPoint()] based on `collider`'s `type`.


### crash.updateAABBPolygon (Polygon collider) - .
__collider:__ *Polygon*. The [crash.Polygon] whose AABB should be updated.  
__*return:*__ *Crash*. For chaining.

Updates a [crash.Polygon]'s `aabb` attribute ([Collider.aabb]), based on its position and size.


### crash.updateAABBBox (Box collider) - .
__collider:__ *Box*. The [crash.Box] whose AABB should be updated.  
__*return:*__ *Crash*. For chaining.

Updates a [crash.Box]'s `aabb` attribute ([Collider.aabb]), based on its position and size.


### crash.updateAABBCircle (Circle collider) - .
__collider:__ *Circle*. The [crash.Circle] whose AABB should be updated.  
__*return:*__ *Crash*. For chaining.

Updates a [crash.Circle]'s `aabb` attribute ([Collider.aabb]), based on its position and size.


### crash.updateAABBPoint (Point collider) - .
__collider:__ *Point*. The [crash.Point] whose AABB should be updated.  
__*return:*__ *Crash*. For chaining.

Updates a [crash.Point]'s `aabb` attribute ([Collider.aabb]), based on its position.










### crash.test (Collider a, Collider b, [Response res]) - *boolean*
__a:__ *Collider*. The first [crash.Collider] to test for.  
__b:__ *Collider*. The second [crash.Collider] to test for.  
__res:__ *Response|optional*. The optional [crash.Response] to use.  
__*return:*__ *boolean*. Indicates whether there is a collision between `a`and `b`.

Tests for a collision between `a` and `b`, using SAT. The boolean return value indicates whether `a` and `b` are colliding: `true` if there is a collision, `false` otherwise.  
You can optionally pass in a [crash.Response] to get some information about the collision (if there is one). If you don't, [crash.RESPONSE][crash.RESPONSE-const] will be used instead.

```javascript
var c1 = new crash.Circle(new crash.V(0,0), 5);
var c2 = new crash.Point(new crash.V(3,0));
var c3 = new crash.Box(new crash.V(15,20), 10, 10);
var res = new crash.Response();

crash.test(c1, c2, res);
// true, info in 'res'

crash.test(c1, c3);
//false, info in crash.RESPONSE
```


### crash.testAll (Collider collider, [Response res]) - *boolean*
__collider:__ *Collider*. The [crash.Collider] to test collisions for.  
__res:__ *Response|optional*. The optional [crash.Response] to use.  
__*return:*__ *boolean*. Whether the loop was stopped.

Tests for collisions between `collider` and any [crash.Collider] that has been [crash.insert()]ed in [crash.rbush]. This will [crash.search()] for `collider`, do a collision check for every [crash.Collider] returned by that search and finally call [crash.__onCollision()] for every collision.  
You can stop this loop (the one that checks for collisions) simply by calling [crash.cancel()]. This sets [crash.BREAK] to `true` (which is what `testAll` actually looks for). In [Listener]s, the recommended way is to call their `cancel` argument, which is the exact same function as [crash.cancel()].  
Stopping the loop comes in handy when you move `collider` in any of the [Listener]s, because all consequent collision checks become unnecessary: you will have to run `testAll()` again for the new position.  
The value returned by `testAll()` indicates whether the loop was cancelled: if it was, `false` is returned, otherwise, it returns `true`.

You probably don't want to use this method, because it isn't really intended to be used publicly (but rather by [crash.check()] internally), and [crash.check()] is more convenient in most situations anyway.

Finally, I would like to note a few things:

1. `res` is optional: if you don't pass it, [crash.RESPONSE][crash.RESPONSE-const] will be used instead.
2. this method doesn't really provide direct feedback, like [crash.test()] does: it rather calls the attached [Listener]s. This means `res` (or [crash.RESPONSE][crash.RESPONSE-const]) will be passed to the [Listener]s, and will only hold info about the last collision when the call is finished.
3. if this method returns `false`, the loop was cancelled, so you probably want to run it again.
4. `testAll` will not run [crash.\_\_onCollision()] when the overlap is smaller than [crash.OVERLAP\_LIMIT]. If [crash.OVERLAP\_LIMIT] is falsy, [crash.\_\_onCollision] will always be called.
5. `testAll` won't call [crash.update()] on `collider`, so make sure it's updated.
6. `testAll` is not really intended to be used publicly, but rather by [crash.check()] internally.



```javascript
var c1 = new crash.Circle(new crash.V(0,0), 5, true);
var c2 = new crash.Point(new crash.V(3,0), true);
var c3 = new crash.Box(new crash.V(15,20), 10, 10, true);
var res = new crash.Response();
crash.onCollision(function(a, b, res, cancel){
    alert("Oh my, there is a collision!");
});

crash.testAll(c1, res);
// calls the listener for (c1, c2), but not for (c1, c3).
// the response passed to the listener is 'res'.

crash.test(c2);
// calls the listener for (c2, c1), but not for (c2, c3).
// the response passed to the listener is crash.RESPONSE.

crash.test(c3);
// the listener will not be called.
```


### crash.check () - .
__*return:*__ *Crash*. For chaining.

Calls [crash.testAll()] for every [crash.Collider] in [crash.__moved]. This means that it performs collision checks for all the [crash.Collider]s that have moved since the last [crash.check()], which makes it the perfect function to handle collisions after everything was moved to new positions by physics. This integrates neatly in game loops: just do your updates, and then call [crash.check()] to handle collisions.

Important to note is that Colliders may be moved inside [Listener]s: they will be added to [crash.__moved] and checked in further iterations of the (current) [crash.check()] loop.  
To prevent infinite loops (a collider is moved, checked in the following iteration, moved again, etc.), the loop will be forced to stop after [crash.MAX_CHECKS] loops, which is `100` by default.

For a [crash.Collider] to be checked, `crash` must be notified it has moved (i.e. it must be pushed to [crash.__moved]. You can use [crash.moved()] or [crash.addToMoved()] to achieve this.

```javascript
// apply updates to colliders ...
// things may be colliding!
crash.check();
// nothing is colliding anymore!
// if the right listeners have been added, that is.
```


### crash.checkAll () - .
__*return:*__ *Crash*. For chaining.

This does the same as [crash.check()], with one difference: it doesn't check [crash.Collider]s in [crash.__moved], but rather all [crash.Collider]s (as returned by [crash.all()]). This is especially handy when you just loaded you [crash.Collider]s and you don't know which ones are colliding and/or have moved.

```javascript
// I have no idea what's up with my Colliders:
// I haven't moved any yet, but I don't know if any are colliding!
crash.checkAll();
// Ahh, that's better! Everything is sorted out!
```


























### crash.Collider (string type, SAT.Polygon|SAT.Circle satCollider, [boolean insert:false], [any data]) : *constructor*
__type:__ *string*. The type of collider this is. Valid values: `polygon`, `box`, `point`, `circle`.  
__satCollider:__ *SAT.Polygon or SAT.Circle*. The SAT Collider to use for collision checks.  
__insert:__ *boolean|optional*. Whether to [crash.insert()] this Collider.  
__data:__ *any|optional*. Some data to store in [Collider.data].  
__*return:*__ *Collider*. The new Collider.

This is the main Collider constructor, which provides some housekeeping methods, like `moveBy`, `update`, etc. All the other constructors ([crash.Polygon], [crash.Box], [crash.Point] and [crash.Circle]) inherit from this class. They pass their type and a custom SAT Collider to [crash.Collider], and pass through `insert` and `data`. This way, they inherit the housekeeping functions from Collider's prototype and they can add their own on their own prototype.


### Collider.type : *string*
The type of collider this is. Valid values: `polygon`, `box`, `point`, `circle`.  
This attribute is used by [crash.updateAABB()] to determine how to update the [Collider.aabb] attribute.


### Collider.sat : *SAT.Polygon|SAT.Circle*
The actual SAT collider used to do the collision checking. For [crash.Polygon]s, [crash.Box]es and [crash.Point]s, this is a SAT.Polygon, for [crash.Circle]s, this is a SAT.Circle.  
For further documentation, I refer to the [SAT.js docs][sat-docs].


### Collider.data : *any*
Some data that has to be carried around with the [crash.Collider]. It can be of any type, and doesn't mean anything to Crash; it's just for your convenience.


### Collider.pos : *Vector*
This is the same [crash.Vector] as [Collider.sat]`.pos` (so `collider.pos === collider.sat.pos` is `true`).  
This position is not garanteed to be 'safe', i.e. the [crash.Collider] may still be colliding with something. [Collider.pos] is the [crash.Vector] that is moved by [Collider.moveTo()] and [Collider.moveBy()], and is therefore always the most up-to-date, but not always collision checked.


### Collider.lastPos : *Vector*
This is a [crash.Vector] keeping track of the last position as it was at the end of the [crash.testAll()] loop. So, during a [crash.check()] loop, the [Collider.lastPos] attribute as it is inside the [Listener]s, is a copy of [Collider.pos] at the end of the previous iteration.


### Collider.lastCheckedPos : *Vector*
This is a [crash.Vector] keeping track of the last fully collision checked position of the [crash.Collider], i.e. a copy of [Collider.pos] at the end of the [crash.check()] loop.


### Collider.aabb : *object*
An Object with `x1`, `y1`, `x2` and `y2` attributes, that keeps track of the [crash.Collider]'s axis-aligned bounding box (AABB). It is used to perform [crash.search()]es.  
When you move a [crash.Collider], don't forget to update this attribute, with [crash.updateAABB()]. Note that the built-in move methods (`moveBy`, `rotate`, etc.) already do this for you.


### Collider.insert () - .
__*return:*__ *Collider*. For chaining.

Shortcut for [crash.insert()].


### Collider.remove () - .
__*return:*__ *Collider*. For chaining.

Shortcut for [crash.remove()].


### Collider.update () - .
__*return:*__ *Collider*. For chaining.

Shortcut for [crash.update()].


### Collider.updateAABB () - .
__*return:*__ *Collider*. For chaining.

Shortcut for [crash.updateAABB()].


### Collider.moved () - .
__*return:*__ *Collider*. For chaining.

Shortcut for [crash.moved()].


### Collider.search () - *Collider[]*
__*return:*__ *Array.\<Collider\>*. An array of [crash.Collider]s that may be colliding with `this`.

Shortcut for [crash.search()].


### Collider.setData (any data) - .
__data:__ *any*. The data to set as the new [Collider.data].  
__*return:*__ *Collider*. For chaining.

Sets the `data` attribute ([Collider.data]) to any value that's passed as the first argument. See [Collider.data] for more info.


### Collider.getData () - *any*
__*return:*__ *any*. The value of the `data` attribute ([Collider.data]).

Returns the value of the `data` attribute ([Collider.data]). See [Collider.data] for more info.


### Collider.moveTo (number x, number y) - .
__x:__ *number*. The x-coordinate to move to.  
__y:__ *number*. The y-coordinate to move to.  
__*return:*__ *Collider*. For chaining.

This moves the [crash.Collider]'s `pos` ([Collider.pos]) and `sat.pos` attributes __to__ (`x`, `y`). This calls [Collider.moved()] for you.


### Collider.moveBy (number x, number y) - .
*Alias:* [Collider.move()]  
__x:__ *number*. The distance in x direction to move by.  
__y:__ *number*. The distance in y direction to move by.  
__*return:*__ *Collider*. For chaining.

This moves the [crash.Collider]'s `pos` ([Collider.pos]) and `sat.pos` attributes __by__ (`x`, `y`). This calls [Collider.moved()] for you.


### Collider.move (number x, number y) - .
*Alias:* [Collider.moveBy()]  
__x:__ *number*. The distance in x direction to move by.  
__y:__ *number*. The distance in y direction to move by.  
__*return:*__ *Collider*. For chaining.

Alias of [Collider.moveBy()].


### crash.Polygon (Vector pos, Vector[] points, [boolean insert:false], [any data]) ~ [crash.Collider]
*Inherits from:* [crash.Collider]  
__pos:__ *Vector*. The base position of the Polygon.  
__points:__ *Array.\<Vector\>*. The points/corners of the Polygon.  
__insert:__ *boolean|optional*. Whether to insert the Polygon.  
__data:__ *any|optional*. Any data to set as [Collider.data].  
__*return:*__ *Polygon*.

A Polygon is a [crash.Collider] with a base position ([Collider.pos]) and a few points/corners. The points are defined by an array of [crash.Vector]s, relative to the base position ([Collider.pos]), in counter-clockwise order.  
For the `insert` and `data` arguments, see [crash.Collider].


### Polygon.setPoints (Vector[] points) - .
__points:__ *Array.\<Vector\>*. The points/corners of the Polygon.  
__*return:*__ *Polygon*. For chaining.

A shortcut for [Collider.sat]`.setPoints()`, which calls [Collider.moved()] for you.


### Polygon.setAngle (number angle) - .
__angle:__ *number*. The angle by which to rotate the Polygon (in radians).  
__*return:*__ *Polygon*. For chaining.

A shortcut for [Collider.sat]`.setAngle()`, which calls [Collider.moved()] for you.


### Polygon.setOffset (number offset) - .
__offset:__ *number*. The offset by which to translate the points of the Polygon.  
__*return:*__ *Polygon*. For chaining.

A shortcut for [Collider.sat]`.setOffset()`, which calls [Collider.moved()] for you.


### Polygon.rotate (number angle) - .
__angle:__ *number*. The angle by which to rotate the points of the Polygon.  
__*return:*__ *Polygon*. For chaining.

A shortcut for [Collider.sat]`.rotate()`, which calls [Collider.moved()] for you.


### crash.Circle (Vector center, number radius, [boolean insert:false], [any data]) ~ [crash.Collider]
__center:__ *Vector*. The position of the center of the Circle.  
__radius:__ *number*. The radius of the Circle.  
__insert:__ *boolean|optional*. Whether to insert the Circle.  
__data:__ *any|optional*. Any data to set as [Collider.data].
__*return:*__ *Circle*

A Circle is a [crash.Collider], with a center and radius.  
For the `insert` and `data` arguments, see [crash.Collider].


### crash.Point (Vector position, [boolean insert:false], [any data]) ~ [crash.Collider]
__position:__ *Vector*. The position of the Point.  
__insert:__ *boolean|optional*. Whether to insert the Point.  
__data:__ *any|optional*. Any data to set as [Collider.data].
__*return:*__ *Point*

A Point is a [crash.Collider] with just a position. It doesn't have a size.  
For the `insert` and `data` arguments, see [crash.Collider].


### crash.Box (Vector position, number width, number height, [boolean insert:false], [any data]) ~ [crash.Collider]
__position:__ *Vector*. The position of the Box.  
__width:__ *number*. The width of the Box.  
__height:__ *number*. The height of the Box.  
__insert:__ *boolean|optional*. Whether to insert the Box.  
__data:__ *any|optional*. Any data to set as [Collider.data].
__*return:*__ *Box*

A Box is a [crash.Collider] in a rectangular shape with a position (the bottom-left corner), a width and a height.  
For the `insert` and `data` arguments, see [crash.Collider].












### Listener (Collider a, Collider b, Response res, function cancel) : *function*
__a:__ *Collider*. The [crash.Collider] that collides with `b`.  
__b:__ *Collider*. The [crash.Collider] that collides with `a`.  
__res:__ *Response*. The [crash.Response] for this collision.  
__cancel:__ *function*. Cancels the current check loop. See [crash.testAll()] for more info.

A listener is a function that is called every time a collision is detected by [crash.testAll()], [crash.check()] or [crash.checkAll()] and will be passed four arguments: the two [crash.Collider]s that are colliding, the [crash.Response] for this collision and [crash.cancel()], which cancels the current check loop. See [crash.testAll()] for more info about this.  
The context of the listener (`this`) will be set to `crash`.  
You can add a listener with [crash.onCollision()] and you can remove them with [crash.offCollision()]. All listeners are stored in [crash.__listeners], which is intended for private use.





## License

The MIT License (MIT)

Copyright (c) 2014-2017 Tuur Dutoit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.













[crash.js]: https://raw.githubusercontent.com/TuurDutoit/crash/master/crash.js
[crash.min.js]: https://raw.githubusercontent.com/TuurDutoit/crash/master/crash.min.js
[RBush]: https://github.com/mourner/rbush
[rbush-docs]: https://github.com/mourner/rbush/blob/master/README.md
[rbush-docs-maxentries]: https://github.com/mourner/rbush/blob/master/README.md#creating-a-tree
[SAT.js]: https://github.com/jriecken/sat-js
[sat-docs]: https://github.com/jriecken/sat-js/blob/master/README.md
[require.js]: http://requirejs.org
[source code]: https://github.com/TuurDutoit/crash/blob/master/crash.js
[issue tracker]: https://github.com/TuurDutoit/crash/issues
[getting-started]: #getting-started
[API]: #api
[NPM]: https://www.npmjs.com/package/crash-colliders


[Crash]: #crash-1
[Crash.options.maxEntries]: #maxentries--number-9
[Crash.options.maxChecks]: #maxchecks--number-100
[Crash.options.overlapLimit]: #overlaplimit--numberfalse-05
[Crash.RBush]: #crashrbush--function
[crash.SAT]: #crashsat--object
[crash.Vector]: #crashvector--constructor
[crash.V]: #crashv--constructor
[crash.Response]: #crashresponse--constructor
[crash.rbush]: #crashrbush--rbush
[crash.RESPONSE-const]: #crashresponse--response
[crash.BREAK]: #crashbreak--boolean
[crash.MAX_CHECKS]: #crashmax_checks--number
[crash.OVERLAP_LIMIT]: #crashoverlap_limit--number
[crash.__listeners]: #crash__listeners--arrayfunction
[crash.__moved]: #crash__moved--arraycollider
[crash.insert()]: #crashinsert-collider-collider---
[crash.remove()]: #crashremove-collider-collider---
[crash.all()]: #crashall----collider
[crash.search()]: #crashsearch-collider-collider---collider
[crash.clear()]: #crashclear---
[crash.addToMoved()]: #crashaddtomoved-collider-collider---
[crash.update()]: #crashupdate-collider-collider---
[crash.moved()]: #crashmoved-collider-collider---
[crash.reset()]: #crashreset-number-maxentries---
[crash.cancel()]: #crashcancel----false
[crash.getTestString()]: #crashgetteststring-string-type1-string-type2---string
[crash.onCollision()]: #crashoncollision-function-listener---
[crash.offCollision()]: #crashoffcollision-function-listener---
[crash.__onCollision()]: #crash__oncollision-collider-a-collider-b-response-res---
[crash.extend()]: #crashextend-function-child-function-base---undefined
[crash.updateAABB()]: #crashupdateaabb-collider-collider---
[crash.updateAABBPolygon()]: #crashupdateaabbpolygon-polygon-collider---
[crash.updateAABBBox()]: #crashupdateaabbbox-box-collider---
[crash.updateAABBCircle()]: #crashupdateaabbcircle-circle-collider---
[crash.updateAABBPoint()]: #crashupdateaabbpoint-point-collider---
[crash.test()]: #crashtest-collider-a-collider-b-response-res---boolean
[crash.testAll()]: #crashtestall-collider-collider-response-res---boolean
[crash.check()]: #crashcheck----
[crash.checkAll()]: #crashcheckall----
[crash.Collider]: #crashcollider-string-type-satpolygonsatcircle-satcollider-boolean-insertfalse-any-data--constructor
[Collider.type]: #collidertype--string
[Collider.sat]: #collidersat--satpolygonsatcircle
[Collider.data]: #colliderdata--any
[Collider.pos]: #colliderpos--vector
[Collider.lastPos]: #colliderlastpos--vector
[Collider.lastCheckedPos]: #colliderlastcheckedpos--vector
[Collider.aabb]: #collideraabb--object
[Collider.insert()]: #colliderinsert----
[Collider.remove()]: #colliderremove----
[Collider.update()]: #colliderupdate----
[Collider.updateAABB()]: #colliderupdateaabb----
[Collider.moved()]: #collidermoved----
[Collider.search()]: #collidersearch----collider
[Collider.setData()]: #collidersetdata-any-data---
[Collider.getData()]: #collidergetdata----any
[Collider.moveTo()]: #collidermoveto-number-x-number-y---
[Collider.moveBy()]: #collidermoveby-number-x-number-y---
[Collider.move()]: #collidermove-number-x-number-y---
[crash.Polygon]: #crashpolygon-vector-pos-vector-points-boolean-insertfalse-any-data--crashcollider
[Polygon.setPoints()]: #polygonsetpoints-vector-points---
[Polygon.setAngle()]: #polygonsetangle-number-angle---
[Polygon.setOffset()]: #polygonsetoffset-number-offset---
[Polygon.rotate()]: #polygonrotate-number-angle---
[crash.Circle]: #crashcircle-vector-center-number-radius-boolean-insertfalse-any-data--crashcollider
[crash.Point]: #crashpoint-vector-position-boolean-insertfalse-any-data--crashcollider
[crash.Box]: #crashbox-vector-position-number-width-number-height-boolean-insertfalse-any-data--crashcollider
[Listener]: #listener-collider-a-collider-b-response-res-function-cancel--function
