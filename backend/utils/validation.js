// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)

const handleValidationErrors = (req, _res, next) => {
	const validationErrors = validationResult(req);
	console.log(validationErrors);
	if (!validationErrors.isEmpty()) {
		const erObj = {};
		const errors = validationErrors
			.array()
			.map((error) => (erObj[error.param] = `${error.msg}`));

		const err = Error('Validation Error');
		err.errors = erObj;
		err.status = 400;
		err.title = 'Bad request.';
		next(err);
	}
	next();
};

const validateSpotImage = [
	check('url')
		.exists({ checkFalsy: true })
		.withMessage('url for image required'),
	handleValidationErrors
];
const validateSpot = [
	check('address')
		.exists({ checkFalsy: true })
		.withMessage('Street address is required'),
	check('city').exists({ checkFalsy: true }).withMessage('City is required'),
	check('state').exists({ checkFalsy: true }).withMessage('State is required'),
	check('country')
		.exists({ checkFalsy: true })
		.withMessage('Country is required'),
	check('name')
		.exists({ checkFalsy: true })
		.withMessage('Name is required')
		.bail()
		.isLength({ max: 50 })
		.withMessage('Name must be less than 50 characters')
		.bail()
		.notEmpty()
		.withMessage('Name must be more than 1 characters'),
	check('description')
		.exists({ checkFalsy: true })
		.withMessage('Description is required'),
	check('price').exists().withMessage('Price per day is required'),
	handleValidationErrors
];

module.exports = {
	handleValidationErrors,
	validateSpot,
	validateSpotImage
};
