import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { InvoiceActionComponent } from './pages/invoice-action/invoice-action.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
    imports: [
        CommonModule,
        InvoiceRoutingModule,
        CoreModule
    ],
    providers: [],
    declarations: [ InvoiceListComponent, InvoiceDetailComponent, InvoiceActionComponent ]
})
export class InvoiceModule {}