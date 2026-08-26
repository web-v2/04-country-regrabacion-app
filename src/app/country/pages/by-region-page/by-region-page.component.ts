import { Component, inject, signal } from '@angular/core';
import { TableListComponent } from '../../components/table-list/table-list.component';
import type { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  imports: [TableListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  private countryService = inject(CountryService);
  public countries = signal<Country[]>([]);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  public query = signal<Region | null>(null);

  countryResources: any = rxResource<any, any>({
    request: () => ({ query: this.query() }),
    loader: ({ request }: any) => {
      if (!request.query) return of([]);
      return this.countryService.searchByRegion(request.query);
    },
  } as any);
}
