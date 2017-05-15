define(['./a', './b', 'require'], function (A, B, require) {
    console.group('"C" instantiated');
    console.log('"A" =', A);
    console.log('"B" =', B);
    console.groupEnd('"C" instantiated');

    return {
        name: '"C"',
        printDependencies: function () {
            var A = require('./a');
            var B = require('./b');

            console.groupCollapsed('C');
            console.log('"A" =', A);
            console.log('"B" =', B);
            console.groupEnd('C');
        }
    };
});