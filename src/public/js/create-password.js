$(document).ready(function () {
	$('#pwdForm').submit(function (e) {
		e.preventDefault();

		const submitBtn = $('#submitBtn');
		const formMsg = $('#formMsg');

		const password = $('#password').val();
		const confirmPw = $('#confirmPw').val();

		const strengthPwRegex =
			/^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,40}$/;
		if (!strengthPwRegex.test(password)) {
			formMsg.text(
				'Mật khẩu từ 6-40 ký tự, ít nhất 1 ký tự số, 1 ký tự thường, 1 ký tự hoa, 1 ký tự đặc biệt.'
			);
			return submitBtn.removeClass('disabled');
		}

		// confirm password
		if (password !== confirmPw) {
			formMsg.text('Mật khẩu không trùng khớp');
			return submitBtn.removeClass('disabled');
		}

		this.submit();
	});
});
