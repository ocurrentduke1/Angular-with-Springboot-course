import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter.component';

@Component({
  selector: 'app-root',
  imports: [ CounterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = '5-counter-app';
}
