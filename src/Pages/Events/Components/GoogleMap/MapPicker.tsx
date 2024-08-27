import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Input from '@/Components/Input/Index';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 41.3275, 
  lng: 19.8189  
};

type LatLngLiteral = google.maps.LatLngLiteral;
type MapType = google.maps.Map;

interface MapComponentProps {
  onLocationChange: (address: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationChange }) => {
  const [map, setMap] = useState<MapType | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(null);

  const onLoad = useCallback((map: MapType) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleSearch = () => {
    if (map) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: searchValue }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const position = results[0].geometry.location.toJSON();
          setMarkerPosition(position);
          map.panTo(position);
          map.setZoom(15);
          onLocationChange(results[0].formatted_address); 
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng && map) {
      const clickedPosition = e.latLng.toJSON();
      setMarkerPosition(clickedPosition);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: clickedPosition }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const address = results[0].formatted_address;
          setSearchValue(address); 
          onLocationChange(address);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          setSearchValue(`${clickedPosition.lat}, ${clickedPosition.lng}`); 
          onLocationChange(`${clickedPosition.lat}, ${clickedPosition.lng}`); 
        }
      });

      map.panTo(clickedPosition);
    }
  };

  return (
    <div>
      <Input
        IsUsername
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter location"
        name={''}
      />
      <button onClick={handleSearch}>Search</button>
      <LoadScript googleMapsApiKey="AIzaSyBSyIgo2TtwzkihGKrRGcrWxW_k6zwkYOk">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick} 
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
