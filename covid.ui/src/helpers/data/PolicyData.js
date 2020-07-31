import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getPolicies = (locationCode) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/locationpolicy/detail/${locationCode}`)
    .then((result) => resolve(result.data))
    .catch(error => reject(error))
});

export default { getPolicies };