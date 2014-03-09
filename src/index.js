// # JavaScript notes

// ## Types

// JavaScript's has 5 primitive types: `number`, `string`, `boolean`, `null`, and `undefined`.
var aNumber = 1.3,
    anotherNumber = 10,
    aString = 'Hello world',
    theTruth = true,
    nothing = null,
    evenLess = undefined;

// Everything else is an _object_, including functions and arrays.
var anObjectLiteral = {
    property: 'value',
    'property-with-dashes': 'another value',
    anotherProperty: function() {
        console.log('Hello from an object method');
    }
};

// Functions can be assigned to variables and passed around just as any other object (which they are).
var aFunction = function() {}; // does not do very much

// Since functions are objects, they can have properties as well.
aFunction.fieldName = 'Yet another value';
// And methods...
aFunction.method = function() {
    console.log('Hello from a function object method');
};

// Objects are always passed by reference, they are never copied.
var obj1 = { name: 'Object 1' },
    obj2 = obj1;
obj2.name = 'Object 2';     // <-- obj1.name is 'Object 2' now, as both variables reference the same object

// ## Scope and Context

// In contrast to most languages with C syntax, JavaScript has function scope (or lexical scope)
// instead of block scope. That means a variable lives in the scope of _the function where it is declared_.
// What is more, variable declarations are "hoisted" to the beginning of the current scope, which can
// sometimes lead to unexpected results. Therefore, it is a good practice to declare all needed variables
// at the beginning of a function.
var myFunction = function() {           // <-- a new scope starts here
    var a = 3, b = 4;                   // also `result` from further down is implicitly declared here (set to undefined)

    function nested() {                 // <-- a nested scope starts here, which has access to the parent scope
        var b = 10,                     // <-- local variable `b` shadows variable from parent scope
            c = a + b;
        return c;
    }

    a += b;                            // <-- here, c is undefined

    var result = nested();             // variable declaration is hoisted to beginning of scope, `result` is set to 17
};

// Variables do not need to be declared using a `var` statement. If `var` is omitted, **they will become global variables**.
// Therefore, always use the var statement unless you have a very good reason not to do so.
var creatingGlobals = function() {
    var aLocalVariable = 10;
    aGlobalVariable = 15;              // this can be accessed outside this function, because it is a global variable!

    $ = 0;                             // Oops, accidentally overwriting jQuery...
};

// When a function is invoked, the special variable `this` holds the _function execution context_.
// For object member functions, this is typically the object itself. For DOM event handler functions in
// the browser, `this` typically refers to the event's target DOM element. When invoking a function
// through `call()` or `apply()`, the function context (i.e. the value of `this`) can be set to an arbitrary
// object.
var myFunctionWithContext = function() {
    var self = this;                    // the value of `this` is defined when the function is called

    function nested() {
        if (self === this) {            // this `this` is defined when `nested()` is called and usually does not equal the parent scope `this`!
            console.log('You were lucky');
        } else {
            console.log('Beware');
        }
    }

    nested();                          // prints 'You were lucky' if the outer function is invoked as myFunctionWithContext()

    nested.call({});                   // prints 'Beware'
};

// In the browser, `this` **refers to the window object** unless a function is invoked as an object method or `this` is
// explicitly set to another value.
var greet = function() {
    console.log('Hi, my name is', this.firstName);
};
greet();                               // prints 'Hi, my name is undefined' (`this` refers to `window`)
greet.call({ firstName: 'Bob' });      // prints 'Hi, my name is Bob'

// To ensure a certain execution context, a function can be bound to a specific value of this. This creates a new
// function object that, when called, calls the original function with the supplied argument as value of `this`.
var bobGreets = greet.bind({ firstName: 'Bob' });
bobGreets();                           // prints 'Hi, my name is Bob'
bobGreets.call({});                    // prints 'Hi, my name is Bob'

// ### Closure

