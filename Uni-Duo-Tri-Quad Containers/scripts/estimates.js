$(document).ready(function (e) {
	/*******************************************************************************/
	/*	EVENTS
	/*******************************************************************************/

	$(document).on('click', '.offer', function (e) {
		var $toggleClasses = $('.hiddenContent, .seemoreOffers');
		var $hiddenContent = $('.hiddenContent');
		var $specialoffers = $('.specialOffers');
		var $hiddenOffers = $('.hiddenOffers');
		var seperator = "<div class='seperator'></div>";

		if ($hiddenContent.hasClass('hide')) {
			$(seperator).appendTo('.offer');
			$toggleClasses.toggleClass('hide');
		}
		else {
			var _this = $(this);
			var $newactiveoffer = _this;
			var $existingdisplayedoffer = $('.displayedOffers .offer:first');

			if ($newactiveoffer[0] != $existingdisplayedoffer[0]) {
				// handle new displayed offer
				$existingdisplayedoffer.remove();
				$('.displayedOffers').append($newactiveoffer);
				$('.hiddenOffers').append($existingdisplayedoffer);
			}
			$('.specialOffers .seperator').remove();
			$toggleClasses.toggleClass('hide');
		}
	});

	function FetchSpecialOffersCallback(data) {
		var offer = '';
		var IsOfferDisplayed = true;

		$.each(data.d, function (key, val) {
			if (IsOfferDisplayed) {
				IsOfferDisplayed = false;
				offer = "<div class='offer' data-id='" + val.SpecialOfferItemID + "'>" +
				"<div class='offername'>" + val.SpecialOfferName + "</div>" +
				"<div class='offerdetail'>" + val.ExtendedDetail + "</div>" +
				"</div>";
				$('.displayedOffers').append(offer);
			}
			else {
				// hiddenOffers
				offer = "<div class='offer' data-id='" + val.SpecialOfferItemID + "'>" +
				"<div class='offername'>" + val.SpecialOfferName + "</div>" +
				"<div class='offerdetail'>" + val.ExtendedDetail + "</div>" +
				"</div>";
				$('.hiddenOffers').append(offer);
			}
		});
	}

	function FetchSpecialOffers(e) {
		var tid = 'EB68B940-E777-4BB4-9F50-18188A966676';
		var oid = 'EFD2DD10-CE41-4794-81E7-1D04E54DA342';
		var stid = 'EE27F73A-EB85-46B4-A2DE-7322B29F52F6';

		var urlMethod = '/Services/AjaxHelper.asmx/FetchSpecialOffers';
		var jsonData = $.validator.format("{OwnerID:'{0}', ServiceTypeID:'{1}', TerritoryID:'{2}'}", oid, stid, tid);
		SendAjax(urlMethod, jsonData, FetchSpecialOffersCallback);
	}

	FetchSpecialOffers();
});