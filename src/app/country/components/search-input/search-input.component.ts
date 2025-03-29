import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'coutry-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  public value = output<string>();
  public placeholder = input.required<string>();
  public inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
