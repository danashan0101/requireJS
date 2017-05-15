// require.s.contexts._.config; // full require config
requirejs(['examples/examples'], function (Examples) {
    var examples = new Examples();
    examples.renderTo(document.body);
});