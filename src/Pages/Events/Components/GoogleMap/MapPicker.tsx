import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 41.1533,
  lng: 20.1683,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

interface Geolocation {
  latitude: number;
  longitude: number;
}

const MapPicker = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBSyIgo2TtwzkihGKrRGcrWxW_k6zwkYOk',
    libraries: ['places'],
  });

  const [selected, setSelected] = useState<Geolocation | null>(null); 

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: new google.maps.LatLng(41.1533, 20.1683), 
      radius: 200 * 1000, 
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ latitude: lat, longitude: lng }); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Type a place"
      />
      <div>
        {status === 'OK' &&
          data.map(({ place_id, description }) => (
            <div key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </div>
          ))}
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={selected ? { lat: selected.latitude, lng: selected.longitude } : center}
        options={options}
      >
        {selected && <Marker position={{ lat: selected.latitude, lng: selected.longitude }} />}
      </GoogleMap>
    </div>
  );
};

export default MapPicker;
