import React, { useRef } from 'react'; 
import { useSelector } from 'react-redux';
//import { setCoordinates, setZoom, setMapType } from '../../Redux/Actions/mapAction';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';


const Maps = () => {
  
  const { coordinates, zoom, mapType } = useSelector(state => state.map) || {};
  //const dispatch = useDispatch();

  
  const defaultCenter = { lat: -34.615689, lng: -58.435104 };
  const defaultZoom = 15;
  const defaultMapTypeId = 'roadmap';

  
  const mapRef = useRef(null);

  
  const { isLoaded } = useJsApiLoader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], 
  });

  
  const handleMapLoad = (map) => {
    
    mapRef.current = map;
  };

  

  return (
    
    isLoaded && (
      
      <GoogleMap
     mapContainerStyle={{height: "400px", width:"600px"}}
        center={coordinates?.length > 0 ? coordinates : defaultCenter}
        zoom={zoom || defaultZoom}
        mapTypeId={mapType || defaultMapTypeId}
        onLoad={handleMapLoad} 
      >
       
        {coordinates?.map((coord, index) => {
          return (
            <Marker
              key={index}
              position={coord}
            />
          );
        })}
        
      </GoogleMap>
    
    )
  );
};

export default Maps;


