import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { InvoiceViewComponent } from '../components/invoice-view/invoice-view.component';
import { ClientViewComponent } from '../components/client-view/client-view.component';
import { CompanyViewComponent } from '../components/company-view/company-view.component';
import { ListItemsComponent } from '../components/list-items/list-items.component';
import { RowItemComponent } from '../components/row-item/row-item.component';
import { TotalComponent } from '../components/total/total.component';
import { FormItemComponent } from '../components/form-item/form-item.component';

@Component({
  selector: 'app-invoice',
  imports: [InvoiceViewComponent, ClientViewComponent, CompanyViewComponent, ListItemsComponent, TotalComponent, FormItemComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{

  invoice!: Invoice;

  constructor(private service: InvoiceService) {}
  
  ngOnInit(): void {
    
    this.invoice = this.service.getInvoice();
  }

  removeItem(id: number) {
    this.invoice = this.service.remove(id);
  }

  addItem(item: any) {
    this.invoice = this.service.save(item);
  }
  
}
