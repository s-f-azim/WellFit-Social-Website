import asyncHandler from './async.js';
import geocoder from '../utils/geocoder.js';

// custom paginate middleware that does pagination and also filtering
const paginateAndFilter = (model) =>
  asyncHandler(async (req, res, next) => {
    let query;
    if (req.query.tags) {
      req.query.tags.all = req.query.tags.all.split(',');
    }
    if (req.query.trainingEquipment) {
      req.query.trainingEquipment.all = req.query.trainingEquipment.all.split(
        ','
      );
    }
    let reqQuery = { ...req.query };
    // let reqQuery = Object.fromEntries(
    //   Object.entries(req.query).filter(([_, v]) => v != null && v.length > 1)
    // );
    const removeFields = ['select', 'sort', 'page', 'limit', 'name'];
    removeFields.forEach((param) => delete reqQuery[param]);
    // check for geospaital search
    if (
      String(req.url).includes('radius') &&
      req.params.zipcode &&
      req.params.distance
    ) {
      const { zipcode, distance } = req.params;
      // get lat/lng from geocoder
      const loc = await geocoder.geocode(zipcode);
      const { latitude, longitude } = loc[0];
      // Calc radius using radians
      const radius = distance / 6378;
      delete reqQuery.location;
      reqQuery = {
        location: {
          $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
        },
        ...reqQuery,
      };
    }
    // if name or title is given match it with a regex
    if (req.query.fName || req.query.lName) {
      delete reqQuery.fName;
      delete reqQuery.lName;
      reqQuery = {
        $or: [
          { fName: { $regex: `${req.query.fName}`, $options: 'i' } },
          { lName: { $regex: `${req.query.lName}`, $options: 'i' } },
        ],
        ...reqQuery,
      };
    }
    if (req.query.title) {
      delete reqQuery.title;
      reqQuery = {
        title: { $regex: req.query.title, $options: 'i' },
        ...reqQuery,
      };
    }

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lte|lt|in|all)\b/g,
      (match) => `$${match}`
    );
    query = model.find(JSON.parse(queryStr));

    // check if select given
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // check if sort is given
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('createdAt');
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();
    query = query.skip(startIndex).limit(limit);
    const results = await query;
    const pagination = { total };
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }
    pagination.total = total;
    res.results = results;
    res.pagination = pagination;
    next();
  });
export default paginateAndFilter;
