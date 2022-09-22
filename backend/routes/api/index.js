// backend/routes/api/index.js
const router = require('express').Router();
const {
	setTokenCookie,
	restoreUser,
	requireAuth
} = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);

// router.get('/require-auth', requireAuth, (req, res) => {
// 	return res.json(req.user);
// });

// router.get('/set-token-cookie', async (_req, res) => {
// 	const user = await User.findOne({
// 		where: {
// 			username: 'Demo-lition'
// 		}
// 	});
// 	setTokenCookie(res, user);
// 	return res.json({ user });
// });

// router.get('/restore-user', (req, res) => {
// 	return res.json(req.user);
// });

module.exports = router;
