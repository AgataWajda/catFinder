import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchBreeds, fetchCatByBreed } from './cats-api';

axios.defaults.headers.common['x-api-key'] =
  'live_VuFHRnnxrSNLkejTYIKtvUH6Op6YfTmkVb0DMO6ZxgH3rcz15NjdHjewcLw7twyG';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

let select;

breedSelect.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => {
    select.setData(
      breeds.map(breed => ({
        text: breed.name,
        value: breed.id,
      }))
    );
    breedSelect.classList.remove('is-hidden');
    loader.classList.add('is-hidden');
  })
  .catch(() => {
    loader.classList.add('is-hidden');
    Report.failure(
      'Error',
      'Oops! Something went wrong! Try reloading the page!',
      'Okay'
    );
  });

select = new SlimSelect({
  select: '.breed-select',
  events: {
    afterChange: newVal => {
      loader.classList.remove('is-hidden');
      catInfo.classList.add('is-hidden');
      let value = newVal[0].value;
      fetchCatByBreed(value)
        .then(data => {
          const { url, breeds } = data;
          const { name, description, temperament } = breeds[0];

          const markup = `
          <div class= "image-box">
              <img src="${url}" class ="cat-img"> 
        </div>     
        <div class = "cat-box">
            <h2 class = "cat-name">${name}</h2>
            <p class = "description">${description}</p>
            <p class= "temperament">${temperament}</p>
        </div>
         `;
          catInfo.innerHTML = markup;
          loader.classList.add('is-hidden');
          catInfo.classList.remove('is-hidden');
        })
        .catch(() => {
          loader.classList.add('is-hidden');
          Report.failure(
            'Error',
            'Oops! Something went wrong! Try reloading the page!',
            'Okay'
          );
        });
    },
  },
});
