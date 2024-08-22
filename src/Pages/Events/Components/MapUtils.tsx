import axios from 'axios';

const REVERSE_GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = 'AIzaSyBSyIgo2TtwzkihGKrRGcrWxW_k6zwkYOk'; 

export async function reverseGeocode(lat: any, lng: any) {
  try {
    const response = await axios.get(REVERSE_GEOCODING_API_URL, {
      params: {
        latlng: `${lat},${lng}`,
        key: API_KEY,
      },
    });
    if (response.data.status === 'OK') {
      const location = response.data.results[0].formatted_location;
      return location;
    } else {
      return 'Address not found';
    }
  } catch (error) {
    console.error('Error reverse geocoding', error);
    return 'Address not found';
  }
}
