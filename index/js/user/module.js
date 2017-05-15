define(['module'], function (module) {
    var moduleConfig = module.config();

    function User() {
        this.image = null;
    }

    User.prototype.setImage = function (imageSrc) {
        if (moduleConfig.useProfileImage) {
            this.image = imageSrc;
        } else {
            console.warn('You cannot set a picture because its use is prohibited')
        }
    };

    User.prototype.getImage = function (imageSrc) {
        return this.image;
    };

    return User;
});