// Nested functions have access to their parent scope (except for `this`). This leads to an interesting case
// when a nested function has longer lifetime than its parent function, e.g., when the nested function is
// returned.
var foobar = function() {
    var count = 0;

    return function() {
        count++;
        console.log('I was called ' + count + ' times');
    };
}();                                   // we immediately invoke the outer function, so `foobar` holds the returned inner function

// Returning the nested function makes it available for later invocation. Therefore, the local variable `count` must not
// be garbage collected. Instead, the parent scope is attached to the returned function in order to be accessible when
// the function is invoked, creating a closure. This is called the *scope chain*.
foobar();                              // prints 'I was called 1 times'
foobar();                              // prints 'I was called 2 times'
foobar();                              // prints 'I was called 3 times'
foobar();                              // prints 'I was called 4 times'

// Closure and immediately invoked functions can be used to create private variables (which otherwise do not exist in JavaScript)
var Counter = function() {
    var value = 0;
    return {
        getValue: function() { return value; },
        increment: function() { value++; }
    };
}();                                   // immediate invocation of the anonymous function

// ## The Prototype Chain

// Every object is linked to a prototype object, which serves as a blueprint for the object's behaviour.
// When a property or a method cannot be found in an object itself, the interpreter tries to find it in the object's
// prototype–and the prototype's prototype, and the prototype's prototype's prototype and so on. This is called
// the prototype chain.
var myArray = [1, 2, 3];               // no direct members `join` nor `hasOwnProperty`
myArray.join(',');                     // calls `Array.prototype.join`, returning '1,2,3'

// Object literals are linked to `Object.prototype`, i.e. their prototype refers to `Object.prototype`.
// Arrays are linked to `Array.prototype`, which itself is linked to `Object.prototype`.
myArray.hasOwnProperty('join');        // calls `Object.prototype.hasOwnProperty`, returning false

// Functions are linked to `Function.prototype`, which itself is linked to `Object.prototype` again.
var myFunc = function(arg1, arg2) {
    console.log('You called myFunc with', arg1, arg2);
};
myFunc.apply(1, 2);                    // calls `Function.prototype.apply`

// ### Constructor invocation
// There is no class concept in JavaScript. However, functions can be invoked using the `new` keyword. This creates
// a new object whose prototype is set to the function's `prototype` member.
var Button = function(label) {
    this.label = label;
};
Button.prototype.click = function() {
    console.log('You clicked button ' + this.label);
};

var btn = new Button('Cancel');        // by convention, functions meant to be called as constructors begin with a capital letter
btn.click();                           // prints 'You clicked button Cancel'

// ### Prototypal Inheritance

// In JavaScript, object inheritance can be achieved in various ways. The language can be used to mimic the concept
// of classes and classical inheritance. The prototype chain, however, provides a powerful means of establishing
// inheritance relations directly between objects.
var createDerivedObject = function(baseObj) {     // helper function to set up 'inheritance' prototype chain
    var F = function() {};                        // empty constructor function
    F.prototype = baseObj;                        // use `baseObj` as the derived object's prototype
    return new F();                               // create and return derived object
};

// Using this pattern, any object literal can serve as a base object.
var aWidget = {
    name: '',
    show: function() {
        console.log('Showing widget ' + this.name);
    }
};

// We only specify the behavioural differences in the derived object, relying on the prototype chain for the common behaviour.
var aClickableWidget = createDerivedObject(aWidget);
aClickableWidget.name = 'Click Widget';
aClickableWidget.click = function() {
    console.log('You clicked widget ' + this.name);
};

aClickableWidget.show();               // calls `aClickableWidget.prototype.show`, which is identical to `aWidget.show`

// There are various other ways of achieving inheritance in JavaScript, some of them allowing for truly private member
// variables and references to base object members (i.e., a `super()` functionality). For an overview,
// see ["JavaScript: The Good Parts" by Douglas Crockford](http://www.oreilly.de/catalog/9780596517748).

// # References
// 1. [JavaScript: The Good Parts by Douglas Crockford](http://www.oreilly.de/catalog/9780596517748) is a very
//    good read on the good, bad and awful things in JavaScript.
// 2. [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) is a helpful
//    language reference and documentation.
