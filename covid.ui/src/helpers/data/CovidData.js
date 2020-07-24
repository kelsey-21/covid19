import axios from 'axios';
import {baseUrl} from '../apiKeys.json';

const getAllCovidData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/covid/all`)
    .then((result) => resolve(result.data))
    .catch(error => reject(error))
});

const getMapData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/covid/map`)
    .then((result) => resolve(result.data))
    .catch(error => reject(error))
});

const getStateData = (locationCode) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/covid/historicalpositive/${locationCode}`)
    .then((result) => resolve(result.data))
    .catch(error => reject(error))
});

export default {
  getAllCovidData, getMapData, getStateData
};