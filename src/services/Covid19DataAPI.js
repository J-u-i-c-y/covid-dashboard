import axios from 'axios';

class Covid19DataAPI {
  constructor() {
    this.covidData = axios.create({
      baseURL: 'https://api.covid19api.com',
    });
  }

  async getStatisticPerCountry() {
    const summary = await this.getSummary();
    return summary.Countries;
  }

  async getGlobalStatistic() {
    const summary = await this.getSummary();
    return summary.data.Global;
  }

  async getSummary() {
    return this.covidData.get('/summary');
  }

  async getCountryList() {
    return this.covidData.get('/countries');
  }

  async getCountry(country) {
    return this.covidData.get(`/country/${country}/status/confirmed`);
  }
}

export default Covid19DataAPI;
