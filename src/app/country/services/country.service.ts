import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface.ts';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL: string = environment.restCountriesApiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  private getAuthHeaders(): HttpHeaders {
    const apiKey = environment.restCountriesApiKey?.trim();

    return apiKey
      ? new HttpHeaders({ Authorization: `Bearer ${apiKey}` })
      : new HttpHeaders();
  }

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []).pipe(delay(1500));
    }

    console.log('Petición rumbo al server');

    return this.http
      .get<RESTCountry[]>(`${API_URL}/capital/${query}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        delay(1500),
        catchError((error) => {
          console.log('Error fetching: ', error);
          return throwError(
            () => new Error(`No se pudo obtener países con ese query: ${query}`)
          );
        })
      );
  }

  searchByCountry(query: string) {
    const url = `${API_URL}/name/${query}`;
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []).pipe(delay(1500));
    }

    console.log('Petición rumbo al server');

    return this.http
      .get<RESTCountry[]>(url, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        delay(1500),
        catchError((error) => {
          console.log('Error fetching ', error);

          return throwError(
            () => new Error(`No se pudo obtener países con ese query: ${query}`)
          );
        })
      );
  }

  searchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []).pipe(delay(1500));
    }

    console.log('Petición rumbo al server');

    return this.http
      .get<RESTCountry[]>(url, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        delay(1500),
        catchError((error) => {
          console.log('Error fetching ', error);

          return throwError(
            () => new Error(`No se pudo obtener países con esa región: ${region}`)
          );
        })
      );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http
      .get<RESTCountry[]>(url, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log('Error fetching ', error);

          return throwError(
            () =>
              new Error(
                `No se pudo obtener países con ese código: <strong>${code}</strong>`
              )
          );
        })
      );
  }
}
