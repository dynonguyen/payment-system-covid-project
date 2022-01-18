$(document).ready(function () {
	$('#loginForm').submit(function (e) {
		e.preventDefault();

		const submitBtn = $('#submitBtn');
		const username = $('#username').val()?.trim();
		const password = $('#password').val()?.trim();
		if (!username) {
			return $('#formMsg').text('Vui lòng nhập username');
		}

		if (!password) {
			$('#password').val('0');
		}

		submitBtn.addClass('disabled');
		if (token) {
			const action = `/auth/login${token ? `?${trackingKey}=${token}` : ''}`;
			$(this).attr('action', action);
		}

		this.submit();
	});
});
