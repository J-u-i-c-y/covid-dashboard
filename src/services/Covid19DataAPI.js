import axios from 'axios';

class Covid19DataAPI {
  constructor() {
    this.covidData = axios.create({
      baseURL: 'https://disease.sh/v3/covid-19/',
    });
  }

  async getStatisticPerCountry() {
    const summary = await this.getSummary();
    return summary.Countries;
  }

  // async getGlobalStatistic() {
  //   const summary = await this.getSummary();
  //   return summary.data;
  // }

  async getSummaryWorld() {
    const summary = await this.covidData.get('all');
    return summary.data;
  }

  async getCountryList() {
    const countryList = await this.covidData.get('countries');
    return countryList.data;
  }

  async getOneCountryData(country) {
    const countryData = await this.covidData.get(`countries/${country}?strict=true`);
    return countryData.data;
  }

  async getHistoryGlobal(days = 150) {
    const historyData = await this.covidData.get(`historical/all?lastdays=${days}`);
    return historyData.data;
  }
}

export default Covid19DataAPI;
