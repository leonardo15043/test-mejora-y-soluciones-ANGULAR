import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { InvoiceActionComponent } from './pages/invoice-action/invoice-action.component';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

const routes: Routes = [
    {
      path: 'list',
      component: InvoiceListComponent,
      canActivate: [ AuthGuardService ]
    },
    {
      path: 'detail',
      component: InvoiceDetailComponent,
      canActivate: [ AuthGuardService ]
    },
    {
      path: 'action/:type',
      component: InvoiceActionComponent,
      canActivate: [ AuthGuardService ]
    },
    {
      path: 'action/:type/:id',
      component: InvoiceActionComponent,
      canActivate: [ AuthGuardService ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class InvoiceRoutingModule {}