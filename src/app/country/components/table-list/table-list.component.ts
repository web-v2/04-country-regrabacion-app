import { Component, input, signal } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-table-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './table-list.component.html',
})
export class TableListComponent {
  countries = input.required<Country[]>();
  
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
