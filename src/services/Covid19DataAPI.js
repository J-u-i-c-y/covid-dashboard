import axios from 'axios';

class Covid19DataAPI {
    constructor() {
        this._covid_data = axios.create({
            baseURL: 'https://api.covid19api.com',
        });
    }

    async getStatisticPerCountry() {
        const summary = await this._getSummary();

        return summary.Countries;
    }

    async getGlobalStatistic() {
        const summary = await this._getSummary();

        return summary.data.Global;
    }

    async _getSummary() {
        return this._covid_data.get('/summary')
    }
}

export default Covid19DataAPI;
