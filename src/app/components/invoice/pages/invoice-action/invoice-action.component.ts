import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-action',
  templateUrl: './invoice-action.component.html',
  styleUrls: ['./invoice-action.component.scss']
})
export class InvoiceActionComponent implements OnInit {

  public nameAction:string;
  public invoiceForm:FormGroup;

  constructor(
    private _invoiceService:InvoiceService,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
  ) { 
    this.route.params.subscribe( params=>{
      this.actionType(params['type']);
    });
  }

  ngOnInit(): void {
    this.setupForm();
  }

  private actionType(action:string){
    switch (action) {
      case 'add':
        this.nameAction = "Agregar factura";
        break;
      case 'edit':
        this.nameAction = "Editar factura";
        break;
      case 'view':
        this.nameAction = "Ver factura";
        break;
    }
  }
  
  private setupForm(){
    this.invoiceForm = this.formBuilder.group({
      'email':[],
      'password':[]
    });
  }

  public saveInvoice(){
    this._invoiceService.saveInvoice(this.invoiceForm.value).subscribe( (invoice:Invoice)=>{
        console.log(invoice);
    });
  }

}
