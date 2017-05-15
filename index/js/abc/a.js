define(['./b', './c', 'require'], function (B, C, require) {
    console.group('"A" instantiated');
    console.log('"B" =', B);
    console.log('"C" =', C);
    console.groupEnd('"A" instantiated');

    return {
        name: '"A"',
        printDependencies: function () {
            var B = require('./b');
            var C = require('./c');

            console.groupCollapsed('A');
            console.log('"B" =', B);
            console.log('"C" =', C);
            console.groupEnd('A');

            B.printDependencies();
            C.printDependencies();
        }
    };
});