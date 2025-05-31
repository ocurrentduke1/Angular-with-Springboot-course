import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../store/items.action';

@Component({
  selector: 'counter',
  imports: [],
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  title: String = 'Counter usando redux';
  counter: number = 0;

  constructor(private store: Store<{counter: number}>){
    this.store.select('counter').subscribe(value => {
      this.counter = value;
    })
  }

  increment(): void{
    console.log('Incrementando contador');
    this.store.dispatch(increment({add: 2}));
    // this.counter++;
  }

  decrement(): void {
    console.log('Decrementando contador');
    this.store.dispatch(decrement());
    // this.counter--;
  }

  reset(): void {
    console.log('Reiniciando contador');
    this.store.dispatch(reset());
    // this.counter = 0;
  }

}
