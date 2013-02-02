/**
* Cross-Browser Placeholder Fallback with jQuery
* @copyright Shay Anderson http://www.shayanderson.com
* @link http://www.shayanderson.com/javascript/cross-browser-jquery-placeholder-fallback-method.htm
*/
var placeholderFallback = {
    class_name: 'placeholder',

    fFocus: function (o) {
        if (o.val() == o.attr('placeholder')) {
            o.val('')
                        .removeClass(this.class_name);
        }
    },

    fBlur: function (o) {
        if (o.val() == '' || o.val() == o.attr('placeholder')) {
            o.addClass(this.class_name)
                        .val(o.attr('placeholder'));
        }
    },

    fReset: function (o) {
        if (o.val() == o.attr('placeholder')) {
            o.val('');
        }
    },

    onSubmit: function (o) {
        var _this = this;
        $('[placeholder]').parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                _this.fReset($(this));
            });
        });
    },

    load: function () {
        var _this = this;
        $(document).ready(function () {
            $('[placeholder]').focus(function () {
                _this.fFocus($(this));
            }).blur(function () {
                _this.fBlur($(this));
            }).blur();
            _this.onSubmit();
        });
    }
}