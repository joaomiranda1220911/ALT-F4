import { Routes } from '@angular/router';
//US001 
import { PratoCreateComponent } from './prato-create/prato-create.component';
//US002 
import { PratoListComponent } from './prato-list/prato-list.component';

//US007
import { CreateEncomendaComponent } from './encomenda-create/encomenda-create.component';
//US008

export const routes: Routes = [
    //US001 
    { path: 'create-prato', component: PratoCreateComponent },
    //US002 
    { path: 'pratos', component: PratoListComponent },

    //US007 
    { path: 'create-encomenda', component: CreateEncomendaComponent },
    //US008
];