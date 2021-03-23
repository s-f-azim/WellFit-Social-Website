import api from '../services/api';

const checkout = (body) => api.post('/payment/checkout', body);

export default checkout;
