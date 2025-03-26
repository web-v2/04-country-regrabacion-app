import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableListComponent } from "../../components/table-list/table-list.component";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent { }
