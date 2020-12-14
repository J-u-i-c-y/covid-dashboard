import React from 'react';

export default class Covid19DataAPI {
    constructor() {
        this._covid_data = axios({
            baseURL: 'https://api.covid19.com',
        });
    }

    async getStatisticPerCountry() {
        const summary = await this._getSummary();

        return summary.Countries;
    }

    async getGlobalStatistic() {
        const summary = await this._getSummary();

        return summary.Global;
    }

    async _getSummary() {
        return this._covid_data.get('/summary');
    }
}
