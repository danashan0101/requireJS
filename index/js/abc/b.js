define(['./a', './c', 'require'], function (A, C, require) {
    console.group('"B" instantiated');
    console.log('"A" =', A);
    console.log('"C" =', C);
    console.groupEnd('"B" instantiated');

    return {
        name: '"B"',
        printDependencies: function () {
            var A = require('./a');
            var C = require('./c');

            console.groupCollapsed('B');
            console.log('"A" =', A);
            console.log('"C" =', C);
            console.groupEnd('B');
        }
    };
});