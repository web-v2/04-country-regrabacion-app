import { RESTCountry } from './../interfaces/rest-countries.interface.ts';
import type { Country } from '../interfaces/country.interface';

export class CountryMapper {
  // static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'Not Spanish Name',
      capital: restCountry.capital.join(','),
      population: restCountry.population,
      escudoSvg: restCountry.coatOfArms.svg,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  }

  static mapRestCountryArrayToCountryArray(
    restCountries: RESTCountry[]
  ): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
