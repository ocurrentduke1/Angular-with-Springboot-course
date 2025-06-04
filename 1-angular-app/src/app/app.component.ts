import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from "./counter/counter.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Hola mundo Angular desde un componente';
  subtitle = 'contador con estado de sesión';
  users = ["victor", "jose", "maria", "luis", "pablo", "javier", "alberto", "carmen", "laura", "marta"];
  visible = false;
  counter = 0;

  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem('counter')!) || 0;
  }

  setVisible() {
    this.visible = !this.visible;
    console.log("click en setVisible");
  }

  setCounter(counter:number): void{
    this.counter = counter;
  }
}
