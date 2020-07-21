import axios from 'axios';
import {baseUrl} from '../apiKeys.json';

const getListOfLocations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/location/list`)
    .then((result) => resolve(result.data))
    .catch(error => reject(error))
});

export default { getListOfLocations };