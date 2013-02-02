/*
Copyright (c) 2009 Stefano J. Attardi, http://attardi.org/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

==============================================================================================
Therefore:
This javascript has been modified to use .on instead of .live and the name has been changed
to better conform to our projects naming conventions.  Rick Fessler 12/31/2012
==============================================================================================

*/
(function ($) {
	function toggleLabel() {
		var input = $(this);

		if (!input.parent().hasClass('placeholder')) {
			var label = $('<label>').addClass('placeholder');
			input.wrap(label);

			var span = $('<span>');
			span.text(input.attr('placeholder'))
			input.removeAttr('placeholder');
			span.insertBefore(input);
		}

		setTimeout(function () {
			var def = input.attr('title');
			if (!input.val() || (input.val() == def)) {
				input.prev('span').css('visibility', '');
				if (def) {
					var dummy = $('<label></label>').text(def).css('visibility', 'hidden').appendTo('body');
					input.prev('span').css('margin-left', dummy.width() + 3 + 'px');
					dummy.remove();
				}
			} else {
				input.prev('span').css('visibility', 'hidden');
			}
		}, 0);
	};

	function resetField() {
		var def = $(this).attr('title');
		if (!$(this).val() || ($(this).val() == def)) {
			$(this).val(def);
			$(this).prev('span').css('visibility', '');
		}
	};

	var fields = $(document);
	fields.on('keydown', 'input, textarea', toggleLabel);
	fields.on('paste', 'input, textarea', toggleLabel);

	// Added the double click event to the placeholder textboxes
	// When the user double clicks on the textbox, the browser
	// previous entered list will pop up and remove the placeholder
	// text.  This fixes the problem when the user selects from
	// the browser pre-entered list, the placeholder text did not
	// disappear.
	fields.on('dblclick', 'input, textarea', function () {
		toggleLabel;
		$(this).prev('span').css('visibility', 'hidden');
	});
	fields.on('focusin', 'input, textarea', function () {
		$(this).prev('span').css('color', '#ccc');
	});
	fields.on('focusout', 'input, textarea', function () {
		$(this).prev('span').css('color', '#999');
	});

	// The depreciated way using .live
	//    var fields = $('input, textarea');
	//    fields.live('keydown', toggleLabel);
	//    fields.live('paste', toggleLabel);
	//    fields.live('focusin', function () { $(this).prev('span').css('color', '#ccc'); });
	//    fields.live('focusout', function () { $(this).prev('span').css('color', '#999'); });

	$(function () {
		$('input[placeholder], textarea[placeholder]').each(
           function () { toggleLabel.call(this); }
       );
	});
})(jQuery);