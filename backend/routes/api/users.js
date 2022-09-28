const express = require('express');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup } = require('../../utils/validation');

const router = express.Router();

// Sign up
router.post('/', validateSignup, async (req, res) => {
	const { email, password, username, firstName, lastName } = req.body;
	const user = await User.signup({
		email,
		username,
		password,
		firstName,
		lastName
	});

	const token = await setTokenCookie(res, user);
	const resUser = user.toJSON();
	resUser.token = token;
	return res.json({
		user: resUser
	});
});

module.exports = router;
