$(document).ready(function () {
    var stopinv;
    var intval = setInterval(
        function rotateImages() {
            if (stopinv === undefined) {
                var ocurPhoto = $('.divphotoshow div.current');
                var onxtPhoto = ocurPhoto.next();
                if (onxtPhoto.length == 0)
                    onxtPhoto = $('.divphotoshow div:first');
                ocurPhoto.removeClass('current').addClass('previous');
                onxtPhoto.addClass('current').removeClass('previous');

                var ocurli = $(".active");
                var onxtli = ocurli.next();
                if (onxtli.length == 0)
                    onxtli = $("ul[id$=ulphotoshow] li:first");
                ocurli.removeClass('active').removeClass('misc-OrangeSquare');
                ocurli.addClass('misc-OrangeSquareEmpty');
                onxtli.removeClass('misc-OrangeSquareEmpty');
                onxtli.addClass('active').addClass('misc-OrangeSquare');
            }
        }, "5000");

    $("div[id*=emergencyrepair]").click(function (e) {
        $("#emergencyBlock").trigger('click');
    });

    $(".CarriageHouseCircles, .CarriageHouseSquares").click(function (e) {
        switch (true) {
            case $(this).hasClass('WhiteCircle'):
                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/products/GarageDoors/StlCarrLgPnlBBMoonlite_483.jpg');
                break;
            case $(this).hasClass('AlmondCircle'):
                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/overview/StlCarrBBBlRdgHndlStrp_483.jpg');
                break;
            case $(this).hasClass('DarkWoodgrainSquare'):
                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/products/GarageDoors/StlCarrLgPnlBBMoonlite_483.jpg');
                break;
            default:
                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/overview/PremCarBaseABlRdgHndl_483.jpg');
        }
        $("#GarageDoorBlock").trigger('click');

    });

    $("#GarageDoorBlock").fancybox();

    //    $(".CarriageHouseCircles").hover(function (e) {
    //        switch (true) {
    //            case $(this).hasClass('WhiteCircle'):
    //                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/products/GarageDoors/StlCarrLgPnlBBMoonlite_483.jpg');
    //                break;
    //            case $(this).hasClass('AlmondCircle'):
    //                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/overview/StlCarrBBBlRdgHndlStrp_483.jpg');
    //                break;
    //            default:
    //                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/overview/PremCarBaseABlRdgHndl_483.jpg');
    //        }
    //        $("#GarageDoorBlock").trigger('click');
    //    });
    //$("#GarageDoorBlock").fancybox().hover(function () {
    //$(this).mouseout(function ()
    //{ $.fancybox.close(); });
    //});

    $("#emergencyBlock").fancybox({
        beforeLoad: function (e) {
            $(".columnbox label input").val('');
            $(".columncitystatezipbox label input").val('');
            $(".columnbox label textarea").val('');
            //$(".columnbox label span").css('visibility', '');
            $(".columnbox label span").css('visibility', '');
            $(".columncitystatezipbox label span").css('visibility', '');
            $("div[id*=customerrequiredtext]").html("");
        },
        afterClose: function (e) {
            //        	var topnav = localStorage['prevtopnav'];
            var topnav = $.jStorage.get('prevtopnav');
            switch (topnav) {
                case 'D':
                    $("div[id*=topnavleft]").addClass("OrangeBottomBorder");
                    break;
                case 'GD':
                    $("div[id*=topnavmiddle2]").addClass("OrangeBottomBorder");
                    break;
                case 'GDO':
                    $("div[id*=topnavmiddle3]").addClass("OrangeBottomBorder");
                    break;
                case 'GDR':
                    $("div[id*=topnavmiddle1]").addClass("OrangeBottomBorder");
                    break;
                default:
                    $("div[id*=topnavleft]").addClass("OrangeBottomBorder");
            }
            //                  localStorage.removeItem('prevtopnav');
            $.jStorage.deleteKey('prevtopnav');
            CancelWait();
        }
    });

    $("ul li[id*=liContent]").click(function (e) {
        $('.active').addClass('misc-OrangeSquareEmpty');
        $('.active').removeClass('misc-OrangeSquare').removeClass('active');
        $(this).addClass('active').addClass('misc-OrangeSquare');
        $(this).removeClass('misc-OrangeSquareEmpty');
        $('.current').addClass('previous');
        $('.current').removeClass('current');
        var divid = "div[id*=" + $(this).attr("id").replace("li", "div") + "]";
        $(divid).removeClass('previous').addClass('current');
        stopinv = true;
    });

    $(".Social-facebook-icon").click(function (e) {
        window.location = "http://www.facebook.com";
    });

    $(".Social-youtube-icon").click(function (e) {
        window.location = "http://www.youtube.com";
    });

    $("#slider-carousel").jcarousel();

    $("#yt_videosurround").fancybox({
        afterClose: function (e) {
            $("#yt_embededvideo").empty();
        }
    });

    $("li.jcarousel-item").click(function (e) {
        $("#yt_videosurround").trigger('click');
    });

    $('.avideos').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        type: 'iframe'
    });

    $(".topnav").click(function (e) {
        $(".OrangeBottomBorder").removeClass("OrangeBottomBorder");
        //$(this).addClass("OrangeBottomBorder");

        //        if ($(this).hasClass("left")) { $(this).addClass("OrangeBottomBorder"); localStorage['prevtopnav'] = 'D'; PleaseWait(); window.location.href = "/Default.aspx"; }
        //        if ($(this).hasClass("middle1")) { $(this).addClass("OrangeBottomBorder"); localStorage['prevtopnav'] = 'GD'; PleaseWait(); window.location.href = "/GarageDoors.aspx"; }
        //        if ($(this).hasClass("middle2")) { $(this).addClass("OrangeBottomBorder"); localStorage['prevtopnav'] = 'GDO'; PleaseWait(); window.location.href = "/GarageDoorOpeners.aspx"; }
        //        if ($(this).hasClass("middle3")) { $(this).addClass("OrangeBottomBorder"); localStorage['prevtopnav'] = 'GDR'; PleaseWait(); window.location.href = "/GarageDoorRepair.aspx"; }

        if ($(this).hasClass("left")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', 'D'); PleaseWait(); window.location.href = "/Default.aspx"; }
        if ($(this).hasClass("middle2")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', 'GD'); PleaseWait(); window.location.href = "/GarageDoors.aspx"; }
        if ($(this).hasClass("middle3")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', 'GDO'); PleaseWait(); window.location.href = "/GarageDoorOpeners.aspx"; }
        if ($(this).hasClass("middle1")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', 'GDR'); PleaseWait(); window.location.href = "/GarageDoorRepair.aspx"; }
    });

    $(".columnbox input[id*=phone]").keyup(function (e) {
        var numid = $(this).attr("id");
        var numval = $("#" + numid).val().replace(/[^0-9]/g, '');

        var key = (e.keyCode ? e.keyCode : e.which);

        if (numval.length == 0) {
            $("#" + numid).val('');
        }
        else if (key == 8 || key == 9 || key == 46) {
        }
        else {
            switch (numval.length) {
                case 1: case 2:
                    $("#" + numid).val('(' + numval);
                    break;
                case 3:
                    $("#" + numid).val('(' + numval + ')');
                    break;
                case 4: case 5:
                    $("#" + numid).val('(' + numval.substring(0, 3) + ') ' + numval.substring(3));
                    break;
                case 6:
                    $("#" + numid).val('(' + numval.substring(0, 3) + ') ' + numval.substring(3) + '-');
                    break;
                case 7: case 8: case 9: case 10:
                    $("#" + numid).val('(' + numval.substring(0, 3) + ') ' + numval.substring(3, 6) + '-' + numval.substring(6));
                    break;
            }
        }
    });
    $(".digitsonly input[id*=number]").keyup(function (e) {
        var numid = $(this).attr("id");
        var numval = $("#" + numid).val().replace(/[^0-9]/g, '');

        var key = (e.keyCode ? e.keyCode : e.which);

        if (numval.length == 0) {
            $("#" + numid).val('');
        }
        else if (key == 8 || key == 9 || key == 46) {
        }
        else {
            $("#" + numid).val(numval);
        }
    });

    //        $("input[id*=submitInfo]").click(function (e) {
    //            if ($("input[id*=firstname]").val() != "" &&
    //                $("input[id*=lastname]").val() != "" &&
    //                $("input[id*=address1]").val() != "" &&
    //                $("input[id*=city]").val() != "" &&
    //                $("input[id*=state]").val() != "" &&
    //                $("input[id*=zipnumber]").val() != "" &&
    //                $("input[id*=homephone]").val() != "" &&
    //                $("input[id*=email]").val() != "") {
    //                PleaseWait();

    //                //$.fancybox.close();
    //                var btnID = $("input[id*=submitInfo]").attr("id");
    //                __doPostBack(btnid, 'buttonClick');
    //                //$("input[id*=hdnsubmitInfo]").trigger('click');

    //            }
    //            else {
    //                $("div[id*=customerrequiredtext]").html("Icons in clue are required.  Please try again...");
    //            }
    //        });

});

function PleaseWait(e, style) {
	//styles
	//crosshair     plus sign
	//help          pointer and question mark
	//move          plus sign with arrow tips
	//pointer
	//wait          round circle hourglass
	//progress      pointer and hourglass
	//default       hand with index finger pointing

	document.body.style.cursor = "wait";

	var style = (style == '' || style == undefined) ? 'block' : 'none';
	document.getElementById("mainOverlay").style.display = style;
	$(".current").css("opacity", ".50");
	$("ul li[id*=liContent]").css("opacity", ".50");

	return true;
}

function CancelWait(e) {
	//styles
	//crosshair     plus sign
	//help          pointer and question mark
	//move          plus sign with arrow tips
	//pointer
	//wait          round circle hourglass
	//progress      pointer and hourglass
	//default       hand with index finger pointing

	document.body.style.cursor = "default";
	document.getElementById("mainOverlay").style.display = "none";

	return true;
}

function FancyBoxSubmitForm(e) {

    var abc = $(".columncitystatezipbox.last .placeholder span").html();
    var zipchk;
    if (abc != "Zip") {
        zipnum = abc;
    }
    else {
        zipnum = $("input[id*=zipnumber]").val();
    }

    if ($("input[id*=firstname]").val() != "" &&
        $("input[id*=lastname]").val() != "" &&
        $("input[id*=address1]").val() != "" &&
        $("input[id*=city]").val() != "" &&
        $("input[id*=state]").val() != "" &&
        zipnum != "" &&
        $("input[id*=homephone]").val() != "" &&
        $("input[id*=email]").val() != "") 
    {

        //Reset error text message
        $("div[id*=customerrequiredtext]").html("");

        //User local variables to pass into ajax call
        fname = $("input[id*=firstname]").val();
        lname = $("input[id*=lastname]").val();
        add1 = $("input[id*=address1]").val();
        add2 = $("input[id*=address2]").val();
        city = $("input[id*=city]").val();
        state = $("input[id*=state]").val();
        zip = zipnum;
        hphone = $("input[id*=homephone]").val().replace(/[^\d;.]/g,'');
        hext = $("input[id*=homeextnumber]").val();
        cphone = $("input[id*=cellphone]").val().replace(/[^\d;.]/g,'');
        cext = $("input[id*=cellextnumber]").val();
        email = $("input[id*=email]").val();
        confemail = $("input[id*=confirmemail]").val();
        comments = $("textarea[id*=comments]").val();

        var intRegex = /[0-9] -()+]+$/;
        
        if (email != confemail) {
            $("div[id*=customerrequiredtext]").html("Email confirmation incorrect.  Please try again...");
            CancelWait();
        }
        else if (hphone.length != 10 || (cphone.length != 10 && cphone != "")) {
            $("div[id*=customerrequiredtext]").html("Phone number must be 10 digits.  Please try again...");
            CancelWait();            
        }
        else {

            var urlMethod = '/Services/AjaxHelper.asmx/SaveCustomerInfo';
            var jsonData = $.validator.format("{fname:'{0}', lname:'{1}', add1:'{2}', add2:'{3}', city:'{4}', state:'{5}', zip:'{6}', hphone:'{7}', hext:'{8}', cphone:'{9}', cext:'{10}', email:'{11}', confemail:'{12}', comments:'{13}'}",
                                            fname, lname, add1, add2, city, state, zip, hphone, hext, cphone, cext, email, confemail, comments);
            SendAjax(urlMethod, jsonData, SaveCustomerInfoCallback);
        }
    }
    else {
        $("div[id*=customerrequiredtext]").html("Not all required fields populated.  Please try again...");
        CancelWait();
    }
}

function SaveCustomerInfoCallback(data) {
    // 0 is successful
    // 1 is error in order creation
    // 2 is error is customer search/insert(if new)

    var abc = data.d + "";

    switch (abc.charAt(0)) {
        case "3":
            $.fancybox.close();
            var def = abc.substring(1);
            window.location.href = "/ThankYou.aspx?" + def;
            break;
        case "1":
            CancelWait();
            $("div[id*=customerrequiredtext]").html("Problem creating order.  Please try again...");
            break;
        case "2":
            CancelWait();
            $("div[id*=customerrequiredtext]").html("Problem saving customer information.  Please try again...");
            break;
    }

    return true;
}