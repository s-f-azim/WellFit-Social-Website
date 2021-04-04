import api from '../services/api';

const searchRadius=async(type,zipcode,page)=>api.get(`${type}/radius/${zipcode}/20`,{params:{page}});

export default searchRadius


