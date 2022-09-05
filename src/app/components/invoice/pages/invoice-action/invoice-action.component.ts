import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { random, statusHttp } from 'src/app/core/helpers/utilities';
import { Invoice, InvoiceProduct } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-invoice-action',
  templateUrl: './invoice-action.component.html',
  styleUrls: ['./invoice-action.component.scss']
})
export class InvoiceActionComponent implements OnInit {

  public nameAction:string;
  public invoiceForm:FormGroup;
  public activeProducts:boolean = true;
  public products:Product[];
  private idInvoice:number;

  constructor(
    private _invoiceService:InvoiceService,
    private _productService:ProductService,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private _snackBar: MatSnackBar,
  ) { 
    this.route.params.subscribe( params=>{
      this.actionType(params['type']);
    });
  }

  ngOnInit(): void {
    this.setupForm();
    this.getProducts();
  }

  private actionType(action:string){
    switch (action) {
      case 'add':
        this.nameAction = "Agregar factura";
        this.activeProducts = false;
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
      'invoice_number':[random(0,50000)],
      'sender_name':[],
      'sender_nit':[],
      'receiver_name':[],
      'receiver_nit':[],
      'amount':[0],
      'iva':[],
      'total':[0],
    });
  }

  public saveInvoice(){
    this._invoiceService.saveInvoice(this.invoiceForm.value).subscribe( (invoice:Invoice)=>{
      this.idInvoice = invoice.id;
      this.activeProducts = true;
      this._snackBar.open('Factura creada correctamente','',
        {
          duration: 4000,
        }
      );
    },error => {
      this._snackBar.open(statusHttp(error.status),'',
        {
          panelClass: 'alert-error',
          duration: 4000,
        }
      );
    });
  }

  public getProducts(){
    this._productService.getProducts().subscribe((products:Product[])=>{
      this.products = products;
    })
  }

  public valueProduct( product:Product, event:any){
    product.units_product = event.value;
    product.total_value = (product.unit_value*event.value);
  }

  public assignProduct( product:Product ){

    if(!product.total_value){
      this._snackBar.open('Debe ingrsar el numero de unidades','',
        {
          panelClass: 'alert-error',
          duration: 4000,
        }
      );
      return;
    }
    const invoiceProduct:InvoiceProduct = {
        id_invoice: this.idInvoice,
        id_product: product.id,
        units_product: product.units_product,
        total_value: product.total_value
    }
    this._invoiceService.assignProduct(invoiceProduct).subscribe((invoiceProduct:InvoiceProduct)=>{
      this._snackBar.open('Producto asignado correctamente','',
        {
          duration: 4000,
        }
      );
    },error => {
      this._snackBar.open(statusHttp(error.status),'',
        {
          panelClass: 'alert-error',
          duration: 4000,
        }
      );
    });
  }

}
