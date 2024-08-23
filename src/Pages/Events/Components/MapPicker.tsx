import React, { useCallback, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    height: "400px",
    width: "100%",
};

const center = {
    lat: 41.3275, 
    lng: 19.8189,
};

interface Location {
    lat: number;
    lng: number;
}

interface MapPickerProps {
    onLocationSelect: (location: Location) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBSyIgo2TtwzkihGKrRGcrWxW_k6zwkYOk",
    });

    const [markerPosition, setMarkerPosition] = useState<Location>(center);

    const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat() ?? 0;
        const lng = event.latLng?.lng() ?? 0;
        setMarkerPosition({ lat, lng });
        onLocationSelect({ lat, lng });
    }, [onLocationSelect]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={markerPosition}
            onClick={onMapClick}
        >
            <Marker position={markerPosition} />
        </GoogleMap>
    );
};

export default MapPicker;
