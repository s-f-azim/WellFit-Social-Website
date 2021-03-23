import asyncHandler from './async.js';
import geocoder from '../utils/geocoder.js';

// custom paginate middleware that does pagination and also filtering
const paginateAndFilter = (model) =>
  asyncHandler(async (req, res, next) => {
    let query;
    let reqQuery = { ...req.query };
    const removeFields = [
      'select',
      'sort',
      'page',
      'limit',
      'screenname',
      'title',
    ];
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
      reqQuery = {
        location: {
          $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
        },
        ...reqQuery,
      };
    }
    // if name is given match it with a regex
    if (req.query.screenname) {
      reqQuery = {
        screenname: { $regex: req.query.screenname, $options: 'i' },
      };
    }
    // if course title is given match it with a regex
    if (req.query.title) {
      reqQuery = {
        title: { $regex: req.query.title, $options: 'i' },
      };
    }

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
      /\b(gt|gte|lte|lt|in)\b/g,
      (match) => `$${match}`
    );
    console.log(queryStr);
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
