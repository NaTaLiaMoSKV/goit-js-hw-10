import Notiflix from 'notiflix';
import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countriesList = document.querySelector('ul.country-list');
const countryInfobox = document.querySelector('div.country-info');

input.addEventListener('input', debounce((e) => {
    fetchCountries(e.target.value)
    .then(fetchCountriesSuccess)
    .catch(fetchCountriesError); 
}, DEBOUNCE_DELAY))

function fetchCountriesSuccess(countries) {
    clearHTML();
    if(countries.length === 1) {
        renderCountryCard(countries[0]);
    } else if(countries.length <= 10 && countries.length >= 2) {
        renderCountriesList(countries);
    } else if(countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } 
}

function fetchCountriesError(error) {
    clearHTML();
    if(input.value.length !== 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name') 
    }
}

function renderCountriesList(countries) {
    for(let i = 0; i < countries.length; i++) {
        const countriesListMarkup = `<li class="country-list__item"> 
        <img src="${countries[i].flags.svg}" width="30"> </img>
        ${countries[i].name.official}
        </li>`;
        countriesList.insertAdjacentHTML('beforeend', countriesListMarkup);
    }
}

function renderCountryCard(country) {
    const countryCardMarkup = `<img src="${country.flags.svg}" alt="${country.name.official} flag" width="40">
    <span class="country-info__name">${country.name.official}</span>
    <ul class="country-info__list">
      <li class="country-info__item"><b>Capital:</b> ${country.capital}</li>
      <li class="country-info__item"><b>Population:</b> ${country.population}</li>
      <li class="country-info__item"><b>Languages:</b> ${Object.values(country.languages).join(', ')} </li>
    </ul>`;
    countryInfobox.innerHTML = countryCardMarkup;
}

function clearHTML() {
    countriesList.innerHTML = '';
    countryInfobox.innerHTML = '';
}
