define(['require', 'exports', 'module'], function (require, exports, module) {
    exports.getModuleInfo = function () {
        console.log('Module id =', module.id);
        console.log('Module uri =', module.uri);
    };
});