import {Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../../models/invoice.interface';

const invoice: Invoice[] = [
  { invoice_number: 1, created_at: new Date(), sender_name:'Leonardo', receiver_name:'arturo', amount: 2000, iva: 19, total: 200 },
  { invoice_number: 1, created_at: new Date(), sender_name:'Leonardo', receiver_name:'arturo', amount: 2000, iva: 19, total: 200 },
  { invoice_number: 1, created_at: new Date(), sender_name:'Leonardo', receiver_name:'arturo', amount: 2000, iva: 19, total: 200 },
  { invoice_number: 1, created_at: new Date(), sender_name:'Leonardo', receiver_name:'arturo', amount: 2000, iva: 19, total: 200 },
  { invoice_number: 1, created_at: new Date(), sender_name:'Leonardo', receiver_name:'arturo', amount: 2000, iva: 19, total: 200 },
  { invoice_number: 1, created_at: new Date(), sender_name:'Leonardo', receiver_name:'arturo', amount: 2000, iva: 19, total: 200 },
  { invoice_number: 1, created_at: new Date(), sender_name:'Leonardo', receiver_name:'arturo', amount: 2000, iva: 19, total: 200 }
];

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent {
  displayedColumns: string[] = ['invoice_number', 'created_at', 'sender_name', 'receiver_name', 'amount', 'iva', 'total', 'actions'];
  public dataSource = new MatTableDataSource<Invoice>([]);
  
  constructor(){
    this.dataSource.data = invoice;
  }
}