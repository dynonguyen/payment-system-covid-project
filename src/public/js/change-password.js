$(document).ready(function () {
	$('#pwdForm').submit(function (e) {
		e.preventDefault();

		const submitBtn = $('#submitBtn');
		const formMsg = $('#formMsg');

		const oldPassword = $('#oldPassword').val()?.trim();
		const newPassword = $('#newPassword').val()?.trim();
		const confirmPw = $('#confirmPw').val()?.trim();

		if (!oldPassword) {
			return formMsg.text('Vui lòng nhập mật khẩu hiện tại');
		}

		const strengthPwRegex =
			/^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,40}$/;
		if (!strengthPwRegex.test(newPassword)) {
			return formMsg.text(
				'Mật khẩu từ 6-40 ký tự, ít nhất 1 ký tự số, 1 ký tự thường, 1 ký tự hoa'
			);
		}

		// confirm password
		if (newPassword !== confirmPw) {
			return formMsg.text('Mật khẩu không trùng khớp');
		}

		submitBtn.addClass('disabled');

		this.submit();
	});
});
