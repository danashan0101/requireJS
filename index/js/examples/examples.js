define(function () {
var pathsCallback = function ($, someModule, select2) {
    console.log($);
    console.log(someModule);
    console.log(select2);
};

var bundlesCallback = function (Geometry, Array, Dom) {
    console.log(Geometry);
    console.log(Array);
    console.log(Dom);
};

var shimCallback = function (jColor, bootstrap) {
    console.log(jColor);
    console.log(bootstrap);
};

var packagesCallback = function (store, cart, customer) {
    console.log(store);
    console.log(cart);
    console.log(customer);
};

var mapCallback = function (gallery) {
    console.log('Examples module uses gallery with version ' + gallery.version);
};

var configCallback = function (User) {
    var user = new User();

    user.setImage('test.jpg');
    console.log(user.getImage());
};

var specialModulesCallback = function (some) {
    some.getModuleInfo();
};

var circularDependenciesCallback = function (A) {
    A.printDependencies();
};

var pluginsCallback = function (Users) {
    var users = new Users();

    users.renderTo(document.body);
};

    // https://github.com/amdjs/amdjs-api/blob/master/CommonConfig.md
    var examplesMap = {
        'paths': {
            title: 'Paths',
            config: {
                paths: {
                    'someModule': 'very/long/path/to/module',
                    'jquery': [
                        'https://code.jquery.com/jquery-6.6.6',
                        '../libs/jquery-2.2.4'
                    ],
                    "koBindings": "../libs/knockout.bindings"
                }
            },
            deps: ['jquery', 'someModule', "koBindings/select2"],
            callback: pathsCallback
        },
        'bundles': {
            title: 'Bundles',
            config: {
                bundles: {
                    'utils/utils': ['Geometry', 'Array', 'Dom']
                }
            },
            deps: ['Geometry', 'Array', 'Dom'],
            callback: bundlesCallback
        },
        'shim': {
            title: 'Shim',
            config: {
                paths: {
                    'jquery-color': '../libs/jquery-color-2.1.0',
                    'bootstrap': '../libs/bootstrap',
                    'jquery': '../libs/jquery-2.2.4'
                },
                shim: {
                    'bootstrap': {
                        deps: ['jquery']
                    },
                    'jquery-color': {
                        deps: ['jquery'],
                        exports: 'jQuery.Color',
                        init: function ($) {
                            // Using a function allows you to call noConflict for
                            // libraries that support it, and do other cleanup.
                            $.noConflict();
                        }
                    }
                }
            },
            deps: ['jquery-color', 'bootstrap'],
            callback: shimCallback
        },
        'packages': {
            title: 'Packages',
            config: {
                paths: {
                    'cart': 'packages/cart'
                },
                packages: [
                    'packages/store',
                    'cart',
                    {
                        name: 'customer',
                        location: 'packages/customer',
                        main: 'index'
                    }
                ]
            },
            deps: ['packages/store', 'cart', 'customer'],
            callback: packagesCallback
        },
        'map': {
            title: 'Map',
            config: {
                map: {
                    '*': {
                        'gallery': 'gallery/gallery-1.5'
                    },
                    'modern/module': {
                        'gallery': 'gallery/gallery-2.0'
                    },
                    'ancient/module': {
                        'gallery': 'gallery/gallery-1.0'
                    }
                }
            },
            deps: ['gallery', 'modern/module', 'ancient/module'],
            callback: mapCallback
        },
        'enforceDefine': {
            title: 'Enforce Define',
            config: {
                enforceDefine: true
            },
            deps: ['notAmd/module']
        },
        'config': {
            title: 'Config',
            config: {
                config: {
                    'user/module': {
                        useProfileImage: false
                    }
                }
            },
            deps: ['user/module'],
            callback: configCallback
        },
        'specialModules': {
            title: 'Special Modules',
            deps: ['./some/module'],
            extraCode: [
                '\n\n// in some/module.js',
                'define([\'require\', \'exports\', \'module\'], function (require, exports, module) {',
                '    exports.getModuleInfo = function () {',
                '       console.log("Module id =", module.id);',
                '       console.log("Module uri =", module.uri);',
                '    };',
                '});\n'
            ].join('\n'),
            callback: specialModulesCallback
        },
        'circularDependencies': {
            title: 'Circular Dependencies',
            deps: ['abc/a'],
            callback: circularDependenciesCallback,
            extraCode: [
                '\n\n// in a.js',
                "define(['./b', './c', 'require'], function (B, C, require) {...});\n",

                "// in b.js",
                "define(['./a', './c', 'require'], function (A, C, require) {...});\n",

                "// in c.js",
                "define(['./a', './b', 'require'], function (A, B, require) {...});"
            ].join('\n')
        },
        'plugins': {
            title: 'Plugins',
            config: {
                paths: {
                    'jquery': '../libs/jquery-2.2.4',
                    'template': '../libs/template',
                    'css': '../libs/css'
                }
            },
            deps: ['users/module'],
            callback: pluginsCallback,
            extraCode: [
                '\n\n// in users/module.js',
                'define([',
                "   'template!./view',",
                "   'css!./styles'",
                '], function (templateId) {\n    //...\n});'
            ].join('\n')
        }
    };

    examplesMap.shim.jsonConfig = JSON.stringify(examplesMap.shim.config, null, 4).replace('"jQuery.Color"', [
        '"jQuery.Color",\n            ',
        '"init": function ($) {\n',
        '               // Using a function allows you to call noConflict for\n',
        '               // libraries that support it, and do other cleanup.\n',
        '               $.noConflict();\n            ',
        "}"
    ].join(''));

    function runTest() {
        require.config(this.config);
        require(this.deps, this.callback);
    }

    function createLayout() {
        var controlHTML = '<div><label>Configuration to test:</label><select class="configuration-control"><option value="">Select</option>',
            html = '<div class="items">',
            example,
            key;

        for (key in examplesMap) {
            if (examplesMap.hasOwnProperty(key)) {
                example = examplesMap[key];
                controlHTML += '<option value="' + key + '">' + example.title + '</option>';

                html += [
                    '<div class="item ' + key + '-item">',
                        '<h2>' + example.title + '</h2>',
                        '<pre><code>',
                            example.config
                                ? 'require.config(' + (example.jsonConfig || JSON.stringify(example.config, null, 4)) + ');\n\n'
                                : '\n',

                            'require(["' + example.deps.join('", "') + '"]',
                                example.callback
                                    ? ', ' + example.callback.toString().replace(' ', '')
                                    : '',
                            ');',

                            (example.extraCode || ''),
                        '</code></pre>',
                        "<button data-type=" + key + ">Try it</button>",
                    '</div>'
                ].join('');
            }
        }

        return controlHTML + '</select></div>' + html + '</div>';
    }

    function changeConfigurationItem(e) {
        var value = e.target.value;

        if (this.activeConfItem) {
            this.activeConfItem.style.display = 'none';
        }

        if (value && examplesMap[value]) {
            this.activeConfItem = this.view.querySelector('.' + value + '-item');

            if (this.activeConfItem) {
                this.activeConfItem.style.display = 'inline-block';
            }
        }
    }

    function tryItHandler(e) {
        if (e.target.tagName === 'BUTTON') {
            var type = e.target.dataset.type;
            if (type && examplesMap[type]) {
                runTest.call(examplesMap[type]);
            }
        }
    }

    function Examples() {
        this.view = document.createElement('div');
        this.view.className = 'examples';
        this.view.innerHTML = createLayout();
    }

    Examples.prototype.renderTo = function (node) {
        node.appendChild(this.view);

        // add handlers
        this.view.querySelector('.configuration-control').addEventListener('change', changeConfigurationItem.bind(this));
        this.view.querySelector('.items').addEventListener('click', tryItHandler, true);
    };

    return Examples;
});