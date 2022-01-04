// show & hide toast message
function showToastMsg(toast, message = 'Message', type = '', timeout = 3000) {
	if (toast) {
		toast
			.html(`${message} <div class="close-icon">x</div>`)
			.addClass(`${type} show`);

		if (timeout !== 0) {
			setTimeout(() => {
				toast.removeClass(`${type} show`);
			}, timeout);
		}
	}
}

// format date
function formatDateToStr(date) {
	const d = new Date(date);
	const y = d.getFullYear();
	const mm = `0${d.getMonth() + 1}`.slice(-2);
	const dd = `0${d.getDate()}`.slice(-2);

	return `${dd}-${mm}-${y}`;
}

function autoActiveMenuItem() {
	const { pathname } = location;
	$('.menu-item a').each(function () {
		if ($(this).attr('href') === pathname) {
			$(this).parents('.menu-item').addClass('active');
		}
	});
}

// auto register when DOM loaded
$(document).ready(function () {
	// Hide toast message
	$('.toast-msg').click(function () {
		$(this).removeClass('show danger warning');
	});

	// show & hide view password input
	$('.view-password-icon').click(function () {
		const that = $(this);
		const field = that.siblings('input');

		if (that.hasClass('bi-eye-fill')) {
			that.removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
			field.attr('type', 'password');
		} else {
			that.removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
			field.attr('type', 'text');
		}
	});

	autoActiveMenuItem();
});
