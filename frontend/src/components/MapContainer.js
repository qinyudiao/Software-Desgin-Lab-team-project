import React from 'react'
import { compose, withProps } from "recompose"
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={1}
    defaultCenter={{ lat: 0, lng: 0 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 0, lng: 0 }} />}
  </GoogleMap>
))

export default function MapContainer() {
    return (
        <div>
            <MyMapComponent
                isMarkerShown
                googleMapURL="https:/maps.googleapis.com/maps/api/js?key=AIzaSyD4MYem9eEY7_iLZSCyOdy-40GBCq4x2vY&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}
