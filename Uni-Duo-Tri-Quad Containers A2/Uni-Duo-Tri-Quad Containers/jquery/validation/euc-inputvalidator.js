
(function (jQuery) {
    var $errordiv;



    /**    
    * jquery validateinput plugin
    * @desc a custom plugin that will validate the format of the entered value
    * @example  var b = $(this).validateInput({ 'showOKImg': true, 'method': 'number', 'location': 'left', 'showErrorHighlight': true, 'showErrorBorder': true });
    * @author sears franchises businesses - rick fessler
    * @param options
    * @option boolen enabled
    * @option showOKImg boolean shows a green check mark
    * @option showErrorImg Displays the image file for an error
    * @option showErrorHighlight Shows the input field in a light red color
    * @option string method Type of matching choices: number, email, phoneor date
    * @option location string Either left or right
    * @name $.validateInput
    * @returns either true false. true if no errors in format found
    * Last Modified:  10/17/2012 rmf modified plugin to validate required fields
    */
    jQuery.fn.validateInput = function (options) {

        var defaults = {
            enabled: true,
            method: '',
            required: false,
            overrideValue: 'no-override',
            validationName: 'This ',
            phoneNumber: '',
            validateMinLength: 0,
            validateMaxLength: 0,
            validateLength: 0,
            errorLabelDesc: '',
            showErrorImg: true,
            showOKImg: false,
            showErrorRedFont: true,
            showErrorBorder: false,
            showErrorHighlight: false,
            location: 'right',
            offSet: 0
        };
        var settings = jQuery.extend(defaults, options);


        function createErrorDiv() {
            if (!$errordiv) {
                var $tmpdiv = $('<div />').attr('id', 'errordiv');
                $tmpdiv.addClass('errordiv');
                $tmpdiv.appendTo('body').corner();
                $errordiv = $('#errordiv')
            }
        }
        createErrorDiv();

        var $e = $(this);
        $e.removeClass('field-validation-error-border field-validation-error-highlight field-validation-error-red-font field-validation-error').next('.validation-icon-img').remove();


        var inputVal;
        if (settings.overrideValue == 'no-override') {
            inputVal = $.trim($e.val());
        } else {
            inputVal = settings.overrideValue;
        }

        var inputValLength = inputVal.length;

        if (settings.method == 'required') { settings.required = true; }


        /* = Main Class
        ==============================================================================*/

        var numReg = /^[0-9]*$/,     //numReg = /^(0|[1-9][0-9]*)$/,
			dateReg = /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/,
			emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
			phoneReg = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
			lengthReg = /^(.{1,1000})$/,
			passwordReg = /^(?=.{8,15})(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
            phoneCompleteReg = /^[0-9]{10}$/,
			phoneAreaCodeOrExchangeReg = /^[0-9]{3}$/,
			phoneLineNumberReg = /^[0-9]{4}$/,
			emptyStringReg = /^[^.]/


        var pngLeft, pngTop;
        var cssClass, errormsg;

        var $png,
			errorimg = $('<input id="errorimg" class="validation-icon-img iserror20" />'),
			passedimg = $('<input id="okcheckimg" class="validation-icon-img noerror20" />'),
			showOKImgIfNoError = (settings.showOKImg === true) ? true : false,
            cssClassError = 'field-validation-error',
            cssClassError = (settings.showErrorRedFont === true) ? cssClassError += ' field-validation-error-red-font' : cssClassError,
			cssClassError = (settings.showErrorBorder === true) ? cssClassError += ' field-validation-error-border' : cssClassError,
			cssClassError = (settings.showErrorHighlight === true) ? cssClassError += ' field-validation-error-highlight' : cssClassError;


        var p = $e.position(),
             t = p.top,
             l = p.left,
             w = $e.width(),
             h = $e.height(),
             mt = parseInt($e.css('margin-top'), 10),
             mb = parseInt($e.css('margin-bottom'), 10),
             bt = parseInt($e.css('border-top-width'), 10),
             bb = parseInt($e.css('border-bottom-width'), 10),
             pt,
             pb,
             m = mt + mb,
             b = bt + bb,
             h = h + mt + mb + bt + bb;

        var imagewidth = 19;
        pngLeft = (settings.location === 'right') ? (l + w + 5) + settings.offSet : (l - imagewidth) - settings.offSet;

        var pattern = '';
        var patternMatching = true;
        var showError = false;
        var DidValidationPass = true;


        if (settings.required) {
            if (inputValLength == 0) {
                patternMatching = false;
                showError = true;
                errormsg = '<span class="validation-error-span">' + settings.validationName + '</span> is a required field. Please enter a value.';
            }
        }

        if (patternMatching) {
            switch (settings.method) {
                case 'required':
                    pattern = emptyStringReg, forceValidation = true, errormsg = '<span class="validation-error-span">' + settings.validationName + '</span> is a required field. Please enter a value.';
                    break;
                case 'number':
                    pattern = numReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid number format';
                    break;
                case 'date':
                    pattern = dateReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid date format';
                    break;
                case 'email':
                    pattern = emailReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid email format';
                    break;
                case 'phone':
                    pattern = phoneCompleteReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid phone format';
                    break;
                case 'phoneareacode':
                    pattern = phoneAreaCodeOrExchangeReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid area code format';
                    break;
                case 'phoneexchange':
                    pattern = phoneAreaCodeOrExchangeReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid exchange format';
                    break;
                case 'phonelinenumber':
                    pattern = phoneLineNumberReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid phone format';
                    break;
                case 'length':
                    pattern = lengthReg, errormsg = 'Input field cannot be blank';
                    break;
                case 'checklength':
                    if (inputValLength != settings.fixedlength) {
                        showError = true, errormsg = '<span class="validation-error-span"> this phone field must be ' + settings.fixedlength + '</span> digits.';
                    }
                case 'password':
                    pattern = passwordReg, errormsg = 'Password must be between 8 and 15 characters and contain at least one uppercase letter, one number and one special character.';
                    break;
                case 'url':
                    pattern = "https?://.+";
                case 'ipv4':
                    pattern = "\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}";
                case 'price':
                    pattern = "\d+(\.\d{2})?";
            }

            showError = !pattern.test(inputVal);
        }



        //        console.log('method: ', settings.method);
        //        console.log('overrideValue: ', settings.overrideValue);
        //        console.log('inputVal: ', inputVal, ' inputValLength: ', inputValLength);
        //        console.log('required: ', settings.required);
        //        console.log('validationName: ', settings.validationName);
        //        console.log('showError: ', showError);
        //        console.log('errormsg: ', errormsg);



        if (!(!settings.required && inputValLength == 0)) {

            if (showError) {
                DidValidationPass = false;
                $png = errorimg;

                $e.addClass(cssClassError).after($png);
                $png.hover(function (e) {
                    $errordiv.html(errormsg).show();
                    $errordiv.css({ 'top': e.clientY + 10, 'left': e.clientX + 10 });
                },
				function (e) { $errordiv.hide(); });

                pt = parseInt($e.css('padding-top'), 10);
                pb = parseInt($e.css('padding-bottom'), 10);
                h = h + pt + pb;
                pngTop = (h / 2) - ($png.height() / 2);
                $png.css({ 'left': pngLeft, 'top': pngTop });

            } else if (settings.showOKImg) {
                $png = passedimg;
                $e.after($png);

                pt = parseInt($e.css('padding-top'), 10);
                pb = parseInt($e.css('padding-bottom'), 10);
                h = h + pt + pb;
                pngTop = (h / 2) - ($png.height() / 2);
                $png.css({ 'left': pngLeft, 'top': pngTop });
            }
        }
        return DidValidationPass;
    };








































































    /*

    USAGE: $(".numberinput").forceNumeric();*/
    jQuery.fn.forceNumeric = function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.which || e.keyCode;
                if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                    key >= 48 && key <= 57 || /* numbers */
                    key >= 96 && key <= 105 || /* Numeric keypad */
                    key == 190 || key == 188 || key == 109 || key == 110 || /* comma, period and minus, . on keypad */
                    key == 8 || key == 9 || key == 13 || /* Backspace and Tab and Enter */
                    key == 35 || key == 36 || /* Home and End */
                    key == 37 || key == 39 || /* left and right arrows */
                    key == 46 || key == 45) /* Del and Ins */
                    return true;
                return false;
            });
        });
    };


    /* 
    * jquery validateinput plugin
    * @desc a custom plugin that will validate the format of the entered value
    * @example  var b = $(this).validateInput({ 'showOKImg': true, 'method': 'number', 'location': 'left', 'showErrorHighlight': true, 'showErrorBorder': true });
    * @author sears franchises businesses - rick fessler
    * @param options
    * @option boolen enabled
    * @option showOKImg boolean shows a green check mark
    * @option showErrorImg Displays the image file for an error
    * @option showErrorHighlight Shows the input field in a light red color
    * @option string method Type of matching choices: number, email, phoneor date
    * @option location string Either left or right
    * @name $.validateInput
    * @returns either true false. true if no errors in format found
    */
    jQuery.fn.validateInput_V1 = function (options) {
        var $sel = $(this);
        var inputVal = $sel.val();
        var inputValLength = inputVal.length;
        var showOKImgIfNoError = (options.showOKImg === true) ? true : false;
        $sel.removeClass('field-validation-error-border field-validation-error-highlight field-validation-error').next('.validation-icon-img').remove();

        var defaults = {
            enabled: true,
            showOKImg: false,
            showErrorImg: true,
            showErrorBorder: false,
            showErrorHighlight: false,
            method: '',
            location: 'right',
            phoneNumber: '',
            phoneAreaCode: '',
            phoneExchange: '',
            phoneLineNumber: '',
            phoneCountryCode: '',
            validateValue: '',
            fixedMinlength: 0,
            fixedMaxlength: 0,
            fixedlength: 0,
            offSet: 0,
            required: false
        };

        var settings = jQuery.extend(defaults, options);

        if (
            (
                (inputVal === '' && settings.method !== 'length') ||
                (inputVal !== '' && settings.method === 'length')
            ) && showOKImgIfNoError !== true
        ) { return true; }

        function createErrorDiv() {
            if (!$errordiv) {
                var $tmpdiv = $('<div />').attr('id', 'errordiv');
                $tmpdiv.addClass('errordiv');
                $tmpdiv.appendTo('body').corner();
                $errordiv = $('#errordiv')

            }
        }
        createErrorDiv();

        var pngLeft, pngTop;
        var cssClass, errormsg;
        var pattern;



        var numReg = /^[0-9]*$/,     //numReg = /^(0|[1-9][0-9]*)$/,
             dateReg = /^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/,
             emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
             phoneReg = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
             lengthReg = /^(.{1,1000})$/,
             passwordReg = /^(?=.{8,15})(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
             phoneAreaCodeReg = /^[0-9]{3}$/,
             phoneExchangeReg = /^[0-9]{3}$/,
             phoneLineNumberReg = /^[0-9]{4}$/,
             emptyString = /^$/





        var p = $sel.position(),
             t = p.top,
             l = p.left,
             w = $sel.width(),
             h = $sel.height(),
             mt = parseInt($sel.css('margin-top'), 10),
             mb = parseInt($sel.css('margin-bottom'), 10),
             bt = parseInt($sel.css('border-top-width'), 10),
             bb = parseInt($sel.css('border-bottom-width'), 10),
             pt,
             pb,
             m = mt + mb,
             b = bt + bb,
             h = h + mt + mb + bt + bb;

        pngLeft = (settings.location === 'right') ? (l + w + 5) + settings.offSet : (l - 19) - settings.offSet;

        var iserror = false;

        var cssClassError = ' field-validation-error';

        switch (settings.method) {
            case 'number':
                pattern = numReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid number format';
                break;
            case 'date':
                pattern = dateReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid date format';
                break;
            case 'email':
                pattern = emailReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid email format';
                break;
            case 'phone':
                inputVal = options.phoneNumber;
                pattern = phoneReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid phone format';
                break;
            case 'phoneareacode':
                inputVal = options.phoneNumber;
                pattern = phoneAreaCodeReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid area code format';
                cssClassError = '';
                break;
            case 'phoneexchange':
                inputVal = options.phoneNumber;
                pattern = phoneExchangeReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid exchange format';
                cssClassError = '';
                break;
            case 'phonelinenumber':
                inputVal = options.phoneNumber;
                pattern = phoneLineNumberReg, errormsg = '<span class="validation-error-span">' + inputVal + '</span> is an invalid phone format';
                cssClassError = '';
                break;
            case 'length':
                pattern = lengthReg, errormsg = 'Input field cannot be blank';
                break;
            case 'checklength':
                if (inputValLength != settings.fixedlength) {
                    iserror = true, errormsg = '<span class="validation-error-span"> this phone field must be ' + settings.fixedlength + '</span> digits.';
                }
            case 'password':
                pattern = passwordReg, errormsg = 'Password must be between 8 and 15 characters and contain at least one uppercase letter, one number and one special character.';
                break;

            case 'url':
                pattern = "https?://.+";
            case 'ipv4':
                pattern = "\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}";
            case 'price':
                pattern = "\d+(\.\d{2})?";
        }


        cssClassError = (settings.showErrorBorder === true) ? cssClassError += ' field-validation-error-border' : cssClassError;
        cssClassError = (settings.showErrorHighlight === true) ? cssClassError += ' field-validation-error-highlight' : cssClassError;


        var $png,
        errorimg = $('<img id="errorimg" class="validation-icon-img" alt="error found" src="/images/icon_error.jpg" />'),
        passedimg = $('<img id="okcheckimg" class="validation-icon-img" alt="no error" src="/images/okcheck.png" />');




        var noerror = true;

        if (((inputVal !== '' && settings.method !== 'length') || (inputVal === '' && settings.method === 'length')) && !pattern.test(inputVal)) {
            noerror = false;
            $png = errorimg;


            $sel.addClass(cssClassError).after($png);
            $png.hover(function (e) {
                $errordiv.html(errormsg).show();
                $errordiv.css({ 'top': e.clientY + 10, 'left': e.clientX + 10 });
            },
            function (e) { $errordiv.hide(); });

            pt = parseInt($sel.css('padding-top'), 10);
            pb = parseInt($sel.css('padding-bottom'), 10);
            h = h + pt + pb;
            pngTop = (h / 2) - ($png.height() / 2);
            $png.css({ 'left': pngLeft, 'top': pngTop });

        } else if (settings.showOKImg) {
            $png = passedimg;
            $sel.after($png);

            pt = parseInt($sel.css('padding-top'), 10);
            pb = parseInt($sel.css('padding-bottom'), 10);
            h = h + pt + pb;
            pngTop = (h / 2) - ($png.height() / 2);
            $png.css({ 'left': pngLeft, 'top': pngTop });
        }

        return noerror;
    };



    jQuery.fn.removeMatchedClasses = function (options) {
        var defaults = { // Default options go here
        };
        options = $.extend(defaults, options);
        return this.each(function (i) {
            var element = $(this);
            var classes = element.attr('class').split(/\s+/);
            var pattern = options.pattern;
            for (var i = 0; i < classes.length; i++) {
                var className = classes[i];
                if (className.match(pattern)) {
                    element.removeClass(className);
                }
            }
        });
    };

})(jQuery);                         

