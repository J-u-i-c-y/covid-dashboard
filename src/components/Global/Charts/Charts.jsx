import React from 'react';
import PropTypes from 'prop-types';
import './Charts.scss';
import { Bar } from '@reactchartjs/react-chart.js';
import GlobalParent from '../GlobalParent/GlobalParent';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';
import Current from '../Current/Current';
import Covid19DataAPI from '../../../services/Covid19DataAPI';
import keysForCharts from '../../../constants/keysForCharts';

class Charts extends GlobalParent {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Charts',
      navItems: [['Cases', 'Deaths', 'Recovered']],
      navCurrentItems: [0],
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
    if (prevProps.country !== country && country.countryInfo) {
      this.covidDataAPI.getHistoryCountry(country.country).then((resp) => {
        this.setState({
          history: resp.timeline,
        });
      });
    }
  }

  componentDidMount() {
    this.covidDataAPI.getHistoryGlobal().then((resp) => {
      this.setState({
        history: resp,
      });
    });
  }

  getChartData() {
    const { navCurrentItems, history } = this.state;
    const chartCurrentData = Object.entries(
      history[keysForCharts[navCurrentItems[0]].key]
    );
    return {
      labels: chartCurrentData.map(([date]) => date),
      datasets: [
        {
          label: keysForCharts[navCurrentItems[0]].label,
          data: chartCurrentData.map(([, value]) => value),
          fill: false,
          backgroundColor: keysForCharts[navCurrentItems[0]].backgroundColor,
          borderColor: keysForCharts[navCurrentItems[0]].borderColor,
        },
      ],
    };
  }

  render() {
    const { containerClassName, navItems, navCurrentItems } = this.state;
    const { country } = this.props;

    const data = this.getChartData();

    const options = {
      tooltips: {
        callbacks: {
          label: (tooltipItem) => {
            return Intl.NumberFormat().format(tooltipItem.yLabel);
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: (label) => {
                return Intl.NumberFormat().format(label);
              },
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            time: {
              tooltipFormat: 'DD MMM YYYY',
              displayFormats: {
                day: 'MMM DD',
              },
            },
          },
        ],
      },
    };

    const BarChart = () => (
      <>
        <div className="header">
          <div className="links">&nbsp;</div>
        </div>
        <Bar data={data} options={options} />
      </>
    );

    return (
      <div className="charts">
        <div className={`charts__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            navCurrentItems={navCurrentItems}
            toggleNavItem={this.toggleNavItem}
            toggleFullWin={this.toggleContainerClassName}
            idx="chartsNav"
          />
          <h4>
            Chart of&nbsp;
            {keysForCharts[navCurrentItems[0]].key}
            &nbsp;in&nbsp;
            {country.country || 'Global Word'}
          </h4>
          <div className="charts__chart">
            <BarChart />
          </div>
        </div>
      </div>
    );
  }
}

Current.propTypes = {
  country: PropTypes.objectOf(PropTypes.object),
};

export default Charts;
