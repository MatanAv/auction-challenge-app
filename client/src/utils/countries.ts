import { countries } from 'countries-list';

const getCountriesList = () =>
  Object.values(countries)
    .map(({ name }) => name)
    .sort();

export { getCountriesList };
