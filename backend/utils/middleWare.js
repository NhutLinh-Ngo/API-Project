const { Op } = require('sequelize');

function spotQueryFilter(req, res, next) {
	const { maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;
	const where = {};

	// formulate where clause for price
	if (minPrice) where.price = { [Op.gte]: minPrice };
	if (maxPrice) where.price = { [Op.lte]: maxPrice };
	if (maxPrice && minPrice)
		where.price = {
			[Op.and]: [{ [Op.gte]: minPrice }, { [Op.lte]: maxPrice }]
		};

	// formulate latitute where clause
	if (maxLat) where.lat = { [Op.lte]: maxLat };
	if (minLat) where.lat = { [Op.gte]: minLat };
	if (maxLat && minLat)
		where.lat = { [Op.and]: [{ [Op.lte]: maxLat }, { [Op.gte]: minLat }] };

	// formulate longitute where clause
	if (maxLng) where.lat = { [Op.lte]: maxLng };
	if (minLng) where.lat = { [Op.gte]: minLng };
	if (maxLng && minLng)
		where.lat = { [Op.and]: [{ [Op.lte]: maxLng }, { [Op.gte]: minLng }] };

	req.where = where;
	next();
}

function createPaginationObject(req, res, next) {
	let defaultSize = 20,
		defaultPage = 1;
	let { page, size } = req.query;
	page = isNaN(page) ? defaultPage : page;
	size = isNaN(size) ? defaultSize : size;
	page = page === undefined ? defaultPage : parseInt(page);
	size = size === undefined ? defaultSize : parseInt(size);
	const pagination = {};
	if (page >= 1 && size >= 1) {
		pagination.limit = size;
		pagination.offset = size * (page - 1);
	}
	req.page = page;
	req.size = size;
	req.pagination = pagination;
	next();
}

module.exports = {
	spotQueryFilter,
	createPaginationObject
};
