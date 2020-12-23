/* eslint-disable global-require */
import React from 'react';
import './Map.scss';
// eslint-disable-next-line
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle, Tooltip, useMapEvents, Polygon} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import euCountries from '../../../constants/counties.json';
import Covid19DataAPI from '../../../services/Covid19DataAPI';
import GlobalParent from '../GlobalParent/GlobalParent';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// let countriesArray = [];
const purpleOptions = {
  color: '#000',
  fillColor: '#000',
  fillOpacity: 0.3,
  weight: 1,
};

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
      countries: [],
    };
    this.covidDataAPI = new Covid19DataAPI();
  }

  componentDidMount() {
    this.covidDataAPI.getCountryList().then((data) => {
      this.setState({
        countries: data,
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { country } = this.props;
    if (prevProps.country !== country && country.countryInfo) {
      this.setNewPosition(country.countryInfo.lat, country.countryInfo.long);
    }
  }

  setNewPosition(lat, lng) {
    this.setState({
      lat,
      lng,
    });
  }

  onEachFeature = (feature, layer) => {
    const keys = ['cases', 'deaths', 'recovered'];
    const { countries, navCurrentItems } = this.state;
    const key = keys[navCurrentItems[0]];
    let data = 0;
    let countryFocus = countries.find((el) => el.countryInfo.iso3 === feature.id);
    if (countryFocus && countryFocus[key]) data = countryFocus[key];
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

    layer.bindTooltip(
      `${feature.properties.name}, ${key}: ${data.toLocaleString()}`,
      {
        direction: 'right',
        permanent: false,
        sticky: true,
        offset: [10, 0],
        className: 'leaflet-tooltip'
      }
    );
  }

  clickToFeature = (e) => {
     var layer = e.target;
     console.log("I clicked on " ,layer.feature.properties.name);
  }

  render() {
    // const position = [this.state.lat, this.state.lng];
    const {
      containerClassName,
      navItems,
      navCurrentItems,
      countries,
      geodatas,
      lat,
      lng
    } = this.state;

    const RenderCircle = () => {
      const keysPerMillion = [
        'casesPerOneMillion',
        'deathsPerOneMillion',
        'recoveredPerOneMillion',
      ];
      const keys = ['cases', 'deaths', 'recovered'];
      const colors = ['rgb(83,196,214)', 'rgb(202,1,1)', 'rgb(189,19,222)'];
      return countries.map((item) => (
        <Circle
          center={[item.countryInfo.lat, item.countryInfo.long]}
          pathOptions={{
            fillColor: colors[navCurrentItems[0]],
            fillOpacity: 1,
            color: colors[navCurrentItems[0]],
          }}
          radius={item[keysPerMillion[navCurrentItems[0]]] * 2}
          eventHandlers={{
            click: () => {
              // eslint-disable-next-line no-console
              console.log('marker clicked');
            },
          }}
          key={`baloon-${item.country}`}
        >
          <Tooltip>
            {item.country}
            &nbsp;
            {item[keys[navCurrentItems[0]]]}
          </Tooltip>
        </Circle>
      ));
    };

    const renderMap = () => {
      let res = '';
      if (countries.length > 0) {
        res = (
          <MapContainer
            center={[lat, lng]}
            zoom={this.state.zoom}
            scrollWheelZoom
            style={{ width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
            />
            <GeoJSON
              onEachFeature={this.onEachFeature}
              pathOptions={purpleOptions}
              data={geodatas}
              />
            <RenderCircle />
          </MapContainer>
        )
      }
      return res;
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
          <div id="map" className="map__wrapper" key={`map-wrap-${navCurrentItems[0]}-${containerClassName}-${lat}`}>
            {renderMap()}
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
