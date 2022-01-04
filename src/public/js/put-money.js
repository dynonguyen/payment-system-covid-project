const MIN_MONEY = 10_000;
const MAX_MONEY = 100_000_000;
const ERROR_CLASS = 'empty-error';

$(document).ready(function () {
	const totalMoneyInput = $('#totalMoney');

	totalMoneyInput.change(function () {
		const money = $(this).val();
		if (money < MIN_MONEY) {
			return $(this).val(MIN_MONEY);
		}

		if (money > MAX_MONEY) {
			return $(this).val(MAX_MONEY);
		}
	});

	$('#paymentBtn').click(function () {
		const bank = $('input[name="bank"]:checked').val();

		if (!bank) {
			return $('#bankList').addClass(ERROR_CLASS);
		} else {
			$('#bankList').removeClass(ERROR_CLASS);
		}

		const totalMoney = totalMoneyInput.val();
		if (totalMoney < MIN_MONEY || totalMoney > MAX_MONEY) {
			return totalMoneyInput.addClass(ERROR_CLASS);
		} else {
			totalMoneyInput.removeClass(ERROR_CLASS);
		}

		$(this).addClass('disabled');
		fetch('/put-money/checkout', {
			method: 'POST',
			body: JSON.stringify({
				bank,
				totalMoney,
			}),
		});
	});
});
