define(function () {
    return [
        '<div class="user">',
            '<p class="name">',
                '<span>{{ firstName }}</span> ',
                '<span>{{ secondName }}</span>',
            '</p>',
            '<p class="email">{{ email }}</p>',
        '</div>'
    ].join('');
});