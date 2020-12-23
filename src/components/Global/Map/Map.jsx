import React from 'react';
import './Map.scss';
// eslint-disable-next-line
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle, Tooltip, useMapEvents, Polygon} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import euCountries from '../../../counties.js';
import Covid19DataAPI from '../../../services/Covid19DataAPI';
import GlobalParent from '../GlobalParent/GlobalParent';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

let countriesArray = [];
const purpleOptions = { color: '#000', fillColor: '#000', fillOpacity: 0.3, weight: 1 };

class Map extends GlobalParent {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [['Cases', 'Deaths', 'Recovered']],
      navCurrentItems: [0],
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
 
  onEachFeature = (feature, layer) => {
    let countryFocus;
    this.covidDataAPI.getCountryList().then((data) => {
      layer.on({
        mouseover: function (e) {
            e.sourceTarget.setStyle({
                fillColor: "#db2929",
                fillOpacity: 0.5
            });
          },
        mouseout: function (e) {
          e.sourceTarget.setStyle({
              fillColor: "#000",
              fillOpacity: 0.3
          });
        }
      });

      data.forEach(element => {
        if(element.country === feature.properties.name) {
          countryFocus = element.casesPerOneMillion;
        }
      });
      layer.bindTooltip(`${feature.properties.name} ${countryFocus}`,{
        direction: 'right',
        permanent: false,
        sticky: true,
        offset: [10, 0],
        className: 'leaflet-tooltip'
    });
      // layer.bindPopup(`${feature.properties.name} ${countryFocus}`);
    });
    
  }

  clickToFeature = (e) => {
     var layer = e.target;
     console.log("I clicked on " ,layer.feature.properties.name);
  }

  render() {

    const position = [this.state.lat, this.state.lng];
    const { containerClassName, navItems, navCurrentItems } = this.state;

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
      <div className="map">
        <div className={`map__container ${containerClassName}`}>
          <ModuleNav
              navItems={navItems}
              navCurrentItems={navCurrentItems}
              toggleNavItem={this.toggleNavItem}
              toggleFullWin={this.toggleContainerClassName}
              idx="mapNav"
            />

          <div id="map" className="map__wrapper">
            <MapContainer center={position} zoom={this.state.zoom} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
              />
              <GeoJSON 
                onEachFeature={this.onEachFeature} 
                pathOptions={purpleOptions} 
                data={this.state.geodatas} 
                />
              <RenderCircle />
            </MapContainer>
          </div>

        </div>
      </div>
    );
  }
}

export default Map;
