import axios from 'axios';
import { Report } from 'notiflix/build/notiflix-report-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
export { fetchBreeds, fetchCatByBreed };

fetchBreeds().then(response => {
  return response.data;
});

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => console.log(error));
}
