import { Component, inject, input } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private countryService = inject(CountryService);
  public countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResources: any = rxResource<any, any>({
    request: () => ({ code: this.countryCode }),
    stream: ({ request }: any) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    },
  } as any);
}
