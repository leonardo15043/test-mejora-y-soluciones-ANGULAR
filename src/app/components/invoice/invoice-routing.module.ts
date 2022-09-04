import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { InvoiceActionComponent } from './pages/invoice-action/invoice-action.component';

const routes: Routes = [
    {
      path: 'list',
      component: InvoiceListComponent
    },
    {
      path: 'detail',
      component: InvoiceDetailComponent
    },
    {
      path: 'action',
      component: InvoiceActionComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class InvoiceRoutingModule {}