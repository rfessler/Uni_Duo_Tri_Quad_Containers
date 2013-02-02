/* File Created: December 1, 2012 */

$(document).ready(function (ready) {
	$('.navigationLinksContent > .navlink').on('click', function (e) {
		var _this = $(this);
		if (!_this.hasClass('currentpage')) {
			var _page = "../" + _this.parent().data('product');
			var _path = "/" + _this.data('path') + ".aspx";
			var _pagetype = _this.data('pagetype');
			var fullpath = (_pagetype === 'overview') ? _path : _page + _path;
			PleaseWait();
			window.location.href = fullpath;
		}
	});
});