import { Routes } from '@angular/router';

import { PratoCreateComponent } from './prato-create/prato-create.component';
import { PratoListComponent } from './prato-list/prato-list.component';
import { PratosManagementComponent } from './pratos-management/pratos-management.component';  

import { EncomendaCreateComponent } from './encomenda-create/encomenda-create.component';
import { EncomendasListComponent } from './encomendas-list/encomendas-list.component';
import { EncomendasManagementComponent } from './encomendas-management/encomendas-management.component';

import { CozinhaComponent } from './cozinha/cozinha.component';
import { SalaComponent } from './sala/sala.component';  


export const routes: Routes = [
    // Rota para a cozinha
    { path: 'cozinha', component: CozinhaComponent },
    { path: 'cozinha/pratos-management', component: PratosManagementComponent }, 
    { path: 'cozinha/pratos-management/pratos', component: PratoListComponent },
    { path: 'cozinha/pratos-management/create-prato', component: PratoCreateComponent },

    // Rota para a sala
    { path: 'sala', component: SalaComponent },  
    { path: 'sala/encomendas-management', component: EncomendasManagementComponent },
    { path: 'sala/encomendas-management/encomendas', component: EncomendasListComponent },
    { path: 'sala/encomendas-management/create-encomenda', component: EncomendaCreateComponent }
];
