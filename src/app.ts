// get your own api key
import { googleApiKey } from './apiKey';
import axios from 'axios';

const GOOGLE_API_KEY = googleApiKey;
const form = document.querySelector('form');
const addressInput = document.querySelector('input') as HTMLInputElement;
declare var google: any;

type GoogleGeocodingReponse = {
  results: { geometry: { location: { lat: number; lng: number } } };
  status: 'OK' | 'ZERO_RESULTS' | 'INVALID_REQUEST';
};
const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  axios
    .get<GoogleGeocodingReponse>(
      `https://maps.googleapis.com/maps/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error('could not fwtch Location!');
      }
      const coordinates = response.data.results.geometry.location;
      const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 16,
      });
      google.maps.Market({ position: coordinates, map: map });
    })
    .catch((err) => console.log(err));
};

form!.addEventListener('submit', searchAddressHandler);
