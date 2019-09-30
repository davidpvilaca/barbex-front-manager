import { IEnvironments } from '@core/interfaces';

export const environment: IEnvironments = {
  production: true,
  apiUrl: 'https://barbex-api.herokuapp.com',
  version: require('../../package.json').version
};
