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
}

export default Covid19DataAPI;
