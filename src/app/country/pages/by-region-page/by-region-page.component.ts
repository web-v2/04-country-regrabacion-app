import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {
  public countries = signal<Country[]>([]);
}
