import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAppComponent } from './components/user-app/user-app.component';

@Component({
  selector: 'app-root',
  imports: [UserAppComponent,],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'user-app';
}
