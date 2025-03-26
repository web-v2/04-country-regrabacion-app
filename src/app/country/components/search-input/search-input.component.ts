import { Component, input, output } from '@angular/core';

@Component({
  selector: 'coutry-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  public value = output<string>();
  public placeholder = input.required<string>();
}
