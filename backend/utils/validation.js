// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)

const handleValidationErrors = (req, _res, next) => {
	const validationErrors = validationResult(req);
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
	check('preview')
		.isBoolean()
		.withMessage('Preview must be boolean true/false'),
	handleValidationErrors
];
const validateQueryParams = [
	check('page')
		.optional()
		.isInt({ min: 1 })
		.withMessage('Page must be greater than or equal to 1'),
	check('size')
		.optional()
		.isInt({ min: 1 })
		.withMessage('Size must be greater than or equal to 1'),
	check('maxLat')
		.optional()
		.isFloat({ min: -90, max: 90 })
		.withMessage('Maximum latitude is invalid'),
	check('minLat')
		.optional()
		.isFloat({ min: -90, max: 90 })
		.withMessage('Minimum latitude is invalid'),
	check('minLng')
		.optional()
		.isFloat({ min: -180, max: 180 })
		.withMessage('Minimum latitude is invalid'),
	check('maxLng')
		.optional()
		.isFloat({ min: -180, max: 180 })
		.withMessage('Maximum latitude is invalid'),
	check('minPrice')
		.optional()
		.isFloat({ min: 0 })
		.withMessage('Minimum price must be greater than or equal to 0'),
	check('maxPrice')
		.optional()
		.isFloat({ min: 0 })
		.withMessage('Maximum price must be greater than or equal to 0'),
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
		.isLength({ max: 250 })
		.withMessage('Name must be less than 250 characters')
		.bail()
		.notEmpty()
		.withMessage('Name must be more than 1 characters'),
	check('description')
		.exists({ checkFalsy: true })
		.withMessage('Description is required'),
	check('price')
		.exists()
		.withMessage('Price per day is required')
		.bail()
		.isInt({ min: 1 })
		.withMessage('Minimum price is $1'),
	handleValidationErrors
];

const validateBookingDates = [
	check('startDate').isDate().withMessage('must be date YYYY-MM-DD format'),
	check('endDate').isDate().withMessage('must be date YYYY-MM-DD format'),
	handleValidationErrors
];

const validateSignup = [
	check('email')
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage('Please provide a valid email.'),
	check('username')
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage('Please provide a username with at least 4 characters.'),
	check('username').not().isEmail().withMessage('Username cannot be an email.'),
	check('password')
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage('Password must be 6 characters or more.'),
	check('firstName')
		.exists({ checkFalsy: true })
		.isLength({ min: 1 })
		.withMessage('Please provide a first name with at least 1 characters.'),
	check('lastName')
		.exists({ checkFalsy: true })
		.isLength({ min: 1 })
		.withMessage('Please provide a last name with at least 1 characters.'),
	handleValidationErrors
];
module.exports = {
	handleValidationErrors,
	validateSpot,
	validateSpotImage,
	validateQueryParams,
	validateBookingDates,
	validateSignup
};
