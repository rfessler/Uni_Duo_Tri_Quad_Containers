/* Ajax Objects */
function ajaxDefaultsObj(type) {
	this.ContentType = "application/json; charset=utf-8";
	this.DataType = "json";
	this.Type = (type == '' || type == undefined) ? "POST" : type;
	this.Async = true;
}
var ajaxDefault = new ajaxDefaultsObj();
$.ajaxSetup({ type: ajaxDefault.Type, contentType: ajaxDefault.ContentType, dataType: ajaxDefault.DataType, error: displayAjaxError, async: ajaxDefault.Async });

function ajaxHelperObj(url, dataStrFmt, args) {
	this.Url = $.validator.format("Services/AjaxHelper.asmx/{0}", url);
	this.DataStrFmt = dataStrFmt;
	this.dataArgs = (args == '' || args == undefined) ? '' : $.validator.format(dataStrFmt, args);
}

function SendAjax(urlMethod, jsonData, returnFunction) {
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: urlMethod,
		data: jsonData,
		dataType: "json",
		success: function (msg) {
			// Do something interesting here.
			if (msg != null) {
				returnFunction(msg);
			}
		},
		error: function (xhr, status, error) {
			// Boil the ASP.NET AJAX error down to JSON.
			var err = eval("(" + xhr.responseText + ")");

			// Display the specific error raised by the server
			alert(err.Message);
		}
	});
}

Storage.prototype.setObject = function (key, value) {
	this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function (key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}

function displayAjaxError(xhr, status, error) {
	var status1 = "";
	if (xhr.status == 404) {
		status1 = 'Requested page not found. [404]';
	} else if (xhr.status == 500) {
		status1 = 'Ajax Internal Server Error [500]';
	} else if (exception === 'parsererror') {
		status1 = 'Requested JSON parse failed.';
	} else if (exception === 'timeout') {
		status1 = 'Ajax Time out error.';
	} else if (exception === 'abort') {
		status1 = 'Ajax request aborted.';
	} else {
		status1 = 'Uncaught Error.\n' + jqXHR.responseText;
	}

	if (status1 != "") {
		var r = $.parseJSON(xhr.responseText);
		var ErrorString = (status + 'Message:\n\t' + r.Message);
		alert(ErrorString);
		//            ShowPopUp_V2("AJAXERRORMESSAGE", status1, ErrorString);

		//        var er = ('Status:\n\t' + status + 'Message:\n\t' + r.Message + '\n\nStacktrace:\n\t' + r.StackTrace + '\n\nre:AjaxErr');
		//        var er = ('Status:\n\t' + status + 'Message:\n\t' + r.Message);
		//        var ErrorString = 'Status:\n\t' + status1;
		//        ShowPopUp("", "", "", "Error", ErrorString, "AJAX ERROR", "");
	}
}

$(document).ready(function () {
});