import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableListComponent } from "../../components/table-list/table-list.component";

@Component({
  selector: 'app-by-region-page',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent { }
