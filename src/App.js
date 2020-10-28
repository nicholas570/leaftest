import React from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import './App.css';
class App extends React.Component {
  constructor() {
    super();
    this.mapRef = React.createRef();
    this.state = {
      lat: 47.232964,
      lng: -1.51134,
      zoom: 13,
    };
    this.handleOnLocationFound = this.handleOnLocationFound.bind(this);
    this.handleOnLocationError = this.handleOnLocationError.bind(this);
  }

  componentDidMount() {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: true });
    map.on('locationfound', this.handleOnLocationFound);
    map.on('locationerror', this.handleOnLocationError);
  }

  handleOnLocationFound(e) {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;

    const latlng = e.latlng;
    const marker = L.marker(latlng);
    marker.addTo(map).bindPopup('Votre position ').openPopup();
  }

  handleOnLocationError(e) {
    const { current } = this.mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: false });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map ref={this.mapRef} center={position} zoom={this.state.zoom}>
        <TileLayer
          url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default App;
