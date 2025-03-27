import { Component, inject, input } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private countryService = inject(CountryService);
  public countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResources = rxResource({
    request: () => ({ code: this.countryCode() }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    },
  });
}
