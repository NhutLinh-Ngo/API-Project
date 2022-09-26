// backend/routes/api/index.js
const router = require('express').Router();
const {
	setTokenCookie,
	restoreUser,
	requireAuth
} = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const { User } = require('../../db/models');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);

router.post('/test', (req, res) => {
	res.json({ requestBody: req.body });
});

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
