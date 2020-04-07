import React, { Component } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import { MarkerClusterer as MarkerCluster} from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withStateHandlers } from "recompose";
import FaAnchor from "react-icons/fa";

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
const MapWithMarkers = compose( 
  withProps({
    googleMapURL:`https:/maps.googleapis.com/maps/api/js?key=${mapAPIKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `62vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(() => 
    ({
      infoIndexes: new Set(),
      mouseOverIndex: null
    }),
    {
      onMarkerClusterClick: () => (markerCluster) => {
        const clickedMarkers = markerCluster.getMarkers()
        console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        console.log(clickedMarkers)
      },
      onMarkerClick: ({infoIndexes}) => (index) => (
        infoIndexes.has(index) ? infoIndexes.delete(index) : infoIndexes.add(index),
        {
          infoIndexes: new Set(infoIndexes)
        }
      ),
      onMarkerMouseOver: ({mouseOverIndex}) => (index) => (
        // console.log(mouseOverIndex),
        {
          mouseOverIndex: index
        }
        // console.log(mouseOverIndex)
      ),
      onMarkerMouseOut: ({mouseOverIndex}) => () => (
        // console.log(mouseOverIndex),
        {
          mouseOverIndex: null
        }
      )
    },
  ),
  withScriptjs,
  withGoogleMap
)(props => (
        <GoogleMap
            defaultZoom={2.0}
            minZoom={1}
            defaultCenter={{ lat: 20, lng: 10 }}
            options={{
                styles: mapStyles,
                scrollwheel: false,
                streetViewControl: false
            }}
        >
          <MarkerCluster
            onClick={props.onMarkerClusterClick}
            averageCenter
            enableRetinaIcons
            gridSize={30} // group markers that are 15 units away from each other
          >
            {
              props.isMarkerShown && props.marks.map((marker) => (
                <Marker
                  icon={{
                      url: require('../../assets/launchpad-marker.png'),
                      anchor: {x: 7, y: 28},
                      scaledSize: {width: 14, height: 28}
                  }}
                  key={marker.id}
                  position={marker}
                  onClick={() => props.onMarkerClick(marker.id)}
                  onMouseOver={() => props.onMarkerMouseOver(marker.id)}
                  onMouseOut={() => props.onMarkerMouseOut()}
                >
                  {
                    (//console.log(props.infoIndexes, props.mouseOverIndex, marker.id),
                      props.infoIndexes.has(marker.id) || props.mouseOverIndex == marker.id) &&
                    <InfoWindow 
                      onCloseClick={props.onClick}
                    >
                      <div>
                        <p style={{color: 'black'}}>{`Latlon: ${marker.lat}, ${marker.lng}`}</p>
                      </div>
                    </InfoWindow>
                  }
                </Marker>
            ))}
            </MarkerCluster>
        </GoogleMap>
    )
);

export default class MapContainer extends Component {
    constructor(props){
      super(props);
      this.state = {
        pads: [],
      }
    }

    componentDidMount(){
      console.log('didMount');
      const url = `https://launchlibrary.net/1.4/pad/?limit=1000/`;
      fetch(url, {
          method: "GET"
      })
      .then(response => response.json())
      .then(data => {
          let pads = data.pads.filter(pad => (pad.latitude != 0) && (pad.longitude != 0) )
          .map((pad, index) => (
              {
                  id: pad.id,
                  lat: Number(pad.latitude),
                  lng: Number(pad.longitude),
                  latlng: `${pad.latitude}${pad.longitude}`
              }
          ));
          /* filter duplicated latlng */
          const uniquePads = Array.from(new Set(pads.map(pad => pad.latlng)))
            .map((latlng) => {
             return pads.find(pad => pad.latlng === latlng)
          })
          this.setState({pads: uniquePads})
          // console.log(pads);
      });
    };

    componentDidUpdate() {
      console.log('didUpdate');
    }

    render () {
        const { pads } = this.state;
        // const { index } = this.props.Marker;
        console.log(this.state);
        return (
            <div>
                <MapWithMarkers
                    isMarkerShown
                    marks={pads}
                />
            </div>
        )
    }
}
