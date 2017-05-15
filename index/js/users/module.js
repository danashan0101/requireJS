define(['template!./view', 'css!./styles'], function (templateId) {
    var template = document.getElementById(templateId);

    var usersData = [
        {
            firstName: 'Douglas',
            secondName: 'Crockford',
            email: 'crockford@gmail.com'
        },
        {
            firstName: 'John',
            secondName: 'Resig',
            email: 'resig@gmail.com'
        },
        {
            firstName: 'Addy',
            secondName: 'Osmani',
            email: 'osmani@gmail.com'
        }
    ];

    function formatTemplate(t, data) {
        var f = document.createDocumentFragment();

        Array.prototype.slice.call(t.childNodes).forEach(function (el) {
            var clone = el.cloneNode(true);

            clone.innerHTML = clone.innerHTML.replace(/{{[^}}]+}}/gm, function (match) {
                var prop = match.replace('{{', '').replace('}}', '').trim();
                return data[prop];
            });

            f.appendChild(clone);
        });

        return f;
    }

    function Users() {
        var view = document.createElement('div');
        view.className = 'users';

        usersData.forEach(function (userData) {
            view.appendChild(formatTemplate(template, userData));
        });

        this.view = view;
    }

    Users.prototype.renderTo = function (node) {
        node.appendChild(this.view);
    };

    return Users;
});