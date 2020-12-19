import React, { Component } from 'react';
import './Map.scss';
// eslint-disable-next-line
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle, Tooltip, useMapEvents, Polygon} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import euCountries from '../../../counties.js';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// const geojson = L.geoJson(euCountries, { 
//   style: function (feature) { 
//       return {
//           'weight': 1,
//           'color': 'black',
//           'fillColor': '#000',
//           'fillOpacity': 0.3
//       }
//   }
// });
const geodatas = euCountries;
//  onEachFeature
// geodatas.eachLayer(function (layer) {
//   layer.bindPopup(layer.feature.properties.name);
// });
// geodatas.on('mouseover', function (e) {
//   e.sourceTarget.setStyle({
//       fillColor: "#db2929",
//       fillOpacity: 0.5
//   });
// });
// geodatas.on('popupclose', function (e) {
//   e.sourceTarget.setStyle({
//       fillColor: "#000",
//       fillOpacity: 0.3
//   });
// });

const purpleOptions = { color: '#000', fillColor: '#000', fillOpacity: 0.3, weight: 1 }

console.log(geodatas.features);

// geodatas.features.forEach((e) => {
//   e.on('popupclose', function (elem) {
//     elem.sourceTarget.setStyle({
//           fillColor: "#000",
//           fillOpacity: 0.3
//       });
//     });
// console.log(e.id);
// });


function RenderCircle() {
  return (
    <Circle
      center={[51.505, -0.09]}
      pathOptions={{ fillColor: 'red', fillOpacity: 1, color: 'red' }}
      radius={20000}>
    </Circle>
  )
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geodatas: geodatas,
      lat: 51.881403,
      lng: 0.918583,
      zoom: 4,
    };
  }

  render() {

    const position = [this.state.lat, this.state.lng];
    
    return (
      <div id="map" className="map">

        <MapContainer center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
          />
          <GeoJSON pathOptions={purpleOptions} data={this.state.geodatas} />
          {/* <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            <Tooltip>123</Tooltip>
          </Marker> */}
          <Circle
            center={[50.505, 10.09]}
            pathOptions={{ fillColor: 'red', fillOpacity: 1, color: 'red' }}
            radius={20000}>
            <Tooltip>123</Tooltip>
          </Circle>
          <RenderCircle />
        </MapContainer>
        
      </div>
    );
  }
}

export default Map;
