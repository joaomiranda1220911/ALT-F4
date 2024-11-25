import { Routes } from '@angular/router';
//US001 
import { PratoCreateComponent } from './prato-create/prato-create.component';
//US002 
import { PratoListComponent } from './prato-list/prato-list.component';

export const routes: Routes = [
    //US001 
    { path: 'create-prato', component: PratoCreateComponent },
    //US002 
    { path: 'pratos', component: PratoListComponent },
];
