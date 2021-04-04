import api from '../services/api';

const searchRadius=async(type,zipcode,page,category)=>api.get(`${type}/radius/${zipcode}/20`,{params:{page,
       'tags[all]': category ,
}});

export default searchRadius


