import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableListComponent } from "../../components/table-list/table-list.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  onSearch(val: string): void {
    console.log({ val });
  }
}
