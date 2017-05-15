define(['jquery'], function ($) {
    var templatesHolder = document.createElement('div'),
        templateTagName = 'div';

    templatesHolder.style.cssText = 'height: 0; overflow: hidden; position: absolute; width: 0;';
    document.body.insertBefore(templatesHolder, document.body.firstChild);

    if ('content' in document.createElement('template')) {
        templateTagName = 'template';
    }

    function createTemplate(html, id) {
        var template = document.createElement(templateTagName);

        template.id = id;

        $.parseHTML(html).forEach(function (el) {
            template.appendChild(el);
        });

        templatesHolder.appendChild(template);
    }

    return {
        load: function (name, req, onload, config) {
            console.log('Resource name -', name);
            console.log('URL to load -', req.toUrl(name));
            req([req.toUrl(name)], function (html) {
                var templateId = 'user' + '-template';

                createTemplate(html, templateId);
                window.requestAnimationFrame(onload.bind(null, templateId));
            });
        },
        normalize: function (name, normalize) {
            if (name.substr(name.length - 3, 3) !== '.js') {
                name += '.js';
            }
            return normalize(name);
        }
    };
});