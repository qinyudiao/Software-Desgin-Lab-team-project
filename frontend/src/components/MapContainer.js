import React, { Component } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow, Circle } from "react-google-maps";

const mapAPIKey = `AIzaSyD4MYem9eEY7_iLZSCyOdy-40GBCq4x2vY`

const MapWithMarkers = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={1.2}
            defaultCenter={{ lat: 12, lng: 20 }}
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
