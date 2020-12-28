import React, {useState, useEffect} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import io from 'socket.io-client'


const mapStyles = {
  height: "100vh",
  width: "100%"
};

const defaultCenter = {
  lat: 48.91781613059273, lng: 24.70932375844556
}

const App = () => {

  const [locationsDb, setLocationsDb] = useState([])

  useEffect(() => {

    console.log("connected")
    const socket = io('https://world-map-markers.herokuapp.com/')

    socket.on("marker", data => {
      setLocationsDb(data)
      console.log(data)
      return setTimeout(() => {
        setLocationsDb([])
      }, 3000)
    })
  }, [])


  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
      <div>
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={11}
            center={defaultCenter}
        >
          {locationsDb.map((locations) => (
              <Marker
                  key={`${locations.lat}-${locations.lng}`}
                  position={{lat: locations.lat, lng: locations.lng}}

                  icon={{
                    url: `/map-marker.svg`,
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(20, 20),
                  }}
              />
          ))}
        </GoogleMap>
      </div>
  )
};

export default App;
