const BANK_LIST = [
	{
		code: 'VCB',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280945/covid-project/paycp/banks/Vietcombank.png',
		name: 'Ngân hàng Ngoại thương Việt Nam – Vietcombank',
	},
	{
		code: 'VPBank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280945/covid-project/paycp/banks/VPbank.png',
		name: 'Ngân hàng Việt Nam Thịnh Vượng – VPBank',
	},
	{
		code: 'TPBank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280944/covid-project/paycp/banks/TPbank.png',
		name: 'Ngân hàng Ngân hàng Tiên Phong – TPBank',
	},
	{
		code: 'VietinBank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280944/covid-project/paycp/banks/Vietinbank.png',
		name: ' Ngân hàng Công Thương Việt Nam – Vietinbank ',
	},
	{
		code: 'SCB',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280943/covid-project/paycp/banks/SCB.png',
		name: 'Ngân hàng Sài Gòn - SCB',
	},
	{
		code: 'Techcombank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280943/covid-project/paycp/banks/Techcombank.png',
		name: 'Ngân hàng Kỹ Thương Việt Nam – Techcombank',
	},
	{
		code: 'Oceanbank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280943/covid-project/paycp/banks/Oceanbank.png',
		name: 'Ngân hàng Đại Dương – Oceanbank',
	},
	{
		code: 'Sacombank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280943/covid-project/paycp/banks/Sacombank.png',
		name: 'Ngân hàng Sài Gòn Thương Tín – Sacombank',
	},
	{
		code: 'GPB',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280943/covid-project/paycp/banks/GPBANK.png',
		name: 'Ngân hàng Dầu Khí Toàn Cầu – GPBank',
	},
	{
		code: 'MB',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280942/covid-project/paycp/banks/MBbank.gif',
		name: 'Ngân hàng Quân đội – MB',
	},
	{
		code: 'MSB',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280942/covid-project/paycp/banks/MSB.png',
		name: 'Ngân hàng Hàng Hải Việt Nam – MSB',
	},
	{
		code: 'LienVietPostBank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280942/covid-project/paycp/banks/LienVietPostBank.png',
		name: 'Ngân hàng Bưu điện Liên Việt – LienVietPostBank',
	},
	{
		code: 'CBbank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280942/covid-project/paycp/banks/CBbank.png',
		name: 'Ngân hàng Xây dựng - CB',
	},
	{
		code: 'BIDV',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280941/covid-project/paycp/banks/BIDV.png',
		name: 'Ngân hàng Đầu tư và Phát triển Việt Nam – BIDV',
	},
	{
		code: 'Agribank',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280941/covid-project/paycp/banks/Agribank.png',
		name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam – Agribank',
	},
	{
		code: 'ACB',
		logoUrl:
			'https://res.cloudinary.com/dsxlwpobo/image/upload/v1641280941/covid-project/paycp/banks/ACB.png',
		name: 'Ngân hàng Ngân hàng Á Châu – ACB',
	},
];

module.exports = BANK_LIST.sort((a, b) =>
	a.code > b.code ? 1 : a.code < b.code ? -1 : 0
);
