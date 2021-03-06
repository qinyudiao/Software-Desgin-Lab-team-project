import React, { Component } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow, Circle } from "react-google-maps";

const mapAPIKey = `AIzaSyD4MYem9eEY7_iLZSCyOdy-40GBCq4x2vY`

// map styles: dark mode
const mapStyles = [
    {elementType: 'geometry', stylers: [{color: '#2a2a29'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f38'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#d0d0d0'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#ed72df'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#000f1b'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#4e86bc'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ];

  // wrap up google map
const MapWithMarkers = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={1.2}
            defaultCenter={{ lat: 12, lng: 20 }}
            defaultOptions={{
                scrollwheel: false,
                streetViewControl: false
            }}
            options={{
                styles: mapStyles,
            }}
        >
            {props.isMarkerShown && props.marks.map((mark, index) => (
                <Marker
                    key = {index}
                    position={mark}
                />
            ))}
        </GoogleMap>
    ))
);

export default class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          marks: []
        }
    }

   componentDidMount(){
        const url = `https://launchlibrary.net/1.4/pad?limit=1000/`;
        fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            let pads = data.pads.map((pad) => (
                {
                    lat: Number(pad.latitude),
                    lng: Number(pad.longitude)
                }
            ));
            
            this.setState({marks: pads})
            console.log(pads);
        });
    };

    render () {
        const { marks } = this.state;
        return (
            <div>
                <MapWithMarkers
                    isMarkerShown
                    googleMapURL={`https:/maps.googleapis.com/maps/api/js?key=${mapAPIKey}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    marks={marks}
                />
            </div>
        )
    }
}
