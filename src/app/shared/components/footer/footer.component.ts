import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  name = signal<string>('Samir Vergara');
  profession = signal<string>('Ingeniero de Sistemas');
  ocupation = signal<string>('Desarrollador Web');

  currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
