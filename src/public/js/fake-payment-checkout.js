$(document).ready(function () {
	$('#paymentForm').submit(async function (e) {
		e.preventDefault();

		const cardNumber = $('#cardNumber').val()?.trim();
		const cardNumberRegex = /\d{8,19}/i;
		if (!cardNumberRegex.test(cardNumber)) {
			return $('#cardNumber').addClass('empty-error');
		}

		const cardAuthor = $('#cardAuthor').val()?.trim();
		if (!cardAuthor) {
			return $('#cardAuthor').addClass('empty-error');
		}

		const captcha = $('#captcha').val();
		if (captcha !== 'E28') {
			return $('#captcha').addClass('empty-error');
		} else {
			$('#captcha').remove('empty-error');
		}

		$('#paymentSubmitBtn').addClass('disabled');

		this.submit();
	});

	$('#cancelPaymentBtn').click(() => {
		location.href = '/put-money';
	});
});
