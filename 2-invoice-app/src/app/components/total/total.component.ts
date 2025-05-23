import { Component, Input, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'total',
  imports: [],
  templateUrl: './total.component.html'
})
export class TotalComponent{

  @Input() total: number = 0;

}
