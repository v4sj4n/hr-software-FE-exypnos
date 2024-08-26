// import React from 'react';
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// const mapContainerStyle = {
//     width: "100%",
//     height: "300px",
// };

// const center = {
//     lat: 41.3275,
//     lng: 19.8189,
// };

// const MapPicker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: (import.meta as any).env.VITE_MAP_API_KEY,
//     });

//     const [selectedLocation, setSelectedLocation] = React.useState(center);

//     const onMapClick = React.useCallback((event: google.maps.MapMouseEvent) => {
//         if (event.latLng) {
//             const lat = event.latLng.lat();
//             const lng = event.latLng.lng();
//             setSelectedLocation({ lat, lng });
//             onLocationSelect(lat, lng);
//         }
//     }, [onLocationSelect]);

//     const onMarkerDragEnd = React.useCallback((event: google.maps.MapMouseEvent) => {
//         if (event.latLng) {
//             const lat = event.latLng.lat();
//             const lng = event.latLng.lng();
//             setSelectedLocation({ lat, lng });
//             onLocationSelect(lat, lng);
//         }
//     }, [onLocationSelect]);

//     if (loadError) return <div>Error loading maps</div>;
//     if (!isLoaded) return <div>Loading Maps...</div>;

//     return (
//         <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             zoom={10}
//             center={selectedLocation}
//             onClick={onMapClick}
//         >
//             <Marker
//                 position={selectedLocation}
//                 draggable={true}
//                 onDragEnd={onMarkerDragEnd}
//             />
//         </GoogleMap>
//     );
// };

// export default MapPicker;



import React from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "300px",
};

const center = {
    lat: 41.3275,
    lng: 19.8189,
};


const MapPicker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBSyIgo2TtwzkihGKrRGcrWxW_k6zwkYOk",
    });

    const [selectedLocation, setSelectedLocation] = React.useState(center);

    const onMapClick = React.useCallback((event:any) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSelectedLocation({ lat, lng });
            onLocationSelect(lat, lng); 
        }
    }, [onLocationSelect]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={selectedLocation}
            onClick={onMapClick}
        >
            <Marker position={selectedLocation} />
        </GoogleMap>
    );
};

export default MapPicker;