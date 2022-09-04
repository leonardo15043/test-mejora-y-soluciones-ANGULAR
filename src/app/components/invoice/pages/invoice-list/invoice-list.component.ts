import {Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent {

  public displayedColumns: string[] = ['invoice_number', 'created_at', 'sender_name', 'receiver_name', 'amount', 'iva', 'total', 'actions'];
  public dataInvoice = new MatTableDataSource<Invoice>([]);
  
  constructor(
    private _invoiceService:InvoiceService
  ){
    this.getInvoices();
  }

  public getInvoices(){
    this._invoiceService.getInvoices().subscribe(( invoices:Invoice[] ) =>{
      this.dataInvoice.data = invoices;
    })
  }

}