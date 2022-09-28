const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
//The check function from express-validator will be used with the
//handleValidationErrors to validate the body of a request.
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
	check('credential')
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage('Please provide a valid email or username.'),
	check('password')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a password.'),
	handleValidationErrors
];

router.post('/', validateLogin, async (req, res, next) => {
	const { credential, password } = req.body;

	const user = await User.login({ credential, password });

	if (!user) {
		const err = new Error('Login failed');
		err.status = 401;
		err.title = 'Login failed';
		err.errors = ['The provided credentials were invalid.'];
		return next(err);
	}

	const token = await setTokenCookie(res, user);
	const resUser = user.toJSON();
	resUser.token = token;
	delete resUser.updatedAt;
	delete resUser.createdAt;
	return res.json({ user: resUser });
});

// Log out
router.delete('/', (_req, res) => {
	res.clearCookie('token');
	return res.json({ message: 'success' });
});

// Restore session user
router.get('/', restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user.toSafeObject()
		});
	} else return res.json({});
});

module.exports = router;
