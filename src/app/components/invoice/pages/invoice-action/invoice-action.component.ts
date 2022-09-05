import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { calculateIva, random, statusHttp } from 'src/app/core/helpers/utilities';
import { Invoice, InvoiceProduct } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { Observable } from 'rxjs';

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
  public selectProducts:Product[] = [];
  private idInvoice:number;
  public action:string;
  private service:Observable<Invoice>;

  constructor(
    private _invoiceService:InvoiceService,
    private _productService:ProductService,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private _snackBar: MatSnackBar,
  ) { 
    this.route.params.subscribe( params=>{
      this.action = params['type'];
      this.actionType(params['type'],params['id']);
    });
  }

  ngOnInit(): void {
    this.setupForm();
  }

  private actionType(action:string,id?:number){
    switch (action) {
      case 'add':
        this.nameAction = "Agregar factura";
        this.activeProducts = false;
        this.getProducts();
        break;
      case 'edit':
        this.nameAction = "Editar factura";
        this.getInvoice(id);
        this.getInvoiceProducts(id);
        break;
      case 'view':
        this.nameAction = "Ver factura";
        this.getInvoice(id);
        this.getInvoiceProducts(id);
        break;
    }
  }
  
  private setupForm( invoice?:Invoice ){
    this.invoiceForm = this.formBuilder.group({
      'id':[(invoice?.id) ? invoice?.id:null],
      'invoice_number':[ (invoice?.invoice_number) ? invoice?.invoice_number : random(0,150000)],
      'sender_name':[ invoice?.sender_name ],
      'sender_nit':[ invoice?.sender_nit ],
      'receiver_name':[ invoice?.sender_name ],
      'receiver_nit':[ invoice?.receiver_nit ],
      'amount':[(invoice?.amount) ? invoice?.amount : 0],
      'iva':[ invoice?.iva],
      'total':[(invoice?.total) ? invoice?.total : 0 ] ,
    });
  }

  public getInvoice( id:any ){
    this._invoiceService.getInvoice(id).subscribe((invoice:Invoice)=>{
      this.setupForm(invoice);
    });
  }

  public saveInvoice( action?:string ){
    action = (action) ? action : this.action;
    this.service = (action == 'add') ? this._invoiceService.saveInvoice(this.invoiceForm?.value) : this._invoiceService.updateInvoice(this.invoiceForm?.value);
    this.service.subscribe( (invoice:Invoice)=>{
      this.idInvoice = invoice.id;
      this.invoiceForm.get('id')?.setValue(invoice.id);
      this.activeProducts = true;
      this._snackBar.open((action == 'add') ? 'Factura creada correctamente' : 'Factura actualizada correctamente','',
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
    });
  }

  public getInvoiceProducts( idInvoice:any ){
    this._invoiceService.getProducts(idInvoice).subscribe((products:Product[])=>{
      this.products = products;
    });
  }

  public valueProduct( product:Product, event:any){
    product.units_product = event.value;
    product.total_value = (product.unit_value*event.value);
  }

  private totalInvoice(){
    const amount = this.selectProducts.map(item => item.total_value).reduce((prev, curr) => prev + curr, 0);
    this.invoiceForm.get('amount')?.setValue(amount);
    this.invoiceForm.get('total')?.setValue(calculateIva(amount,this.invoiceForm.get('iva')?.value));
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
      this.selectProducts.push(product);
      this.totalInvoice();
      this.saveInvoice('edit');
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