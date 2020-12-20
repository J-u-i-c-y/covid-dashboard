import React, { Component } from 'react';
import './Map.scss';
// eslint-disable-next-line
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle, Tooltip, useMapEvents, Polygon} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import euCountries from '../../../counties.js';
import Covid19DataAPI from '../../../services/Covid19DataAPI';


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
let countriesArray = [];
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

const purpleOptions = { color: '#000', fillColor: '#000', fillOpacity: 0.3, weight: 1 };



// console.log(geodatas.features);

// geodatas.features.forEach((e) => {
//   e.on('popupclose', function (elem) {
//     elem.sourceTarget.setStyle({
//           fillColor: "#000",
//           fillOpacity: 0.3
//       });
//     });
// console.log(e.id);
// });



class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geodatas: euCountries,
      lat: 51.881403,
      lng: 0.918583,
      zoom: 4,
    };
    this.covidDataAPI = new Covid19DataAPI();
  }

  componentDidMount() {
    this.covidDataAPI.getCountryList().then((data) => {
      // eslint-disable-next-line no-console
      this.setState({
        countries: data,
      });
      countriesArray = data;
      console.log(countriesArray[0]);
    });

    
  }
 

  render() {

    const position = [this.state.lat, this.state.lng];

    const RenderCircle = () => {
      return countriesArray.map((item) => (
        <Circle
          center={[item.countryInfo.lat, item.countryInfo.long]}
          pathOptions={{ fillColor: 'red', fillOpacity: 1, color: 'red' }}
          radius={item.casesPerOneMillion}
          eventHandlers={{
            click: () => {
              console.log('marker clicked')
            },
          }}
          >
          <Tooltip>{item.country} {item.cases}</Tooltip>
        </Circle>
      ))
    }

    return (
      <div id="map" className="map">

        <MapContainer center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
          />
          <GeoJSON pathOptions={purpleOptions} data={this.state.geodatas} />
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
