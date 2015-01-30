// LLOC 1
foo();

// LLOC 2 & 3
bar(); foo();

// LLOC 4
var bool = false;

// LLOC 5
function foo() {
  // LLOC 6
  var a = 'b';
}

// LLOC 7
var i = 0;

// LLOC 8
while (bool) {
  // LLOC 9
  i++
}