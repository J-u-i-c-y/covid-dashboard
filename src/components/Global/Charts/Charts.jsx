import React from 'react';
import PropTypes from 'prop-types';
import './Charts.scss';
import GlobalParent from '../GlobalParent/GlobalParent';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';
import Current from "../Current/Current";
import { Line } from '@reactchartjs/react-chart.js';
import Covid19DataAPI from "../../../services/Covid19DataAPI";

class Charts extends GlobalParent {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Charts',
      navItems: [
        ['За последний день', 'За весь период пандемии'],
        ['В абсолютных величинах', 'На 100 тыс. населения'],
      ],
      navCurrentItems: [0, 0],
      history: {
        cases: {},
        deaths: {},
        recovered: {},
      },
    };
    this.covidDataAPI = new Covid19DataAPI();
  }

  componentDidUpdate(prevProps) {
    const { country } = this.props;
    if (prevProps.country !== country) {
      this.covidDataAPI.getHistoryCountry(country.country).then((resp) => {
        this.setState({
          history: resp.timeline,
        })
      });
    }
  }

  componentDidMount() {
    this.covidDataAPI.getHistoryGlobal().then((resp) => {
      this.setState({
        history: resp,
      })
    });
  }

  render() {
    const { country } = this.props;
    const { history } = this.state;

    const casesData = Object.entries(history.cases);
    const deathsData = Object.entries(history.deaths);
    const recoveredData = Object.entries(history.recovered);

    const data = {
      labels: casesData.map(([date]) => date),
      datasets: [
        {
          label: 'Cases',
          data: casesData.map(([ , value]) => value),
          fill: false,
          backgroundColor: 'rgb(83,196,214)',
          borderColor: 'rgba(83,196,214, 0.5)',
        },
        {
          label: 'Deaths',
          data: deathsData.map(([ , value]) => value),
          fill: false,
          backgroundColor: 'rgb(202,1,1)',
          borderColor: 'rgb(202,1,1, 0.5)',
        },
        {
          label: 'Recovered',
          data: recoveredData.map(([ , value]) => value),
          fill: false,
          backgroundColor: 'rgb(189,19,222)',
          borderColor: 'rgba(189,19,222, 0.5)',
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              'callback': (label) => {
                return Intl.NumberFormat().format(label);
              }
            },
          },
        ],
        xAxes: [{
          type: "time",
          time: {
            displayFormats: {
              hour: 'MMM DD'
            }
          }
        }],
      },
    };

    const BarChart = () => (
        <>
          <div className='header'>
            <div className='links'>
            </div>
          </div>
          <Line data={data} options={options} />
        </>
    );

    const { containerClassName, navItems, navCurrentItems } = this.state;
    return (
      <div className="charts">
        <div className={`charts__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            navCurrentItems={navCurrentItems}
            toggleNavItem={this.toggleNavItem}
            toggleFullWin={this.toggleContainerClassName}
            idx="chartNav"
          />
          <h4>
            Current country is:&nbsp;
            {country.country || 'Global'}
          </h4>
          <BarChart />
        </div>
      </div>
    );
  }
}

Current.propTypes = {
  country: PropTypes.objectOf(PropTypes.object),
};

export default Charts;
