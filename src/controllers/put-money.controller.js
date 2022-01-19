const BANK_LIST = require('../constants/bank-list');
const jwt = require('jsonwebtoken');
const {
	MAX,
	JWT_CHECKOUT_SUCCESS_KEY,
	TRACKING_QUERY_KEY,
	PRIVATE_KEY,
	API_AUTH_HEADER,
	PAYMENT_TYPES,
} = require('../constants');
const PaymentHistory = require('../models/payment-history.model');
const Account = require('../models/account.model');
const MainAccount = require('../models/main-account.model');
const axios = require('axios').default;
const { getUserDebt, getPaymentLimit, formatCurrency } = require('../helpers');
const DebtHistory = require('../models/debt-history');
const { db } = require('../configs/db.config');

exports.getPutMoneyPage = (req, res) => {
	const token = req.query[TRACKING_QUERY_KEY];

	return res.render('put-money.pug', {
		bankList: BANK_LIST,
		token,
	});
};

exports.getCheckoutSuccess = async (req, res) => {
	const { token } = req.query;
	const tx = await db.transaction();

	try {
		const jwtData = jwt.verify(token, JWT_CHECKOUT_SUCCESS_KEY);
		if (!jwtData) throw new Error('jwt is null');

		let {
			transactionCode,
			totalMoney,
			bank,
			accountId,
			cardNumber,
			token: AToken,
		} = jwtData.sub;
		[totalMoney, accountId] = [totalMoney, accountId].map(Number);

		const account = await Account.findOne({ raw: true, where: { accountId } });
		if (!account) throw "Account doesn't exists";
		const currentBalance = Number(account.balance);

		const userDebt = await getUserDebt(accountId);
		let newBalance = currentBalance + totalMoney;
		let paymentType = PAYMENT_TYPES.SEND_MONEY;
		const promises = [];

		if (userDebt) {
			const { remainingDebt, returned } = userDebt;

			if (remainingDebt > 0) {
				paymentType = PAYMENT_TYPES.DEBT;
				if (remainingDebt >= totalMoney) {
					newBalance = 0;
					promises.push(
						DebtHistory.update(
							{
								returned: returned + totalMoney,
								status: 1,
								updatedTime: new Date(),
							},
							{
								where: { accountId },
								transaction: tx,
							}
						)
					);
				} else {
					newBalance = currentBalance + (totalMoney - remainingDebt);
					promises.push(
						DebtHistory.update(
							{
								returned: totalMoney - remainingDebt,
								status: 1,
								updatedTime: new Date(),
							},
							{
								where: { accountId },
								transaction: tx,
							}
						)
					);
				}
			}
		}

		promises.push(
			PaymentHistory.create(
				{
					transactionCode,
					totalMoney,
					accountId,
					cardNumber,
					cardName: bank,
					content:
						paymentType === PAYMENT_TYPES.DEBT
							? 'Nạp tiền và thanh toán dư nợ'
							: 'Nạp tiền',
					isPutMoney: true,
					beforeBalance: currentBalance,
					afterBalance: newBalance,
					createdDate: new Date(),
				},
				{ transaction: tx }
			)
		);
		promises.push(
			MainAccount.increment(
				{ balance: totalMoney },
				{ where: { id: 1 }, transaction: tx }
			)
		);

		promises.push(
			axios.post(
				`${process.env.MANAGEMENT_SYSTEM_URL}/api/new-payment-history`,
				{
					paymentDate: new Date(),
					currentBalance: newBalance,
					paymentType,
					totalMoney,
					userId: account.userId,
					consumptionHistoryId: null,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						[API_AUTH_HEADER]: PRIVATE_KEY,
					},
				}
			)
		);

		promises.push(
			Account.update(
				{ balance: newBalance },
				{ where: { accountId }, transaction: tx }
			)
		);

		await Promise.all(promises);
		await tx.commit();

		if (AToken) {
			const { callbackUrl } = jwt.decode(AToken, PRIVATE_KEY).sub;
			return res.redirect(callbackUrl);
		} else {
			req.session.putMoneyStatus = '1';
			return res.redirect('/dashboard');
		}
	} catch (error) {
		console.error('Function getCheckoutSuccess Error: ', error);
		req.session.putMoneyStatus = '0';
		await tx.rollback();
		return res.redirect('/dashboard');
	}
};

exports.postCheckoutPutMoney = async (req, res) => {
	const { totalMoney, bank, token } = req.body;
	const { accountId } = req.user;
	const rootUrl = `${req.protocol}://${req.get('host')}`;

	// Check debt
	const userDebt = await getUserDebt(accountId);
	if (userDebt) {
		const { remainingDebt, status } = userDebt;
		if (!status && remainingDebt) {
			const { minimumLimit } = await getPaymentLimit();
			const minimumPayment = ~~((minimumLimit * remainingDebt) / 100);
			if (!isNaN(minimumPayment) && Number(totalMoney) < minimumPayment) {
				return res.status(400).json({
					url: '',
					msg: `Bạn có khoản dư nợ cần thanh toán là ${formatCurrency(
						remainingDebt
					)}, hạn mức thanh toán tối thiểu là ${minimumLimit}%. Vui lòng nạp số tiền lớn hơn mức ${formatCurrency(
						minimumPayment
					)} để tiếp tục. Cảm ơn`,
				});
			}
		}
	}

	const fakePaymentToken = jwt.sign(
		{
			issuer: 'PayCP',
			iat: Date.now(),
			exp: Date.now() + MAX.CHECKOUT_JWT_EXP,
			sub: {
				accountId,
				totalMoney,
				bank,
				successTokenKey: JWT_CHECKOUT_SUCCESS_KEY,
				callback: `${rootUrl}/put-money/checkout-success`,
				token,
			},
		},
		process.env.JWT_CHECKOUT_SECRET
	);

	const fakePaymentSystemUrl = `${rootUrl}/xyz-fake-payment-system/checkout?token=${fakePaymentToken}`;

	return res.status(200).json({
		url: fakePaymentSystemUrl,
	});
};
